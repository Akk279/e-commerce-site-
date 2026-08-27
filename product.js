window.addEventListener("scroll", () => {
  // 1. Get how far the user has scrolled down from the top or current poition
  const winScroll =
    document.documentElement.scrollTop || document.body.scrollTop;

  // 2. Calculate total scrollable height (Full height minus viewport height)  or total length
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

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
    let cardsHTML = `<div class="ProductCategorychildren" onclick="ShowAll()" style="cursor: pointer;">
          <h3>Show All</h3>
      </div>`;

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
      ShowAll();
    }
  } catch (error) {
    console.error("Fetch operation failed:", error.message);
  }
}

getCategory();

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
let currentPageNumber = 1;
const productsPerPage = 9;
function renderProducts() {
  const container = document.getElementById("products-container");
   const start = (currentPageNumber - 1) * productsPerPage;
   const visibleProducts = currentProducts.slice(
     start,
     start + productsPerPage,
  );
   document.getElementById("products-container").innerHTML = visibleProducts
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

  pagination();
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
const searchbar = document.getElementById("searchbar");

searchbar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search_item("search");
  }
});
async function search_item(order1) {
  const box1 = document.getElementById("products-container");
  const box2 = document.getElementById("search-data");
  const searchButton = document.getElementById("search-button");
  const cancelButton = document.getElementById("cancel-button");
  

  if (order1 === "cancel") {
    box1.style.visibility = "visible";
    box2.style.visibility = "hidden";
    searchButton.hidden = false;
    cancelButton.hidden = true;
    document.getElementById("searchbar").value = "";
  }
  if (order1 === "search") {
    box1.style.visibility = "hidden";
    box2.style.visibility = "visible";
    searchButton.hidden = true;
    cancelButton.hidden = false;
    const searchbar = document.getElementById("searchbar");

searchbar.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        search_item("search");
    }

});
    // const searchContainer = document.getElementById("search-data");

    const url = "https://dummyjson.com/products";

    let input = document.getElementById("searchbar").value;
    input = input.toLowerCase();

    console.log(input);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("fetched categories:", data);
      const regex = new RegExp(input, "i");

      console.log("just abobve search producd");

      let searchProducts = data.products.filter(
        (product) =>
          regex.test(product.title) || regex.test(product.description),
      );
      console.log(" below searchProducts");

      console.log(searchProducts);
      const container = document.getElementById("search-data");

      container.innerHTML = searchProducts
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
    } catch (error) {
      console.error("Fetch operation failed:", error.message);
    }
  }
}

async function ShowAll() {
   const container = document.getElementById("products-container");
   container.innerHTML = "<p>Loading products...</p>";
  const url = "https://dummyjson.com/products";
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      currentProducts = data.products;
      console.log( currentProducts);

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
console.log("above pagination function");
 function pagination() {
   console.log("1st line of pagination function");

   const pageContainer = document.getElementById("paginated-list");

   pageContainer.innerHTML = "";

   let cardsHTML = "";
   console.log(" current products" + currentProducts);
   const totalPages = Math.ceil(currentProducts.length / 9);
   console.log("total pages" + totalPages);
   for (let i = 1; i <= totalPages; i++) {
     cardsHTML += `
            <div 
                class="page-number"
                onclick="showPage(${i})"
            >
                <h3>${i}</h3>
            </div>
        `;
   }
    
   pageContainer.innerHTML = cardsHTML;
}
pagination();
console.log("below pagination function");

async function showPage(i) {
  console.log("this is showpage :" + i);
  currentPageNumber = i;
  renderProducts();
}