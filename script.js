// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Cart data
let cart = [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
    console.log('cart before adding', cart);
  const productToAdd = products.find((product) => product.id === productId);
  if (productToAdd) {
    cart.push(productToAdd);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    console.log('cart after adding', cart);
  }
}

// Remove item from cart
function removeFromCart(productId) {
    console.log('cart before removing', cart);
  cart = cart.filter((item) => item.id !== productId);
  console.log('cart after removing', cart);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();

  //----same thing with S solution using arr.findIndex
  // const productIndex = cart.findIndex((product) => product.id === productId);
  //     if (productIndex > -1) {
  //       cart.splice(productIndex, 1);
  //       sessionStorage.setItem("cart", JSON.stringify(cart));
  //       renderCart();
  //     }
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  //or use this
  // sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Initial render
renderProducts();
// Check if there's an existing cart in session storage
const storedCart = sessionStorage.getItem("cart");
if (storedCart) {
  cart = JSON.parse(storedCart);
  renderCart();
}

// Add event listeners

//1.for clear cart
clearCartBtn.addEventListener("click", clearCart);

//from doubt support using forEach - this is simple
// but this is working only one time on page load  for remove-cart-button
document.querySelectorAll(".add-to-cart-btn").forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log('click add')
    addToCart(parseInt(event.target.dataset.id));
  });
});

document.querySelectorAll(".remove-from-cart-btn").forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log('click remove')
    removeFromCart(parseInt(event.target.dataset.id));
  });
});

// //same thing from S solution using event delegation
// // this is more efficient way. - and working perfectly
// productList.addEventListener("click", (event) => {
//     if (event.target.classList.contains("add-to-cart-btn")) {
//       addToCart(parseInt(event.target.dataset.id));
//     }
//   });

//   cartList.addEventListener("click", (event) => {
//     if (event.target.classList.contains("remove-from-cart-btn")) {
//       removeFromCart(parseInt(event.target.dataset.id));
//     }
//   });
