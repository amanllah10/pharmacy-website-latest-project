// ================== LOAD CART ==================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const tbody = document.querySelector('#cartTable tbody');
const checkoutBtn = document.getElementById('checkoutBtn');

function loadCart() {
    tbody.innerHTML = "";

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:20px;">
                    Your cart is empty
                </td>
            </tr>
        `;
        checkoutBtn.style.display = "none";
        return;
    }

    checkoutBtn.style.display = "block";

  cart.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td data-label="Item"><img src="${item.image}" width="50"> ${item.name}</td>
        <td data-label="Price">Rs. ${item.price}</td>
        <td data-label="Quantity">${item.quantity}</td>
        <td data-label="Total">Rs. ${item.price * item.quantity}</td>
        <td data-label="Remove"><button class="remove" data-index="${index}">X</button></td>
    `;

    tbody.appendChild(row);
});


    addGrandTotalRow();
}

// ================== GRAND TOTAL ROW ==================
function addGrandTotalRow() {
    const total = calculateGrandTotal();
    const row = document.createElement("tr");
    row.innerHTML = `
        <td colspan="3" style="text-align:right;"><b>Grand Total:</b></td>
        <td><b>Rs. ${total}</b></td>
        <td></td>
    `;
    tbody.appendChild(row);
}

function calculateGrandTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ================== REMOVE ITEM ==================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
});

loadCart();

// ================== CHECKOUT BUTTON ==================
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    // Check if user info exists in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    let name = user.name;
    let email = user.email;
    let phone = user.phone;
    let address = user.address;

    // If user info not present, ask via prompt
    if (!name || !email || !phone || !address) {
        name = prompt("Enter your name:");
        email = prompt("Enter your email:");
        phone = prompt("Enter your phone:");
        address = prompt("Enter your address:");

        if (!name || !email || !phone || !address) {
            alert("All fields are required!");
            return;
        }
    }

    const orderData = {
        user: { name, email, phone, address },
        items: cart,
        total: calculateGrandTotal()
    };

    // Send order to backend
    fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ Order placed successfully!");
        localStorage.removeItem("cart"); // clear cart
        cart = [];
        loadCart(); // refresh table
        console.log("Order saved:", data);
    })
    .catch(err => {
        console.error("Order submission failed:", err);
        alert("❌ Failed to place order.");
    });
});
