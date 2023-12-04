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
        <div class="details">
         <h3> Username : ${username}</h3>
         <div id="${username}-details" class="details-content" style="display:none;">
          <h3>Password : ${pass}</h3>
          <p>Name : ${name}</p>
          <p>Address : ${address}</p>
          <p>Phone number : ${phone}</p>
             <button onclick="editUser('${username}')" >Edit</button>
          </div>
 <button onclick="toggleDetails('${username}')">Toggle Details</button>
 <button onclick="removeUser('${username}')">Remove</button>
        </div>


    `;
    })

    .join(""));
};

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
   <label for="editedPassword">Password:</label>
   <input type="text" id="editedPassword" value="${userDetails.pass}" ><br>

    <label for="editedName">Name:</label>
    <input type="text" id="editedName" value="${userDetails.name}" ><br>

    <label for="editedAddress">Address:</label>
    <input type="text" id="editedAddress" value="${userDetails.address}"><br>

    <label for="editedPhone">Phone:</label>
    <input type="text" id="editedPhone" value="${userDetails.phone}"><br>

    <button onclick="updateUserDetails('${username}')">Update</button>
  `;
  // Append the form to the details box
document.getElementById(`${username}-details`).appendChild(form);

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

function removeUser(username) {
  // Find the index of the user in the array
  let userIndex = newshopUsersData.findIndex((x) => x.username === username);

  // If the user is found, remove it from the array
  if (userIndex !== -1) {
    newshopUsersData.splice(userIndex, 1);

    // Update local storage
    localStorage.setItem('shopUsersData', JSON.stringify(newshopUsersData));

    // Re-generate the user list in the UI
    generateUser();
  }
}