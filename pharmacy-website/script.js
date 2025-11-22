// type writer operation
var typed = new Typed("#typed", {
    strings: ["Pharmacy"],
    typeSpeed: 80,      
    backSpeed: 0,        
    loop: true           
});
AOS.init();

// button select
let buttons = document.querySelectorAll('button')

// click buttons operation
buttons.forEach((btns)=>{
    btns.addEventListener('click',()=>{
        let product = btns.parentElement
        
        let image = product.querySelector('img').src
        let title = product.querySelector('h2').innerHTML
        let alt = product.querySelector('img').alt

        localStorage.setItem('productimage',image)
        localStorage.setItem('producttitle',title)
        localStorage.setItem('productalt',alt)
        console.log('Alt',alt)
        location.href = 'buypage.html'
    })
})
