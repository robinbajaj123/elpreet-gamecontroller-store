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
// Display Cart Items and Handle Checkout Button
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let total = 0;
    let checkoutButton = document.getElementById("checkout-button");
    let checkoutButtonText = document.getElementById("checkout-button-text");
    let checkoutSpinner = document.getElementById("checkout-spinner");

    if (!cartItems || !checkoutButton) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `<tr><td colspan="3" class="text-center text-muted">Your cart is empty.</td></tr>`;
        document.getElementById("total-price").innerText = "0.00";
        checkoutButton.style.display = "none"; // Hide checkout button if cart is empty
        return;
    }

    checkoutButton.style.display = "block"; // Show checkout button if cart has items

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
    });

    document.getElementById("total-price").innerText = total.toFixed(2);

    // Add Event Listener to Proceed to Checkout Button
    checkoutButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent immediate navigation

        // Show Spinner & Disable Button
        checkoutButtonText.innerText = "Processing...";
        checkoutSpinner.classList.remove("d-none");
        checkoutButton.classList.add("disabled");

        // Simulate Delay before Redirecting
        setTimeout(() => {
            window.location.href = "checkout.html";
        }, 1500);
    });
}


// Remove from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}



// Display Checkout Items & Auto-Fill Payment Form
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

    // Auto-Fill Payment Details
    document.getElementById("full-name").value = "John Doe";
    document.getElementById("email").value = "johndoe@example.com";
    document.getElementById("address").value = "123 Main St, New York, NY";
    document.getElementById("card-number").value = generateRandomCardNumber();
    document.getElementById("expiry").value = generateRandomExpiry();
    document.getElementById("cvv").value = generateRandomCVV();
}

// Generate Random Card Number
function generateRandomCardNumber() {
    return "4" + Math.floor(1000000000000000 + Math.random() * 900000000000000);
}

// Generate Random Expiry Date (MM/YY format)
function generateRandomExpiry() {
    let month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    let year = String(new Date().getFullYear() + Math.floor(Math.random() * 5)).slice(-2);
    return `${month}/${year}`;
}

// Generate Random CVV
function generateRandomCVV() {
    return Math.floor(100 + Math.random() * 900).toString();
}


// Fake Payment Processing with Spinner
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

    // Disable Button & Show Spinner
    let payButton = document.getElementById("pay-button");
    let payButtonText = document.getElementById("pay-button-text");
    let spinner = document.getElementById("spinner");

    payButton.disabled = true;
    payButtonText.innerText = "Processing...";
    spinner.classList.remove("d-none");

    // Simulating Payment Processing Delay
    setTimeout(() => {
        // Generate Random Order Number
        let orderNumber = "GD" + Math.floor(Math.random() * 1000000);

        // Hide Payment Section, Show Confirmation
        document.getElementById("order-number").innerText = orderNumber;
        document.getElementById("confirm-name").innerText = fullName;
        document.getElementById("confirm-email").innerText = email;
        document.getElementById("confirm-address").innerText = address;
        document.getElementById("confirm-total").innerText = document.getElementById("checkout-total-price").innerText;

        document.getElementById("payment-section").classList.add("d-none");
        document.getElementById("confirmation-section").classList.remove("d-none");

        // Clear Cart & Update Count
        localStorage.removeItem("cart");
        updateCartCount();

        // Reset Pay Button
        payButton.disabled = false;
        payButtonText.innerText = "Pay Now";
        spinner.classList.add("d-none");

    }, 1500);
}


