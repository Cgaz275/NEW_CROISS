// Đoạn mã chính
let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = JSON.parse(localStorage.getItem("currentProduct")) || [];

function generateProduct(){
  let category = document.getElementById('category-detail');

  let name = document.getElementById('product-name');

  let price = document.getElementById('product-price');


  let desc = document.getElementById('product-desc');
  let detail = document.getElementById('product-detail');
  let image = document.getElementById('product-image');

  image.src = currentProduct.img;


  detail.innerHTML = currentProduct.detail;
  desc.innerHTML = currentProduct.desc;
  price.innerHTML = currentProduct.price;
  name.innerHTML = currentProduct.name;
  category.innerHTML = currentProduct.category;

}

function addToCart(){
  increment(currentProduct.id);
  let addButton = document.getElementById('add-cart');
  let removeButton = document.getElementById('remove-cart');
  removeButton.style.display = 'block';
  addButton.style.display = 'none';
  
}

function removeFromCart(){
  decrement(currentProduct.id);
  let addButton = document.getElementById('add-cart');
  let removeButton = document.getElementById('remove-cart');
  removeButton.style.display = 'none';
  addButton.style.display = 'block';
}




let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
    update(selectedItem);

  localStorage.setItem('cart', JSON.stringify(basket));
};


  
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem);

  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem('cart', JSON.stringify(basket));
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  // document.getElementById(id).innerHTML = search.item;
  calculation();

  localStorage.setItem('cart', JSON.stringify(basket));
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


// Function to generate a unique ID
generateProduct();

// function checkLogIn(){

//     let currentUser = localStorage.getItem("currentUser");
//     console.log(currentUser);
//     if(currentUser){
//        location.assign("../Cart/cart.html");
//     }else{
//        location.assign("../Login/sign-in.html");
//     }
// }


/**------------------------------------- */


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