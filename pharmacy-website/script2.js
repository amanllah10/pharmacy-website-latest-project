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
// if else operation for styling lower 3 images
if (alt.innerHTML === 'relief') {
    img2.src = 'images/DSC00001.JPG';
    img3.src = 'images/DSC00007.JPG';
    img4.src = 'images/DSC00008.JPG';
} else if (alt.innerHTML === 'vitamin') {
    img2.src = 'images/DSC00033.JPG';
    img3.src = 'images/DSC00037.JPG';
    img4.src = 'images/DSC00042.JPG';
} else if (alt.innerHTML === 'joint') {
    img2.src = 'images/DSC00053.JPG';
    img3.src = 'images/DSC00055.JPG';
    img4.src = 'images/DSC00056.JPG';
} else if (alt.innerHTML === 'carica') {
    img2.src = 'images/DSC00058.JPG';
    img3.src = 'images/DSC00061.JPG';
    img4.src = 'images/DSC00066.JPG';
} else if (alt.innerHTML === 'cough') {
    img2.src = 'images/DSC00072.JPG';
    img3.src = 'images/DSC00075.JPG';
    img4.src = 'images/DSC00075.JPG';
} else if (alt.innerHTML === 'pain') {
    img2.src = 'images/DSC00077.JPG';
    img3.src = 'images/DSC00086.JPG';
    img4.src = 'images/DSC00087.JPG';
} else if (alt.innerHTML === 'skin') {
    img2.src = 'images/DSC00017.JPG';
    img3.src = 'images/DSC00017.JPG';
    img4.src = 'images/DSC00017.JPG';
} else {
    img2.src = 'images/DSC00017.JPG';
    img3.src = 'images/DSC00017.JPG';
    img4.src = 'images/DSC00017.JPG';
}


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
    localStorage.setItem("user", JSON.stringify(user));
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
