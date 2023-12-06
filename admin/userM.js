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
          <div class = "colum"><p>${username}</p></div>
          <div class = "colum"><p>${pass}</p></div>
          <div class = "colum"><p>${name}</p></div>
          <div class = "colum"><p>${address}</p></div>
          <div class = "colum"><p>${phone}</p></div>
             <div class = "colum"><button class="astext" onclick="editUser('${username}')" ><i class="fa fa-pencil-square-o"></i></button></div>
            
        </div>
         <div id="${username}-edit" class="edit-details">
         </div>

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

function editUser(username) {   isInEditMode = true;

  // Find the user details
  let userDetails = newshopUsersData.find((x) => x.username === username);

  // Create a form dynamically
  let form = document.createElement('div');
  form.id = 'editForm';
  form.innerHTML = `
   <label for="editedPassword">Password:</label><br>
   <input style="width:50%" type="text" id="editedPassword" value="${userDetails.pass}" ><br><br>

    <label for="editedName">Name:</label><br>
    <input style="width:50%" type="text" id="editedName" value="${userDetails.name}" ><br><br>

    <label for="editedAddress">Address:</label><br>
    <input style="width:50%" type="text" id="editedAddress" value="${userDetails.address}"><br><br>

    <label for="editedPhone">Phone:</label><br>
    <input style="width:50%" type="text" id="editedPhone" value="${userDetails.phone}"><br><br>

    <button style="width:50%" onclick="updateUserDetails('${username}')">Update</button>
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