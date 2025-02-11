document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  displayCart();
  displayCheckout();

  let paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      processPayment();
    });
  }
});

// Add to Cart with Toast Notification
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    let product = {
      name: this.getAttribute("data-name"),
      price: parseFloat(this.getAttribute("data-price")),
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    showCartToast();
  });
});

// Function to Show Bootstrap Toast
function showCartToast() {
  let toastEl = document.getElementById("cart-toast");
  let toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// Update Cart Count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
}

// Display Cart Items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let total = 0;

    if (!cartItems) return;

    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
    });

    document.getElementById("total-price").innerText = total.toFixed(2);
}

// Remove from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}


// Display Checkout Items
function displayCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutItems = document.getElementById("checkout-items");
    let total = 0;

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";
    cart.forEach(item => {
        total += item.price;
        checkoutItems.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
        </tr>`;
    });

    document.getElementById("checkout-total-price").innerText = total.toFixed(2);
}

// Fake Payment Processing
function processPayment() {
    let fullName = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let cardNumber = document.getElementById("card-number").value;
    let expiry = document.getElementById("expiry").value;
    let cvv = document.getElementById("cvv").value;

    if (!fullName || !email || !address || !cardNumber || !expiry || !cvv) {
        alert("Please fill all payment details!");
        return;
    }

    // Simulating Payment Processing Delay
    setTimeout(() => {
        // Generate Random Order Number
        let orderNumber = "GD" + Math.floor(Math.random() * 1000000);

        // Show Confirmation Section
        document.getElementById("order-number").innerText = orderNumber;
        document.getElementById("confirm-name").innerText = fullName;
        document.getElementById("confirm-email").innerText = email;
        document.getElementById("confirm-address").innerText = address;
        document.getElementById("confirm-total").innerText = document.getElementById("checkout-total-price").innerText;

        // Hide Payment Section, Show Confirmation
        document.getElementById("payment-section").classList.add("d-none");
        document.getElementById("confirmation-section").classList.remove("d-none");

        // Clear Cart & Update Count
        localStorage.removeItem("cart");
        updateCartCount();
    }, 1500);
}

