const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");


//each product

function renderProducts() {

    products.forEach((product) => {

        productsEl.innerHTML +=

            `
        <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>&#8377;</small>${product.price}</h2>
                        <p>
                             ${product.description}
                             <br>
                             
                        </p>
                        <p>
                             <br>
                             
                             Location : ${product.location}
                             
                             
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `
    })
}
renderProducts();
// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// add products
function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus",id);
    } 
     else {
        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }

    updateCart();

}

function updateCart() {
    renderCartItems();
    renderSubtotal();

    //save to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}
//change total
function renderSubtotal()
{
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {

        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subtotalEl.innerHTML = `Subtotal (${totalItems}): &#8377;${totalPrice}`
    totalItemsInCartEl.innerHTML = totalItems;
}

//add items
function renderCartItems() {
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
    
    <div class="cart-item">

                    <div class="item-info" onclick = "removeItemsFromCart(${item.id})">
                        <img src="${item.imgSrc}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>&#8377;</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onclick ="changeNumberOfUnits('minus', ${item.id})" >-</div>
                        <div class="number">${item.numberOfUnits}</div>
                        <div class="btn plus" onclick ="changeNumberOfUnits('plus', ${item.id})">+</div>
                    </div>
    </div>
    `;

    });
}
//remove units

function removeItemsFromCart(id){
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if(item.id === id)
        {
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            }
            else if(action === "plus" && numberOfUnits < item.instock){
                numberOfUnits++;
            }
        }
        return{
            ...item,
            numberOfUnits, 
        };
       
    });
    updateCart();
}
