let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let newshopUsersData  = JSON.parse(localStorage.getItem("shopUsersData")) || [];

console.log(newshopUsersData);

if(newshopUsersData.length == 0){
    newshopUsersData = shopUsersData;
    console.log("check");
}

console.log(newshopUsersData);


let generateUser = () => {

  return (shop.innerHTML = newshopUsersData
    .map((x) => {
      let { username, pass, name, address, phone } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div>
        <div class="details">
        <table>
        <tr>
        <td style="width:23%"><p>${username}</p></td>
        <td style="width:23%"><p>${name}</p></td>
        <td style="width:23%"><p>${address}</p></td>
        <td style="width:15%"><p>${phone}</p></td>
        
        <td style="width:11%"><button class="astext" onclick="editUser('${username}')" ><i class="fa fa-pencil-square-o"></i></button></div></td>
        <td style="5%"> <p><div class="toggler">
        <input id="toggler-1" name="toggler-1" type="checkbox" value="1">
        <label for="toggler-1">
            <svg class="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <line class="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
            <line class="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
            </svg>
            <svg class="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
               
                <polyline class="path check" points="100.2,40.2 51.5,88.8 29.8,67.5"></polyline>
            </svg>
        </label></div></p></td>
        </tr>
        </table>
        
          
      </div>
        </div>
         <div id="${username}-edit" class="edit-details"></div>

    `;
    })

    .join(""));
};

//  <button class="astext" onclick="removeUser('${username}')"><i class="fa fa-trash" aria-hidden="true"></i></button></div>

generateUser();
// Define a new product object

function toggleDetails(username) {
  let detailsDiv = document.getElementById(`${username}-details`);
  detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
}

function addUsers(){
/*add product*/
const Username = document.getElementById('Username').value;
 const Pass = document.getElementById('Pass').value;
  const Name = document.getElementById('Name').value;
  const Address = document.getElementById('Address').value;
  const Phone= document.getElementById('Phone').value;

  // Validate input (you can add more validation as needed)

  // Create a new product object
  const newUsers = {
    username: Username,
    pass: Pass,
    name: Name,
    address: Address,
    phone: Phone,
  };

  // Add the new product to the array
  newshopUsersData.push(newUsers);

  // Render the updated products

  localStorage.setItem('data', JSON.stringify(basket));
  localStorage.setItem('shopUsersData', JSON.stringify(newshopUsersData));

  generateUser();

}

// Function to generate a unique ID
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
/*add product*/
}
generateUser();

function editUser(username) { 

  // Find the user details
  let userDetails = newshopUsersData.find((x) => x.username === username);

  // Create a form dynamically
  let form = document.createElement('div');
  form.id = 'editForm';
  form.innerHTML = `
  <div class="form" style="display: flex; flex-direction: column; gap: 20px; max-width: 350px; background-color: #fff; padding: 20px; border-radius: 20px; position: relative;">
    <div style="font-size: 28px; color: #2f1f20; font-weight: 600; letter-spacing: -1px; position: relative; display: flex; align-items: center; justify-content: center;">
        Edit information
    </div>

    <div style="color: rgba(88, 87, 87, 0.822); font-size: 14px;"> <!-- Phần Password -->
    <label for="editedPassword" style="margin-bottom: 10px;">Password:</label>
    <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px; width: 100%;">
        <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="password" id="editedPassword" value="${userDetails.pass}" readonly>
    </div>
</div>

    <div style="color: rgba(88, 87, 87, 0.822); font-size: 14px;"> <!-- Phần Name -->
        <label for="editedName" style="margin-bottom: 10px;">Name:</label>
        <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px; width: 100%;">
            <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="text" id="editedName" value="${userDetails.name}">
        </div>
    </div>

    <div style="color: rgba(88, 87, 87, 0.822); font-size: 14px;"> <!-- Phần Address -->
        <label for="editedAddress" style="margin-bottom: 10px;">Address:</label>
        <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px; width: 100%;">
            <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="text" id="editedAddress" value="${userDetails.address}">
        </div>
    </div>

    <div style="color: rgba(88, 87, 87, 0.822); font-size: 14px;"> <!-- Phần Phone -->
        <label for="editedPhone" style="margin-bottom: 10px;">Phone:</label>
        <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px; width: 100%;">
            <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="text" id="editedPhone" value="${userDetails.phone}">
        </div>
    </div>

    <div class="flex" style="display: flex; width: 100%; gap: 6px; justify-content: center; align-items: center;">
        <button class="submit" style="border: none; outline: none; background-color: #2f1f20; padding: 10px; border-radius: 10px; color: #fff; font-size: 16px; transform: .3s ease;"
            onclick="updateUserDetails('${username}')">Update</button>
    </div>
</div>
  `;
  // Append the form to the details box
document.getElementById(`${username}-edit`).appendChild(form);

    // Stop the event propagation to prevent it from closing the details box

}

function updateUserDetails(username) {
  // Assuming you have input fields for editing in your HTML
  const editedPassword = document.getElementById('editedPassword').value;
  const editedName = document.getElementById('editedName').value;
  const editedAddress = document.getElementById('editedAddress').value;
  const editedPhone = document.getElementById('editedPhone').value;

  // Update the corresponding user's details in the array
  let updatedUserIndex = newshopUsersData.findIndex((x) => x.username === username);
   newshopUsersData[updatedUserIndex].pass = editedPassword;
  newshopUsersData[updatedUserIndex].name = editedName;
  newshopUsersData[updatedUserIndex].address = editedAddress;
  newshopUsersData[updatedUserIndex].phone = editedPhone;

  // Update local storage
  localStorage.setItem('shopUsersData', JSON.stringify(newshopUsersData));

  // Re-generate the user list
  generateUser();

  // Remove the form
  let form = document.getElementById('editForm');
  if (form) {
    form.remove();
  }
}

generateUser();

// function removeUser(username) {
//   // Find the index of the user in the array
//   let userIndex = newshopUsersData.findIndex((x) => x.username === username);

//   // If the user is found, remove it from the array
//   if (userIndex !== -1) {
//     newshopUsersData.splice(userIndex, 1);

//     // Update local storage
//     localStorage.setItem('shopUsersData', JSON.stringify(newshopUsersData));

//     // Re-generate the user list in the UI
//     generateUser();
//   }
// }
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

/**---------------------------------------------------------- */

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