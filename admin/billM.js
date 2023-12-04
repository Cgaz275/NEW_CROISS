let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let orderList  = JSON.parse(localStorage.getItem("orderList")) || [];

let newshopItemsData  = JSON.parse(localStorage.getItem("shopItemsData")) || [];

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
                    return `
                      <div class="order-details">
                        <p>id: ${order.id}</p>
                        <h3>Quantity: ${order.quantity}</h3>
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
                  <div class="details">
                    <h3>Bill ID: ${orderID}</h3>
                    <h4>User Name: ${uniqueUsername}</h4>
                    <p>Address: ${uniqueAddress}</p>
                    <p>Payment Method: ${uniquePaymentMethod}</p>
                    <p>Shipped: ${uniqueShippingStatus ? "Yes" : "No"}</p>
                    <p>Order Timestamp: ${orderTimestamp}</p>
                    ${orderHTML}
                    <button onclick="editShippingStatus('${orderID}')">Change Shipping Status</button>
                                                </div>
                  </div>
                `;
              })
              .join("")
          );
};

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


