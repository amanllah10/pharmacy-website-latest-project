// ================== PRODUCT SETUP ==================
let buyImg = document.querySelector('.buy-img');
let buyTitle = document.querySelector('.buy-title');
let alt = document.querySelector('.alt');
let img2 = document.querySelector('.img2');
let img3 = document.querySelector('.img3');
let img4 = document.querySelector('.img4');

// Load product from localStorage
buyImg.src = localStorage.getItem('productimage');
buyTitle.innerHTML = localStorage.getItem('producttitle');
alt.innerHTML = localStorage.getItem('productalt');

// Lower images switch
const altValue = alt.innerHTML;
const imageSets = {
    relief: ['/images/DSC00001.JPG', '/images/DSC00007.JPG', '/images/DSC00008.JPG'],
    vitamin: ['/images/DSC00033.JPG', '/images/DSC00037.JPG', '/images/DSC00042.JPG'],
    joint: ['/images/DSC00053.JPG', '/images/DSC00055.JPG', '/images/DSC00056.JPG'],
    carica: ['/images/DSC00058.JPG', '/images/DSC00061.JPG', '/images/DSC00066.JPG'],
    cough: ['/images/DSC00072.JPG', '/images/DSC00075.JPG', '/images/DSC00075.JPG'],
    pain: ['/images/DSC00077.JPG', '/images/DSC00086.JPG', '/images/DSC00087.JPG'],
    default: ['/images/DSC00017.JPG', '/images/DSC00017.JPG', '/images/DSC00017.JPG']
};
let selectedImages = imageSets[altValue] || imageSets.default;
img2.src = selectedImages[0];
img3.src = selectedImages[1];
img4.src = selectedImages[2];

// ================== QUANTITY ==================
let plusBtn = document.querySelector('.plus');
let minusBtn = document.querySelector('.minus');
let qtyText = document.querySelector('.qty');
let quantity = 1;

plusBtn.addEventListener('click', () => {
    quantity++;
    qtyText.innerHTML = quantity;
    updateTotal();
});

minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        qtyText.innerHTML = quantity;
        updateTotal();
    }
});

// ================== PRICE ==================
let productPrice = Number(localStorage.getItem('productprice')) || 100;
let priceBox = document.querySelector(".price-box");
let totalBox = document.querySelector(".total-box");
totalBox.style.marginTop = '10px' 
priceBox.innerHTML = "Price: Rs. " + productPrice;

function updateTotal() {
    totalBox.innerHTML = "Total: Rs. " + (productPrice * quantity);
}
updateTotal();

// ================== VALIDATE FORM ==================
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');

function validateForm() {
    if (!nameInput.value || !emailInput.value || !phoneInput.value || !addressInput.value) return false;
    if (!emailInput.value.includes("@") || phoneInput.value.length < 11) return false;
    return true;
}

// ================== ADD TO CART ==================
document.querySelector('.add-to-cart').addEventListener('click', () => {
    if (!validateForm()) {
        alert("Please fill the form before adding to cart.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = {
        name: buyTitle.innerHTML,
        image: buyImg.src,
        price: productPrice,
        quantity: quantity
    };

    let existing = cart.find(c => c.name === item.name);
    if (existing) existing.quantity += item.quantity;
    else cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
});

// ================== CHECK CART ==================
document.getElementById("checkCartBtn").addEventListener("click", () => {
    if (!validateForm()) {
        alert("Please fill the form before checking cart.");
        return;
    }

    // Save order to backend
    const user = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value
    };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
        alert("Add items to cart first!");
        return;
    }

    const orderData = {
        user,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    fetch("https://pharmacy-backend.fly.dev/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Order saved:", data);
        window.location.href = "cart.html"; // redirect to cart page
    })
    .catch(err => {
        console.error(err);
        alert("Failed to save order.");
    });
});

// ================== PLACE ORDER ==================
document.getElementById("placeOrderBtn").addEventListener('click', () => {
    if (!validateForm()) {
        alert("Please fill the form before placing order.");
        return;
    }

    const user = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value
    };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const orderData = {
        user,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    fetch("https://pharmacy-backend.fly.dev/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ Order placed successfully!");
        localStorage.removeItem("cart"); // clear cart
        console.log("Order placed, but stay on same page."); // NO redirect
    })
    .catch(err => {
        console.error("Order submission failed:", err);
        alert("❌ Something went wrong.");
    });
});
