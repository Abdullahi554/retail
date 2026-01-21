/* ================= CART STORAGE ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= SAVE CART ================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

/* ================= ADD TO CART ================= */
function addToCart(id, name, price, image, color, style, size) {

  const existing = cart.find(
    item => item.id === id && item.color === color && item.size === size
  );

  if (existing) {
    existing.quantity++;
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
    cartDiv.innerHTML = `<p class="text-center text-muted">Your cart is empty</p>`;
    subtotalDiv.innerText = "$0";
    totalDiv.innerText = "$20";
    return;
  }

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    cartDiv.innerHTML += `
      <div class="d-flex align-items-center border-bottom pb-3 mb-3">
        <img src="${item.image}" width="70" class="rounded">

        <div class="ms-3 flex-grow-1">
          <h6>${item.name}</h6>
          <small>
            Color: ${item.color} |
            Size: ${item.size}<br>
            Style: ${item.style}
          </small>
        </div>

        <div class="d-flex align-items-center">
          <button onclick="changeQty(${item.id}, '${item.color}', '${item.size}', -1)">−</button>
          <span class="mx-2">${item.quantity}</span>
          <button onclick="changeQty(${item.id}, '${item.color}', '${item.size}', 1)">+</button>
        </div>

        <strong class="ms-3">$${item.price * item.quantity}</strong>
      </div>
    `;
  });

  subtotalDiv.innerText = `$${subtotal}`;
  totalDiv.innerText = `$${subtotal + 20}`;
}

/* ================= CHANGE QTY ================= */
function changeQty(id, color, size, change) {
  const item = cart.find(p => p.id === id && p.color === color && p.size === size);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(p => !(p.id === id && p.color === color && p.size === size));
  }

  saveCart();
  displayCart();
}

/* ================= BADGE ================= */
function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;

  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  badge.style.display = total ? "flex" : "none";
  badge.innerText = total;
}

/* ================= DETAILS PAGE ================= */
document.addEventListener("DOMContentLoaded", () => {

  updateCartBadge();
  displayCart();

  const params = new URLSearchParams(window.location.search);
  if (!params.has("id")) return;

  const product = {
    id: Number(params.get("id")),
    name: params.get("name"),
    price: Number(params.get("price")),
    image: params.get("image"),
    color: params.get("color"),
    style: params.get("style"),
    size: params.get("size")
  };

  document.getElementById("productName").innerText = product.name;
  document.getElementById("productPrice").innerText = product.price;
  document.getElementById("productImage").src = product.image;
  document.getElementById("productColor").innerText = product.color;
  document.getElementById("productStyle").innerText = product.style;
  document.getElementById("productSize").innerText = product.size;

  document.getElementById("addToCartBtn").onclick = () => {
    addToCart(
      product.id,
      product.name,
      product.price,
      product.image,
      product.color,
      product.style,
      product.size
    );
    window.location.href = "cart.html";
  };
});

/* ================= CHECKOUT ================= */
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "form.html";
}


//  payment form
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
//   function changeImage(element) {
//   document.getElementById("mainProductImage").src = element.src;

//   document.querySelectorAll(".thumb").forEach(img => {
//     img.classList.remove("active");
//   });

//   element.classList.add("active");
// }



