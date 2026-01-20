/* ================= CART STORAGE ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= SAVE CART ================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

/* ================= ADD TO CART ================= */
function addToCart(id, name, price, image) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 0
    });
  }

  saveCart();
  displayCart();
}

/* ================= REMOVE ITEM ================= */
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  displayCart();
}

/* ================= UPDATE QUANTITY ================= */
function changeQuantity(id, action) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  if (action === "plus") {
    item.quantity++;
  } else if (action === "minus") {
    item.quantity--;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
  }

  saveCart();
  displayCart();
}

/* ================= CLEAR CART ================= */
function clearCart() {
  if (!confirm("Clear all items from cart?")) return;
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

  cartDiv.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = `<p class="text-muted text-center">Your cart is empty</p>`;
    if (subtotalDiv) subtotalDiv.innerText = "$0";
    if (totalDiv) totalDiv.innerText = "$0";
    return;
  }

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    cartDiv.innerHTML += `
      <div class="cart-item d-flex align-items-center mb-3">
        <img src="${item.image}" alt="${item.name}">
        <div class="ms-3 flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <small class="text-muted">$${item.price}</small>
        </div>
        <div class="quantity-control">
          <button onclick="changeQuantity(${item.id}, 'minus')">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 'plus')">+</button>
        </div>
        <strong class="ms-3">$${item.price * item.quantity}</strong>
        <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCart(${item.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  if (subtotalDiv) subtotalDiv.innerText = `$${subtotal}`;
  if (totalDiv) totalDiv.innerText = `$${subtotal + 20}`; // shipping
}

/* ================= CART BADGE ================= */
function updateCartBadge() {
  const cartBadge = document.querySelector(".cart-badge");
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!cartBadge) return;

  if (totalItems > 0) {
    cartBadge.style.display = "flex";
    cartBadge.innerText = totalItems;
  } else {
    cartBadge.style.display = "none";
  }
}

/* ================= AUTO LOAD CART ================= */
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  updateCartBadge();

  // Attach add to cart buttons on shop page
  const addButtons = document.querySelectorAll(".product-card button");
  addButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const card = btn.parentElement;
      const name = card.querySelector("h6").innerText;
      const price = parseFloat(card.querySelector("p").innerText.replace("$", ""));
      const image = card.querySelector("img").src;

      addToCart(index + 1, name, price, image); // unique ID = index+1
    });
  });
});

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Save cart before redirecting
  saveCart();

  // Navigate to form.html
  window.location.href = "form.html";
}



  // Toggle between Card and M-Pesa forms
  const cardRadio = document.getElementById('cardPayment');
  const mpesaRadio = document.getElementById('mpesaPayment');
  const cardDetails = document.getElementById('cardDetails');
  const mpesaDetails = document.getElementById('mpesaDetails');

  cardRadio.addEventListener('change', () => {
    if(cardRadio.checked){
      cardDetails.style.display = 'block';
      mpesaDetails.style.display = 'none';
    }
  });

  mpesaRadio.addEventListener('change', () => {
    if(mpesaRadio.checked){
      cardDetails.style.display = 'none';
      mpesaDetails.style.display = 'block';
    }
  });

  // Handle form submit
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.addEventListener('submit', function(e){
    e.preventDefault();
    alert("Payment submitted successfully!");
    // Redirect to thank you or order confirmation page
    window.location.href = "retail.html";
  });

  // det//
  function changeImage(element) {
  document.getElementById("mainProductImage").src = element.src;

  document.querySelectorAll(".thumb").forEach(img => {
    img.classList.remove("active");
  });

  element.classList.add("active");
}



