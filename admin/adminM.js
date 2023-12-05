let admin = document.getElementById("admin");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let newshopAdminData  = JSON.parse(localStorage.getItem("shopAdminData")) || [];

console.log(newshopAdminData);

if(newshopAdminData.length == 0){
    newshopAdminData = shopAdminData;
    console.log("check");
}

console.log(newshopAdminData);


let generateAdmin = () => {

  return (admin.innerHTML = newshopAdminData
    .map((x) => {
      let { username, pass, name, address, phone } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div class="details">
        <h1>Admin Information</h1>
         <h3> username : ${username}</h3>
          <h3>Password : ${pass}</h3>
          <p>Name : ${name}</p>
          <p>Address : ${address}</p>
          <p>Phone number : ${phone}</p>
        </div>


    `;
    })

    .join(""));
};

generateAdmin();
 //Define a new product object

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




