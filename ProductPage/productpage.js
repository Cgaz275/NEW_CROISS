let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("cart")) || [];

let newshopItemsData  = JSON.parse(localStorage.getItem("shopItemsData")) || [];

console.log(newshopItemsData);

if(newshopItemsData.length == 0){
    newshopItemsData = shopItemsData;
    console.log("check");
}
console.log(newshopItemsData);
let generateShop = (currentPage) => {
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (shop.innerHTML = newshopItemsData
    .slice(startIndex, endIndex)
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div id=product-id-${id} class="item">
          <img width="220" src=${img} alt="">
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>$ ${price} </h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                  ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join(""));
};

// Example: Display the first page initially
generateShop(1);

// You may need additional logic to handle pagination controls and switch between pages.
let currentPage = 1;

// Hàm hiển thị sản phẩm dựa trên trang hiện tại
let showPage = () => {
  generateShop(currentPage);
    updatePaginationButtons();

};

// Hàm cập nhật trạng thái của nút phân trang
let updatePaginationButtons = () => {
  const totalPages = Math.ceil(newshopItemsData.length / 6);

  // Cập nhật nút previous
  document.getElementById("prevPage").disabled = currentPage === 1;

  // Cập nhật nút next
  document.getElementById("nextPage").disabled = currentPage === totalPages;

  // Cập nhật hiển thị trang
  document.getElementById("currentPage").innerText = currentPage;
  document.getElementById("totalPages").innerText = totalPages;
};

// Hàm xử lý khi nhấn nút previous
let goToPreviousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    showPage();
    updatePaginationButtons();

  }
};

// Hàm xử lý khi nhấn nút next
let goToNextPage = () => {
  const totalPages = Math.ceil(newshopItemsData.length / 6);
  if (currentPage < totalPages) {
    currentPage++;
    showPage();
    updatePaginationButtons();

  }
};

// Hàm khởi tạo và hiển thị trang đầu tiên
showPage();

// Thêm HTML cho nút phân trang vào trang HTML của bạn
// (Sử dụng các sự kiện "click" để gọi goToPreviousPage và goToNextPage)

let filterByCategory = (category) => {
  showPage(currentPage, searchTerm, category);
};


let increment = (id) => {
    updatePaginationButtons();
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

  // console.log(basket);
    update(selectedItem.id);

  localStorage.setItem('cart', JSON.stringify(basket));
};
let decrement = (id) => {
updatePaginationButtons();
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem('cart', JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();

  localStorage.setItem('cart', JSON.stringify(basket));
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
function addProduct(){
/*add product*/
 const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productDesc = document.getElementById('productDesc').value;
  const productImg = document.getElementById('productImg').value;

  // Validate input (you can add more validation as needed)

  // Create a new product object
  const newProduct = {
    id: generateUniqueId(),
    name: productName,
    price: productPrice,
    desc: productDesc,
    img: productImg,
  };

  // Add the new product to the array
  shopItemsData.push(newProduct);

  // Render the updated products

  localStorage.setItem('cart', JSON.stringify(basket));
  localStorage.setItem('shopItemsData', JSON.stringify(shopItemsData));
    generateShop();
}

// Function to generate a unique ID
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
/*add product*/
}
generateShop();

// function checkLogIn(){

//     let currentUser = localStorage.getItem("currentUser");
//     console.log(currentUser);
//     if(currentUser){
//        location.assign("../Cart/cart.html");
//     }else{
//        location.assign("../Login/sign-in.html");
//     }
// }

showPage();

/**------------------------------------- */


function checkLogIn(){

  let currentUser = localStorage.getItem("currentUser");
  console.log(currentUser);
  if(currentUser){
     location.assign("User/User.html");
  }else{
     location.assign("Login/sign-in.html");
  }
}
function checkLogInC(){

 let currentUser = localStorage.getItem("currentUser");
 console.log(currentUser);
 if(currentUser){
    location.assign("/Cart/cart.html");
 }else{
    location.assign("/Login/sign-in.html");
 }
}

function logOut(){
 localStorage.removeItem("currentUser");
 location.assign("/Login/sign-in.html");
}