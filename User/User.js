
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
      <div class="mid">
        <div class = "nav">
          <nav>
          <ul>
            <li><a href="" class = "current">User Information</a></li>
            <li><a href="../User/OrderHistory.html">Order History</a></li>
          </ul>
          </nav>
        </div>

        <div class = "res_detail">
          <div class="details">
            <p>User Information</p>
            <span>Username:</span> <input type="text" value="${username}" readonly>           
            <span>Name:</span> <input type="text" id="nameInput" value="${name}">
            <span>Address:</span> <input type="text" id="addressInput" value="${address}">
            <span>Phone number:</span> <input type="number" value="${phone}" readonly>
            <button>Save changes</button>
          </div>
        </div>

      </div>
    `);
  };

  generateUser();
} else {
  console.log("User not found");
}

let nameInput = document.getElementById("nameInput");

nameInput.addEventListener("input", (event) => {
  // Lắng nghe sự kiện khi người dùng nhập vào ô tên
  currentUserData.name = event.target.value;
  // Lưu lại dữ liệu đã thay đổi vào localStorage
  localStorage.setItem("shopUsersData", JSON.stringify(newshopUsersData));
});

let addressInput = document.getElementById("addressInput");

addressInput.addEventListener("input", (event) => {
  // Lắng nghe sự kiện khi người dùng nhập vào ô địa chỉ
  currentUserData.address = event.target.value;
  // Lưu lại dữ liệu đã thay đổi vào localStorage
  localStorage.setItem("shopUsersData", JSON.stringify(newshopUsersData));
});


