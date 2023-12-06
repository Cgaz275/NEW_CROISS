let label = document.getElementById("label");

let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("cart")) || [];

let orderList = JSON.parse(localStorage.getItem("orderList")) || [];

let newshopItemsData  = JSON.parse(localStorage.getItem("shopItemsData")) || [];

let currentUser = localStorage.getItem("currentUser");

let newshopUsersData  = JSON.parse(localStorage.getItem("shopUsersData")) || [];

let userAddress;


newshopUsersData.forEach((user) => {

    if(user.username === currentUser ){
        userAddress = user.address;
    }

});


console.log(newshopItemsData);

if(newshopItemsData.length == 0){
    newshopItemsData = shopItemsData;
    console.log("check");
}

console.log(newshopItemsData);

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = newshopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">

        <img width="100" src=${search.img} alt="" />
        <div class="details">

        <div class="title-x-container">
        
          <div class="title-price-x">
            <p class="title-price">
            <p id="item-name" >${search.name}</p>
            <p class="cart-item-price">$ ${search.price}</p>
            </p>
          </div>

        </div>

          <div class="buttons-container">

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          </div>

          <p id="total-item-price" >Total: $ ${item * search.price}</p>
        
        </div>
        <i id="item-remove" onclick="removeItem(${id})" class="bi bi-x-lg"></i>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="../index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("cart", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("cart", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("cart", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("cart", JSON.stringify(basket));
};

let checkOut = () => {
    let orderId = generateUniqueId();
    var method;

    if (document.getElementById('cash').checked) {
      method = document.getElementById('cash').value;
    }

    if (document.getElementById('nocash').checked) {
      method = document.getElementById('nocash').value;
    }

    var address = document.getElementById('address').value;



    let isShipped = false;

    basket.forEach((item) => {
           orderList.push({
              id: item.id,
              quantity: item.item,
              orderid: orderId,
              username: currentUser,
              paymentMethod: method,
              address: address,
               shippingStatus: isShipped,
               timestamp: new Date().toLocaleString(),
            });
    });
  localStorage.setItem("orderList", JSON.stringify(orderList));
  basket = [];
  generateCartItems();
  localStorage.setItem("cart", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = newshopItemsData.find((y) => y.id === id) || [];
        
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2 id="total-head" >Total Bill : $ ${amount}</h2>

    <div class="action-option">

      <button class="action-button checkout" onclick="checkOut()">Checkout</button>
      <button onclick="clearCart()" class="action-button removeAll">Clear Cart</button>

    </div>

    <div class="radio">

    <div class="payment-option">
    <input type="radio" id="cash" name="paymentmethod" value="CASH" checked />
    <label for="cash"> In cash (COD)</label></br>
    </div>

    <div class="payment-option">
    <input type="radio" id="nocash" name="paymentmethod" value="NOCASH" />
    <label for="nocash"> Visa / Mastercard</label></br>
    </div>

    </div>

    <div class="ship-adress">
        <label for="address"> Shipped address</label></br>
        <input type="text" id="address" value="${userAddress}" />
    </div>
    `;
  } else return;
};

TotalAmount();

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
/*add product*/
}
/**------------------------------------------------------------------ */

function checkLogIn(){

  let currentUser = localStorage.getItem("currentUser");
  console.log(currentUser);
  if(currentUser){
     location.assign("../User/User.html");
  }else{
     location.assign("../Login/sign-in.html");
  }
}
function checkLogInC(){

 let currentUser = localStorage.getItem("currentUser");
 console.log(currentUser);
 if(currentUser){
    location.assign("../Cart/cart.html");
 }else{
    location.assign("../Login/sign-in.html");
 }
}

function logOut(){
 localStorage.removeItem("currentUser");
 location.assign("../Login/sign-in.html");
}