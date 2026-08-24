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
  const container = document.getElementById("Slider");
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

      container.innerHTML = `
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

// SLiderFunction();


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
    console.log(`Fetched products for ${category}:`, data.products);

    // Render the category's products
    if (data.products.length === 0) {
      container.innerHTML = "<p>No products found in this category.</p>";
      return;
    }

    let productsHTML = "";
    data.products.forEach((product) => {
      productsHTML += `
        <div class="productCard">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <h3>Price: $${product.price}</h3>
          <img src="${product.thumbnail}" alt="${product.title}" width="200" height="200" style="object-fit: cover; border-radius: 6px;">
        <p>Total Stock Remaining: ${product.stock}</p>
        </div>
      `;
    });

    container.innerHTML = productsHTML;
  } catch (error) {
    console.error("Fetch operation failed:", error.message);
    container.innerHTML = `<p>Error loading products: ${error.message}</p>`;
  }
}



