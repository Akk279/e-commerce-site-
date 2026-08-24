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

//cards for different products
// async function getCategory() {
//   const url = "https://dummyjson.com/products/categories";

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("fetched data", data);
//     const container = document.getElementById("ProductCategory");
//     let cardsHTML = "";
//     data.forEach((product) => {
//       const categorySlug = product.slug || product.name || product;
//       const categoryName = product.name || product;
//       cardsHTML += `
//     <div class="ProductCategorychildren">
//     <div class="ProductCategorychildren" onclick="getData('${categorySlug}')" style="cursor: pointer;">
//       <h3>${product.name}</h3>
   
//     </div>
//   `;
//     });
//     container.innerHTML = cardsHTML;
//   } catch (error) {
//     console.error("Fetch operation failed:", error.message);
//   }
// }
// getCategory();

// async function getData(category) {
//   // const url = "https://dummyjson.com/products";
//   const url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("fetched data", data);
//     const container = document.getElementById("products-container");
//     let cardsHTML = "";
//     data.products.forEach((product) => {
//       cardsHTML += `
//     <div class="productCard">
//       <h2>${product.title}</h2>
//       <p>${product.description}</p>
//       <h3>Category: ${product.category}</h3>
//       <h3>Price: $${product.price}</h3>
//       <h3>Stock: ${product.stock}</h3>
//       <h4 >Tag: #${product.tags}</h4>
//        <img id="myImage" src="${product.images}" width="300" height="200" alt="Slider Image">

//     </div>
//   `;
//     });
//     container.innerHTML = cardsHTML;
//   } catch (error) {
//     console.error("Fetch operation failed:", error.message);
//   }
// }
// getData();

// Cards for categories
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



async function introduction() {
  
}