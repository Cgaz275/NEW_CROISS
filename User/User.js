
let user = document.getElementById("user");

let storedUsername = localStorage.getItem("currentUser");
let newshopUsersData = JSON.parse(localStorage.getItem("shopUsersData")) || [];

console.log(newshopUsersData);

// Find the user with the matching username
let currentUserData = newshopUsersData.find(user => user.username === storedUsername);

if (currentUserData) {
  let { username, pass, name, address, phone } = currentUserData;

  let generateUser = () => {
    return (user.innerHTML = `
        <div class="details">
            <h3>Username: ${username}</h3>
            <p>Password: ${pass}</p>
            <p>Name: ${name}</p>
            <p>Address: ${address}</p>
            <p>Phone number: ${phone}</p>
        </div>
        <a href="../User/OrderHistory.html">Order History</a
    `);
  };

  generateUser();
} else {
  console.log("User not found");
}