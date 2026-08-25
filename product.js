window.addEventListener("scroll", () => {
  // 1. Get how far the user has scrolled down from the top or current poition
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;

  // 2. Calculate total scrollable height (Full height minus viewport height)  or total length
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // 3. Prevent division by zero if the page isn't scrollable 
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

  // 4. Update the CSS width of the progress element
  document.getElementById("myProgressBar").style.width = scrolled + "%";
});

function toggleMobileMenu() {
  var drawer = document.getElementById("mobileDrawer");
  if (!drawer) return;

  drawer.classList.toggle("show");

  var icon =
    document.querySelector(".mobile-menu-trigger .menu-icon") ||
    document.querySelector(".mobile-menu-trigger i");
  if (!icon) return;

  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
}

async function getCategory() {
  const url = "https://dummyjson.com/products/categories";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("fetched categories:", data);

    const container = document.getElementById("ProductCategory");
    let cardsHTML = "";

    data.forEach((product) => {
      const categorySlug = product.slug || product.name || product;
      const categoryName = product.name || product;

      // Fixed: Single clean div with the onclick handler
      cardsHTML += `
        <div class="ProductCategorychildren" onclick="getData('${categorySlug}')" style="cursor: pointer;">
          <h3>${categoryName}</h3>
        </div>
      `;
    });

    container.innerHTML = cardsHTML;

    // Optional: Load the first category automatically on initial page load
    if (data.length > 0) {
      const firstSlug = data[0].slug || data[0].name || data[0];
      getData(firstSlug);
    }
  } catch (error) {
    console.error("Fetch operation failed:", error.message);
  }
}

getCategory();
async function SLiderFunction() {
  const container1 = document.getElementById("Slider");
  const url = "https://dummyjson.com/products";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    let activeSlide = 0;

    function showSlide() {
      const product = data.products[activeSlide];

      container1.innerHTML = `
                <div class="SliderCard">

                    <h2>${product.title}</h2>

                    <p>${product.description}</p>

                    <h3>Price: $${product.price}</h3>
                     
                    <img 
                        src="${product.thumbnail}" 
                        alt="${product.title}" 
                        width="200" 
                        height="200"
                        style="object-fit: cover; border-radius: 6px; "
                    >
                     
                    <p>Total Stock Remaining: ${product.stock}</p>

                </div>
            `;
    }

    // Show first product
    showSlide();

    // Automatically change product every 3 seconds
    setInterval(() => {
      activeSlide++;

      // If we reach the last product,
      // go back to the first product
      if (activeSlide >= data.products.length) {
        activeSlide = 0;
      }

      showSlide();
    }, 3000);
  } catch (error) {
    console.error("Slider fetch failed:", error.message);
  }
}

SLiderFunction();

async function getData(category) {
  const container = document.getElementById("products-container");
  container.innerHTML = "<p>Loading products...</p>";

  const url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    currentProducts = data.products;
    console.log(`Fetched products for ${category}:`, currentProducts);

    // Render the category's products
    if (currentProducts.length === 0) {
      container.innerHTML = "<p>No products found in this category.</p>";
      return;
    }

    renderProducts();
  } catch (error) {
    console.error("Fetch operation failed:", error.message);
    container.innerHTML = `<p>Error loading products: ${error.message}</p>`;
  }
}

let currentProducts = [];

function renderProducts() {
  const container = document.getElementById("products-container");

  container.innerHTML = currentProducts
    .map(
      (product) => `
          <div class="productCard">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <h3>Price: $${product.price}</h3>
           <div class= "sliderImage"> 
          <img src="${product.thumbnail}" alt="${product.title}" width="200" height="200" style="object-fit: cover; border-radius: 6px;">
          </div>
          <p>Total Stock Remaining: ${product.stock}</p>
        </div>
      `,
    )
    .join("");
}

function sortNumbers(order) {
  if (order === "asc") {
    currentProducts.sort((a, b) => a.price - b.price);
  }

  if (order === "desc") {
    currentProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts();
}
