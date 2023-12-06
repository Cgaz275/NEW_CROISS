// Đoạn mã chính
let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("cart")) || [];
let newshopItemsData = JSON.parse(localStorage.getItem("shopItemsData")) || [];
// localStorage.setItem('bigItemList', JSON.stringify(shopItemsData));

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
              <img width="220" src=${img} alt="">

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

                <div class="more-detail">
                <a onclick="chooseProduct(${id})" href="ProductDetail.html">More Details</a>
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
          <img width="220" src=${img} alt="">

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

            <div class="more-detail">
              <a onclick="chooseProduct(${id})" href="ProductDetail.html">More Details</a>
            </div>

          </div>

        </div>
          `;
      })
      .join(""));
};
// function for clicking outside the more detail a 


// You may need additional logic to handle pagination controls and switch between pages.
function reset () { 
  localStorage.removeItem('searchResult');
}

let currentPage = 1;

let updatePaginationButtons = (totalPages) => {
  // Cập nhật nút previous
  document.getElementById('prevPage').disabled = currentPage === 1;

  // Cập nhật nút next
  document.getElementById('nextPage').disabled = currentPage === totalPages;

  // Cập nhật hiển thị trang
  document.getElementById('currentPage').innerText = currentPage;
  document.getElementById('totalPages').innerText = totalPages;
};


let showPage = () => {
  const searchResult = JSON.parse(localStorage.getItem('searchResult')) || [];
  const itemsPerPage = 6;

  let dataToDisplay = searchResult.length > 0 ? searchResult : newshopItemsData;

  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  shop.innerHTML = dataToDisplay
      .slice(startIndex, endIndex)
      .map((x) => {
          // Tạo HTML cho sản phẩm từ kết quả tìm kiếm hoặc dữ liệu được lọc
          let { id, name, price, desc, img } = x;
          let search = basket.find((x) => x.id === id) || [];
          return `
          <div id=product-id-${id} class="item">
          <img width="220" src=${img} alt="">

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

           <div class="more-detail">
              <a onclick="chooseProduct(${id})" href="ProductDetail.html">More Details</a>
            </div>

          </div>

        </div>   
              `;
      })
    
      .join('');

  updatePaginationButtons(totalPages);
};


// Hàm hiển thị sản phẩm dựa trên trang hiện tại
// let showPage = () => {
//   generateShop(currentPage);
//     updatePaginationButtons();

// };

// Hàm cập nhật trạng thái của nút phân trang


let goToPreviousPage = () => {
  currentPage = currentPage || 1;

  if (currentPage > 1) {
      currentPage--;
      const totalPages = Math.ceil(newshopItemsData.length / 6); // tính toán totalPages mới
      showPage();
      updatePaginationButtons(totalPages);
      handleFilterButtonClick(); // Gọi lại xử lý filterButton sau khi chuyển trang
  }
};

let goToNextPage = () => {
  currentPage = currentPage || 1;
  const totalPages = Math.ceil(newshopItemsData.length / 6);

  if (currentPage < totalPages) {
      currentPage++;
      showPage();
      updatePaginationButtons(totalPages);
      handleFilterButtonClick(); // Gọi lại xử lý filterButton sau khi chuyển trang
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
    category: search.category,
    img: search.img,
  };

  localStorage.setItem('currentProduct', JSON.stringify(currentProduct));

  };


