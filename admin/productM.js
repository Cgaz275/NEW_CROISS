let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let newshopItemsData  = JSON.parse(localStorage.getItem("shopItemsData")) || [];

console.log(newshopItemsData);

if(newshopItemsData.length == 0){
    newshopItemsData = shopItemsData;
    console.log("check");
}

console.log(newshopItemsData);
let generateShop = () => {

  return (shop.innerHTML = newshopItemsData
    .map((x) => {
      let { id, name, price, desc, category, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `

      <div id="confirmationBox" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); z-index: 999; display: none;">
        <p>Are you sure that you want to delete this item?</p>

        <div style=" display:flex; flex-direction:row; gap: 1em">
        <button style="padding:1em; margin-bottom: 1em; background-color: #2f1f20;border:none; color:white; cursor:pointer;" onclick="cancelDelete()">No</button>
        <button style="padding:1em; margin-bottom: 1em; background-color: #2f1f20; border:none; color:white; cursor:pointer;"  onclick="confirmDelete('${id}')">Yes</button>
        </div>

        </div>
        
            <div class = "edit">
            <div id="${id}-details" class="details">
            <div class = "colum"><p>${id}</p></div>
             <div class = "colum"><p>${name}</p></div>
             <div class = "colum"><p>${price}</p></div>
             <div class = "colum"><p>${desc}</p></div>
             <div class = "colum"><p>${category}</p></div>
             <div class = "colum"><img width="50%" src=${img}></div>
                <div class = "colum"><button class="astext" onclick="editProduct('${id}')" ><i class="fa fa-pencil-square-o"></i></button><br><br>
                <button class="astext" onclick="removeProductConfirmation('${id}')">
                <i class="fa fa-trash" aria-hidden="true"></i></button></div>              
             </div>
             <div id="${id}-edit" class="edit-details">
             </div>

    `;
    })

    .join(""));
};

//<i class="fa fa-trash" aria-hidden="true"></i>

generateShop();
// Define a new product object



let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();

  localStorage.setItem('data', JSON.stringify(basket));
};

function addProduct(){
/*add product*/
 const productName = document.getElementById('productName').value;
  const productPrice =  document.getElementById('productPrice').value;
  const productDesc = document.getElementById('productDesc').value;
  const productCategory = document.getElementById('productCategory').value;
  const productImg = document.getElementById('productImg').value;

  // Validate input (you can add more validation as needed)

  // Create a new product object
  const newProduct = {
    id: generateUniqueId(),
    name: productName,
    price: productPrice,
    desc: productDesc,
    category: productCategory,
    img: productImg,
  };

  // Add the new product to the array
  newshopItemsData.push(newProduct);

  // Render the updated products


  localStorage.setItem('shopItemsData', JSON.stringify(newshopItemsData));

    generateShop();
}

// Function to generate a unique ID
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
/*add product*/
}
generateShop();

function editProduct(id) {
    // Find the product details
    let productDetails = newshopItemsData.find((x) => x.id === id);

    // Create a form dynamically
    let form = document.createElement('div');
    form.id = 'editForm';
    form.innerHTML = `
    <div class="form" style="display: flex; flex-direction: column; gap: 20px; max-width: 350px; background-color: #fff; padding: 20px; border-radius: 20px; position: relative;">
    <div style="font-size: 28px; color: #2f1f20; font-weight: 600; letter-spacing: -1px; position: relative; display: flex; align-items: center; justify-content: center;">
        Update
    </div>

    <div style="color: rgba(88, 87, 87, 0.822); font-size: 14px;"> <!-- Phần name đẩy xuống dưới -->
        <label for="editedName" style="margin-bottom: 10px;">Name:</label>
        <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px; width: 100%;">
            <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="text" id="editedName" value="${productDetails.name}">
        </div>
    </div>
  
    <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px;">
        <label for="editedPrice">Price:</label>
        <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="number" id="editedPrice" value="${productDetails.price}">
    </div>
  
    <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px;">
        <label for="editedDesc">Description:</label>
        <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="text" id="editedDesc" value="${productDetails.desc}">
    </div>
  
    <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px;">
        <label for="editedCategory">Choose a category:</label>
        <select style="width: 100%; border: none; border-bottom: 1px solid #ccc;" name="category" id="editedCategory">
            <option value="Muffin">Cookies</option>
            <option value="Bread">Bread</option>
            <option value="Cake">Cake</option>
        </select>
    </div>
  
    <div class="message signin" style="color: rgba(88, 87, 87, 0.822); font-size: 14px; text-align: center;">
        <form action="/action_page.php">
            <input type="file" id="myFile" name="filename">
        </form>
    </div>
  
    <div class="message" style="color: rgba(88, 87, 87, 0.822); font-size: 14px; display: none;">
        <label for="editedImg">Image:</label>
        <input style="width: 100%; border: none; border-bottom: 1px solid #ccc;" type="text" id="editedImg" value="${productDetails.img}">
    </div>
  
    <div class="flex" style="display: flex; width: 100%; gap: 6px; justify-content: center; align-items: center;">
        <button class="submit" style="border: none; outline: none; background-color: #2f1f20; padding: 10px; border-radius: 10px; color: #fff; font-size: 16px; transform: .3s ease;"
            onclick="updateProductDetails('${id}')">Update</button>
    </div>
</div>
    `;
    // Append the form to the details box
    document.getElementById(`${id}-edit`).appendChild(form);
}

