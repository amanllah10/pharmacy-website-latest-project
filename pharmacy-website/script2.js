// selection operations
let buyImg = document.querySelector('.buy-img')
let buyTitle = document.querySelector('.buy-title')
let alt = document.querySelector('.alt')
let img2 = document.querySelector('.img2')
let img3 = document.querySelector('.img3')
let img4 = document.querySelector('.img4')

// get items from pharmacy website operation
buyImg.src = localStorage.getItem('productimage')
buyTitle.innerHTML = localStorage.getItem('producttitle')
alt.innerHTML = localStorage.getItem('productalt')


// if else operation for styling lower 3 images
if (alt.innerHTML === 'relief') {
    img2.src = '../images/DSC00001.JPG'
    img3.src = '../images/DSC00007.JPG'
    img4.src = '../images/DSC00008.JPG'
} else if (alt.innerHTML === 'vitamin') {
    img2.src = '../images/DSC00033.JPG'
    img3.src = '../images/DSC00037.JPG'
    img4.src = '../images/DSC00042.JPG'
} else if (alt.innerHTML === 'joint') {
    img2.src = '../images/DSC00053.JPG'
    img3.src = '../images/DSC00055.JPG'
    img4.src = '../images/DSC00056.JPG'
} else if (alt.innerHTML === 'carica') {
    img2.src = '../images/DSC00058.JPG'
    img3.src = '../images/DSC00061.JPG'
    img4.src = '../images/DSC00066.JPG'
} else if (alt.innerHTML === 'cough') {
    img2.src = '../images/DSC00072.JPG'
    img3.src = '../images/DSC00075.JPG'
    img4.src = '../images/DSC00075.JPG'
} else if (alt.innerHTML === 'pain') {
    img2.src = '../images/DSC00077.JPG'
    img3.src = '../images/DSC00086.JPG'
    img4.src = '../images/DSC00087.JPG'
} else if (alt.innerHTML === 'skin') {
    img2.src = '../images/DSC00017.JPG'
    img3.src = '../images/DSC00017.JPG'
    img4.src = '../images/DSC00017.JPG'
} else {
    img2.src = '../images/DSC00017.JPG'
    img3.src = '../images/DSC00017.JPG'
    img4.src = '../images/DSC00017.JPG'
}

// QUANTITY SYSTEM

let plusBtn = document.querySelector('.plus');
let minusBtn = document.querySelector('.minus');
let qtyText = document.querySelector('.qty');

let quantity = 1;

plusBtn.addEventListener('click', function () {
    quantity++;
    qtyText.innerHTML = quantity;
});

minusBtn.addEventListener('click', function () {
    if (quantity > 1) {
        quantity--;
        qtyText.innerHTML = quantity;
    }
});

//ADD TO CART WITH LIVE UPDATE

let addToCartBtn = document.querySelector('.add-to-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

addToCartBtn.addEventListener('click', function () {

    let existingProduct = cart.find(item => item.title === buyTitle.innerHTML);

    if (existingProduct) {
        // same product ho to sirf quantity update hogi
        existingProduct.quantity += quantity;
    } else {
        // new product ho to cart mai add hoga
        let product = {
            image: buyImg.src,
            title: buyTitle.innerHTML,
            category: alt.innerHTML,
            quantity: quantity
        };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product Quantity Local Storage Mai Update Ho Gayi');

    // quantity reset after add
    quantity = 1;
    qtyText.innerHTML = quantity;
});
