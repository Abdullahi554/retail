/* ================= CART STORAGE ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= SAVE CART ================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

/* ================= ADD TO CART ================= */
function addToCart(id, name, price, image, color = '', style = '', size = '') {
  const existingItem = cart.find(item => item.id === id && item.color === color && item.size === size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      color,
      style,
      size,
      quantity: 1
    });
  }

  saveCart();
  displayCart(); // Update cart immediately if on cart page
}

/* ================= REMOVE ITEM ================= */
function removeFromCart(id, color, size) {
  cart = cart.filter(item => !(item.id === id && item.color === color && item.size === size));
  saveCart();
  displayCart();
}

/* ================= CHANGE QUANTITY ================= */
function changeQuantity(id, color, size, action) {
  const item = cart.find(item => item.id === id && item.color === color && item.size === size);
  if (!item) return;

  if (action === 'plus') {
    item.quantity++;
  } else if (action === 'minus') {
    item.quantity--;
    if (item.quantity <= 0) {
      removeFromCart(id, color, size);
      return;
    }
  }

  saveCart();
  displayCart();
}

/* ================= CLEAR CART ================= */
function clearCart() {
  if (!confirm("Are you sure you want to clear the cart?")) return;
  cart = [];
  saveCart();
  displayCart();
}

/* ================= DISPLAY CART ================= */
function displayCart() {
  const cartDiv = document.getElementById("cart");
  const subtotalDiv = document.getElementById("subtotal");
  const totalDiv = document.getElementById("total");

  if (!cartDiv) return;

  cartDiv.innerHTML = '';
  let subtotal = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = `<p class="text-center text-muted">Your cart is empty</p>`;
    subtotalDiv.innerText = "$0";
    totalDiv.innerText = "$20";
    return;
  }

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    cartDiv.innerHTML += `
      <div class="d-flex align-items-center mb-3 border-bottom pb-3">
        <img src="${item.image}" width="70" class="rounded">

        <div class="ms-3 flex-grow-1">
          <h6>${item.name}</h6>
          <small>
            Color: <strong>${item.color}</strong> |
            Size: <strong>${item.size}</strong><br>
            Style: ${item.style}
          </small>
        </div>

        <div class="d-flex align-items-center ms-3">
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, '${item.color}', '${item.size}', 'minus')">−</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, '${item.color}', '${item.size}', 'plus')">+</button>
        </div>

        <strong class="ms-3">$${item.price * item.quantity}</strong>

        <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCart(${item.id}, '${item.color}', '${item.size}')">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  subtotalDiv.innerText = `$${subtotal}`;
  totalDiv.innerText = `$${subtotal + 20}`;
}

/* ================= UPDATE CART BADGE ================= */
function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > 0) {
    badge.style.display = "flex";
    badge.innerText = totalItems;
  } else {
    badge.style.display = "none";
  }
}

/* ================= CHECKOUT ================= */
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Save cart before redirecting
  saveCart();
  window.location.href = "form.html"; // Replace with your payment page
}

/* ================= INITIAL LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  updateCartBadge();
});
