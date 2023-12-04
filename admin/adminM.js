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
         <h3> username : ${username}</h3>
         <div id="${username}-details" class="details-content" style="display:none;">
          <h3>Password : ${pass}</h3>
          <p>Name : ${name}</p>
          <p>Address : ${address}</p>
          <p>Phone number : ${phone}</p>

          </div>
 <button onclick="toggleDetails('${username}')">Toggle Details</button>

        </div>


    `;
    })

    .join(""));
};

generateAdmin();
 //Define a new product object

function toggleDetails(username) {
  let detailsDiv = document.getElementById(`${username}-details`);
  detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
}





