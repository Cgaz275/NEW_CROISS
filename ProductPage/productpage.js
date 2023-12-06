// Đoạn mã chính
let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("cart")) || [];
let newshopItemsData = JSON.parse(localStorage.getItem("shopItemsData")) || [];

if (newshopItemsData.length == 0) {
    newshopItemsData = shopItemsData;
}

let generateShop = (currentPage) => {
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const searchResult = JSON.parse(localStorage.getItem('searchResult')) || [];

  if (searchResult.length > 0) {
      return (shop.innerHTML = searchResult
          .slice(startIndex, endIndex)
          .map((x) => {
              // Tạo HTML cho sản phẩm từ kết quả tìm kiếm
              let { id, name, price, desc, img } = x;
              let search = basket.find((x) => x.id === id) || [];
              return `
           
              <div id=product-id-${id} class="item">
              <a onclick="chooseProduct(${id})" href="ProductDetail.html">
              <img width="220" src=${img} alt="">
              </a> 
              <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                  <h2>$ ${price} </h2>
                  <div class="buttons" style="display: none">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                      ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                  </div>
                </div>
              </div>
            </div>
               
              `;
          })
          .join(""));
  }

  // Nếu không có kết quả tìm kiếm, hiển thị dữ liệu ban đầu
  return (shop.innerHTML = newshopItemsData
      .slice(startIndex, endIndex)
      .map((x) => {
          // Tạo HTML cho sản phẩm ban đầu
          let { id, name, price, desc, img } = x;
          let search = basket.find((x) => x.id === id) || [];
          return `
          
          <div id=product-id-${id} class="item">
          <a onclick="chooseProduct(${id})" href="ProductDetail.html" >
          <img width="220" src=${img} alt="">
          </a>
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>$ ${price} </h2>
              <div class="buttons" style="display: none">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                  ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>
        
          `;
      })
      .join(""));
};


function reset () {
  
  localStorage.removeItem('searchResult');
}

let showPage = () => {
    const searchResult = JSON.parse(localStorage.getItem('searchResult')) || [];

    if (searchResult.length > 0) {
        generateShop(currentPage);
        updatePaginationButtons();
        return;
    }

    generateShop(currentPage);
    updatePaginationButtons();
};

let currentPage = 1;

let updatePaginationButtons = () => {
    const totalPages = Math.ceil(newshopItemsData.length / 6);

    // Cập nhật nút previous
    document.getElementById("prevPage").disabled = currentPage === 1;

    // Cập nhật nút next
    document.getElementById("nextPage").disabled = currentPage === totalPages;

    // Cập nhật hiển thị trang
    document.getElementById("currentPage").innerText = currentPage;
    document.getElementById("totalPages").innerText = totalPages;
};

let goToPreviousPage = () => {
    if (currentPage > 1) {
        currentPage--;
        showPage();
        updatePaginationButtons();
    }
};

let goToNextPage = () => {
    const totalPages = Math.ceil(newshopItemsData.length / 6);
    if (currentPage < totalPages) {
        currentPage++;
        showPage();
        updatePaginationButtons();
    }
};

// Khi người dùng thực hiện tìm kiếm, lưu kết quả vào localStorage và hiển thị kết quả
searchInput.addEventListener('input', function() {
    const inputText = this.value.toLowerCase();

    const matchedProducts = shopItemsData.filter(product =>
        product.name.toLowerCase().includes(inputText) || product.category.toLowerCase().includes(inputText)
    );

    localStorage.setItem('searchResult', JSON.stringify(matchedProducts));
    
    // Gọi hàm showPage để hiển thị kết quả tìm kiếm ngay lập tức
    showPage();
});

let increment = (id) => {
    updatePaginationButtons();
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
    update(selectedItem.id);

  localStorage.setItem('cart', JSON.stringify(basket));
};
let decrement = (id) => {
updatePaginationButtons();
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem('cart', JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();

  localStorage.setItem('cart', JSON.stringify(basket));
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
function addProduct(){
/*add product*/
 const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productDesc = document.getElementById('productDesc').value;
  const productImg = document.getElementById('productImg').value;

  // Validate input (you can add more validation as needed)

  // Create a new product object
  const newProduct = {
    id: generateUniqueId(),
    name: productName,
    price: productPrice,
    desc: productDesc,
    img: productImg,
  };

  // Add the new product to the array
  shopItemsData.push(newProduct);

  // Render the updated products

  localStorage.setItem('cart', JSON.stringify(basket));
  localStorage.setItem('shopItemsData', JSON.stringify(shopItemsData));
    generateShop();
}

// Function to generate a unique ID
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
/*add product*/
}
generateShop();

// function checkLogIn(){

//     let currentUser = localStorage.getItem("currentUser");
//     console.log(currentUser);
//     if(currentUser){
//        location.assign("../Cart/cart.html");
//     }else{
//        location.assign("../Login/sign-in.html");
//     }
// }

showPage();

/**------------------------------------- */


function checkLogIn(){

  let currentUser = localStorage.getItem("currentUser");
  console.log(currentUser);
  if(currentUser){
     location.assign("../User/User.html");
  }else{
     location.assign("../Login/sign-in.html");
  }
}
function checkLogInC(){

 let currentUser = localStorage.getItem("currentUser");
 console.log(currentUser);
 if(currentUser){
    location.assign("../Cart/cart.html");
 }else{
    location.assign("../Login/sign-in.html");
 }
}

function logOut(){
 localStorage.removeItem("currentUser");
 location.assign("../Login/sign-in.html");
}



let chooseProduct = (id) => {

  let selectedItem = id;
  let search = newshopItemsData.find((x) => x.id === selectedItem.id);
  
  const currentProduct = {
    id: search.id,
    name: search.name,
    price: search.price,
    desc: search.desc,
    detail: search.detail,
    category: search.category,
    img: search.img,
  };

  localStorage.setItem('currentProduct', JSON.stringify(currentProduct));

  };