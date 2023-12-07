let shop = document.getElementById("shop");

// let basket = JSON.parse(localStorage.getItem("data")) || [];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let orderList  = JSON.parse(localStorage.getItem("orderList")) || [];

let shopItemsData  = JSON.parse(localStorage.getItem("shopItemsData")) || [];

let currentUser = localStorage.getItem("currentUser");

let orderListID = new Set();

orderList.forEach((order) => {

    if(order.username === currentUser){
        orderListID.add(order.orderid);
    }

});

 console.log(orderListID);

// Convert the Set to an array of objects before storing in local storage
let billIDArray = Array.from(orderListID).map(orderID => ({ orderID }));

// Convert the array to JSON string and store it in local storage
localStorage.setItem('orderID', JSON.stringify(billIDArray));

// Retrieve the JSON string from local storage and parse it back to an array of objects
let storedBillIDArray = JSON.parse(localStorage.getItem("orderID")) || [];

// To use the name 'orderID', you can do something like this
console.log(storedBillIDArray);

let generateShop = () => {

  return (  shop.innerHTML = storedBillIDArray
              .map((bill) => {
                let { orderID } = bill;

                // Find orders with the matching orderID
                let orders = orderList.filter((order) => order.orderid === orderID);

                // Find items in the basket with the matching orderID
                let itemsInOrder = basket.filter((item) => item.orderid === orderID);
              
                // Generate HTML for each order
                let orderHTML = orders
                  .map((order) => {
                    
                    let search = shopItemsData.find((x) => x.id === order.id) || [];
                    console.log(order.id);
                    console.log(search.name);
                    return `
                      <div style ="display:flex;justify-content: space-between;align-items:center"class="order-details">
                        <img style="width:10%" src="${search.img}"></img>
                        <p>${search.name}</p>
                        <p>$ ${search.price}</p>
                        <h4>Quantity: ${order.quantity}</h4>
                      </div>
                    `;
                  })
                  .join("");

                // Generate HTML for each item in the order

                let uniqueUsername = orders.length > 0 ? orders[0].username : '';
                let uniqueAddress = orders.length > 0 ? orders[0].address || '' : '';
                let uniquePaymentMethod = orders.length > 0 ? orders[0].paymentMethod || '' : '';
                let uniqueShippingStatus = orders.some((order) => order.shippingStatus);
                let orderTimestamp = orders.length > 0 ? orders[0].timestamp || '' : '';

                return `
                      
                  <div class = "edit">
                  <div id="confirmationBox" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); z-index: 999; display: none;">
                  <button class = "astext" style="float:right" onclick="cancelDelete()"><span class="material-symbols-outlined">
                  cancel
                  </span></button><br>
                  <div style="text-align: center;font-size:125%"><h2>Item Detail</h2></div>
                  <div>${orderHTML}</div>
                 
                  
                  </div>
                      <div id="${orderID}-details" class="details">
                      <div class = "colum"><p>${orderID}</p></div>
                      <div class = "colum"><p>${uniqueUsername}</p></div>
                      <div class = "colum"><p>${uniqueAddress}</p></div>
                      <div class = "colum"><p>${uniquePaymentMethod}</p></div>
                      <div class = "colum"><p>${uniqueShippingStatus ? "Yes" : "No"}</p></div>
                      <div class = "colum"><p>${orderTimestamp}</p> </div>
                      <div class = "colum"><button  class = "astext" onclick="removeProductConfirmation()"><span class="material-symbols-outlined">
                      feature_search
                      </span></button></div>
                      </div>
                     
                `;
              })
              .join("")
          );
};
function cancelDelete() {
  const confirmationBox = document.getElementById('confirmationBox');
  confirmationBox.style.display = 'none';
}

function confirmDelete(orderID) {
  removeProduct(orderID);
  const confirmationBox = document.getElementById('confirmationBox');
  confirmationBox.style.display = 'none';
}

function removeProductConfirmation() {
  const confirmationBox = document.getElementById('confirmationBox');
  confirmationBox.style.display = 'block';
  // Chuyển hàm confirmDelete(id) và cancelDelete() ra khỏi hàm này để có thể truy cập từ bất kỳ nơi nào trong mã của bạn
}
// onclick="editProduct('${orderID}')"
// onclick="removeProductConfirmation('${orderID}')
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = orderList
      .map((x) => {
        let { item, id } = x;
        let search = newshopItemsData.find((y) => y.id === order.id) || [];
        
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2 id="total-head" >Total Bill : $ ${amount}</h2>
    `;
  } else return;
};
TotalAmount();
generateShop();

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