function updateProductDetails(id) {
    // Assuming you have input fields for editing in your HTML
    const editedName = document.getElementById('editedName').value;
    const editedPrice = parseFloat(document.getElementById('editedPrice').value);
    const editedDesc = document.getElementById('editedDesc').value;
    const editedCategory = document.getElementById('editedCategory').value;
    const editedImg = document.getElementById('editedImg').value;

    // Input validation
    if (!editedName || isNaN(editedPrice)) {
        alert('Please enter valid data.');
        return;
    }

    // Update the corresponding product's details in the array
    let updatedProductIndex = newshopItemsData.findIndex((x) => x.id === id);
    newshopItemsData[updatedProductIndex].name = editedName;
    newshopItemsData[updatedProductIndex].price = editedPrice;
    newshopItemsData[updatedProductIndex].desc = editedDesc;
    newshopItemsData[updatedProductIndex].category = editedCategory;
    newshopItemsData[updatedProductIndex].img = editedImg;

    // Update local storage
    localStorage.setItem('shopItemsData', JSON.stringify(newshopItemsData));

    // Re-generate the product list
    generateShop();

    // Clear the details box

    // Remove the form

}

generateShop();

function removeProduct(id) {
     // Find the index of the product in the array
     let productIndex = newshopItemsData.findIndex((x) => x.id === id);

     // If the product is found, remove it from the array
     if (productIndex !== -1) {
         newshopItemsData.splice(productIndex, 1);

         // Update local storage
         localStorage.setItem('shopItemsData', JSON.stringify(newshopItemsData));

         // Re-generate the product list in the UI
         generateShop();
     }
 }

 //-----------------------------------------------chatgpt--------------------------------------

    // Đưa các hàm xác nhận xóa ra khỏi hàm removeProductConfirmation
    function cancelDelete() {
    const confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.style.display = 'none';
  }
  
  function confirmDelete(id) {
    removeProduct(id);
    const confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.style.display = 'none';
  }
  
  function removeProductConfirmation(id) {
    const confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.style.display = 'block';
    // Chuyển hàm confirmDelete(id) và cancelDelete() ra khỏi hàm này để có thể truy cập từ bất kỳ nơi nào trong mã của bạn
  }
 //-----------------------------------------------chatgpt--------------------------------------


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

 //---------------------------------------------------

//  function checkLogIn(){

//     let currentUser = localStorage.getItem("currentUser");
//     console.log(currentUser);
//     if(currentUser){
//        location.assign("/User/User.html");
//     }else{
//        location.assign("/Login/sign-in.html");
//     }
// }
// function checkLogInC(){

//    let currentUser = localStorage.getItem("currentUser");
//    console.log(currentUser);
//    if(currentUser){
//       location.assign("/Cart/cart.html");
//    }else{
//       location.assign("/Login/sign-in.html");
//    }
// }

// function logOut(){
//    localStorage.removeItem("currentUser");
//    location.assign("/Login/sign-in.html");
// }