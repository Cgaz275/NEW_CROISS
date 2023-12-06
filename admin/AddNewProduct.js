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
            <div class = "edit">
            <div id="${id}-details" class="details">
            <div class = "colum"><p>${id}</p></div>
             <div class = "colum"><p>${name}</p></div>
             <div class = "colum"><p>${price}</p></div>
             <div class = "colum"><p>${desc}</p></div>
             <div class = "colum"><p>${category}</p></div>
             <div class = "colum"><img width="100%" src=${img}></div>
                <div class = "colum"><button onclick="editProduct('${id}')" ><i class="fa fa-pencil-square-o"></i></button><br><br>
                    <button onclick="removeProduct('${id}')"><i class="fa fa-trash" aria-hidden="true"></i></button></div>
             </div>
             <div id="${id}-edit" class="edit-details">
             </div>

    `;
    })

    .join(""));
};

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
        <label for="editedName">Name:</label>
                <input type="text" id="editedName" value="${productDetails.name}" ><br>

                <label for="editedPrice">Price:</label>
                <input type="number" id="editedPrice" value="${productDetails.price}" ><br>

                <label for="editedDesc">Description:</label>
                <input type="text" id="editedDesc" value="${productDetails.desc}"><br>


                   <label for="editedCategory">Choose a category:</label>
                   <select name="category" id="editedCategory">
                   <option value="Cookies">Cookies</option>
                   <option value="Bread">Bread</option>
                   <option value="Cake">Cake</option>
                   </select>

                <label for="editedImg">Image:</label>
                <input type="text" id="editedImg" value="${productDetails.img}"><br>

                <button onclick="updateProductDetails('${id}')">Update</button>
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