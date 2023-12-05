let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let orderList  = JSON.parse(localStorage.getItem("orderList")) || [];

let newshopItemsData  = JSON.parse(localStorage.getItem("shopItemsData")) || [];

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
                          <div class = "history">
                            <span>Bill ID:${orderID}<span> 
                            <span>User Name: ${uniqueUsername}</span>
                            <span>Address: ${uniqueAddress}</span>
                            <span>Payment Method: ${uniquePaymentMethod}</span>
                            <span>Shipped: ${uniqueShippingStatus ? "Yes" : "No"}</span>
                            <span>Order Timestamp: ${orderTimestamp}</span>
                            ${orderHTML}
                          </div>
                      </div>
                `;
              })
              .join("")
          );
};

generateShop();