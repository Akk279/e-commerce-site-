const container = document.getElementById("products-container");
const category = document.body.dataset.category;

function escapeHTML(value) {
  return String(value).replace(
    /[&<>"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[character],
  );
}

async function loadCategoryProducts() {
  container.innerHTML = '<p class="status">Loading products...</p>';

  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(category)}`,
    );
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);

    const data = await response.json();
    container.innerHTML = data.products
      .map(
        (product) => `
      <article class="product-card">
        <img src="${escapeHTML(product.thumbnail)}" alt="${escapeHTML(product.title)}">
        <h2>${escapeHTML(product.title)}</h2>
        <p>${escapeHTML(product.description)}</p>
        <div class="product-meta">
          <span>$${product.price}</span>
          <span>${product.stock} in stock</span>
        </div>
      </article>
    `,
      )
      .join("");
  } catch (error) {
    container.innerHTML =
      '<p class="status">Products could not be loaded. Please try again.</p>';
    console.error(error);
  }
}

loadCategoryProducts();
