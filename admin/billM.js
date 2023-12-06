let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let orderList  = JSON.parse(localStorage.getItem("orderList")) || [];

let shopItemsData  = JSON.parse(localStorage.getItem("shopItemsData")) || [];

let orderListID = new Set();

orderList.forEach((order) => {
    orderListID.add(order.orderid);
    console.log(order.orderid);
});

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
                <button style="float: right" onclick="cancelDelete()">No</button><br>
                <div style="text-align: center"><h2 >Item Detail</h2></div>
                <div>${orderHTML}</div>
               
                
                </div>
                  <div class="details">
                  <table cellspacing="0" cellpadding="0">
                  <tr>
                  <td style="width:16%"><p>${orderID}</p></td>
                  <td style="width:16%"><p>${uniqueUsername}</p></td>
                  <td style="width:16%"><p>${uniqueAddress}</p></td>
                  <td style="width:16%"><p>${uniquePaymentMethod}</p></td>
                  <td style="width:16%"><p>${uniqueShippingStatus ? "Yes" : "No"}</p></td>
                  <td style="width:16%"> <p>${orderTimestamp}</p></td>
                  <td style="width:2%">  <button onclick="removeProductConfirmation('${orderID}')">i</button><br></td>
                  </tr>
                  </table>
                    
                   
                   
                    
                                                </div>
                      <div id="ordersContainer" style="display: none;"></div>

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

function removeProductConfirmation(orderID) {
  const confirmationBox = document.getElementById('confirmationBox');
  confirmationBox.style.display = 'block';
  // Chuyển hàm confirmDelete(id) và cancelDelete() ra khỏi hàm này để có thể truy cập từ bất kỳ nơi nào trong mã của bạn
}

generateShop();

function editShippingStatus(orderID) {
  // Find the order with the matching orderID
  let orderToUpdate = orderList.find((order) => order.orderid === orderID);

  // Toggle the shippingStatus (true to false, false to true)
  orderToUpdate.shippingStatus = !orderToUpdate.shippingStatus;

  // Update the displayed details
  generateShop();

  // Update the orderList in local storage
  localStorage.setItem("orderList", JSON.stringify(orderList));
}

// Define a new product object
function toggleDetails(id) {
  let detailsDiv = document.getElementById(`${id}-details`);
  detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
}


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();

  localStorage.setItem('data', JSON.stringify(basket));
};


// SIDEBAR TOGGLE //
var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
    if(!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if(sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}
// SIDEBAR TOGGLE //
const showOrdersButton = document.getElementById("showOrdersButton");
const ordersContainer = document.getElementById("ordersContainer"); // Replace with the actual ID of your container

//----------------------------------------------------------

// function checkLogIn(){

//   let currentUser = localStorage.getItem("currentUser");
//   console.log(currentUser);
//   if(currentUser){
//      location.assign("/User/User.html");
//   }else{
//      location.assign("/Login/sign-in.html");
//   }
// }
// function checkLogInC(){

//  let currentUser = localStorage.getItem("currentUser");
//  console.log(currentUser);
//  if(currentUser){
//     location.assign("/Cart/cart.html");
//  }else{
//     location.assign("/Login/sign-in.html");
//  }
// }

// function logOut(){
//  localStorage.removeItem("currentUser");
//  location.assign("/Login/sign-in.html");
// }