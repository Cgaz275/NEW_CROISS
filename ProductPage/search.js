//--------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    let filteredData = [...shopItemsData];//copy data from shopItemsData
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');
    const filterButtons = document.querySelectorAll('.item-filter button');
  
    suggestions.innerHTML = '';

    // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
    searchInput.addEventListener('input', function() {
        const inputText = this.value.toLowerCase();

        // Lọc sản phẩm dựa trên tên hoặc category từ mảng shopItemsData
        const matchedProducts = shopItemsData.filter(product =>
            product.name.toLowerCase().includes(inputText) || product.category.toLowerCase().includes(inputText)
        );
        
        // Cập nhật filteredData với kết quả tìm kiếm mới
        filteredData = matchedProducts.slice(); // Copy the matched products to filteredData

        // Lưu kết quả tìm kiếm để sử dụng trên các trang
        localStorage.setItem('searchResult', JSON.stringify(matchedProducts));

        suggestions.innerHTML = '';

        if (inputText !== '') {
            if (matchedProducts.length > 0) {
                // Lấy và hiển thị gợi ý tối đa 5 sản phẩm phù hợp
                const limitedProducts = matchedProducts.slice(0, 5);
                limitedProducts.forEach(product => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = '#' + product.name; // Điều hướng đến sản phẩm nếu cần thiết
                    a.textContent = product.name;
                    li.appendChild(a);
                    suggestions.appendChild(li);
                });

                // Lọc và hiển thị sản phẩm phù hợp dựa trên tìm kiếm
                const itemsToDisplay = matchedProducts;
                const allProducts = document.querySelectorAll('.item');

                // Ẩn tất cả sản phẩm
                allProducts.forEach(product => {
                    product.style.display = 'none';
                });

                // Hiển thị sản phẩm phù hợp
                itemsToDisplay.forEach(product => {
                    const productId = `product-id-${product.id}`;
                    const productToShow = document.getElementById(productId);
                    if (productToShow) {
                        productToShow.style.display = 'block';
                    }
                });
            } else {
                // Hiển thị thông báo khi không tìm thấy sản phẩm phù hợp
                const li = document.createElement('li');
                li.textContent = 'Not found';
                li.style.color = 'white';
                suggestions.appendChild(li);
            }
            suggestions.style.display = 'block'; // Hiển thị gợi ý
        } else {
            suggestions.style.display = 'none'; // Ẩn gợi ý khi ô tìm kiếm trống
        }
    });

    

    /**----------------------------------------------------------------- */

    function displayFilteredProducts() {
        const filteredData = arguments.length > 0 ? arguments[0] : shopItemsData;
        const allProducts = document.querySelectorAll('.item');
      
        // Ẩn tất cả sản phẩm
        allProducts.forEach(product => {
          product.style.display = 'none';
        });
      
        // Hiển thị sản phẩm phù hợp dựa trên category
        filteredData.forEach(product => {
          const productId = `product-id-${product.id}`;
          const productToShow = document.getElementById(productId);
          if (productToShow) {
            productToShow.style.display = 'block';
          }
        });
      }
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category').toLowerCase();
    
            // Lọc sản phẩm dựa trên category từ bản sao của shopItemsData
            const matchedProducts = filteredData.filter(product =>
                product.category.toLowerCase() === category
            );
    
            // Lưu kết quả tìm kiếm để sử dụng trên các trang
            localStorage.setItem('searchResult', JSON.stringify(matchedProducts));
    
            // Cập nhật trang hiển thị mới
            currentPage = 1; // Đặt lại trang về trang đầu tiên sau khi lọc
            const totalPages = Math.ceil(matchedProducts.length / 6); // Tính toán lại số trang mới
            updatePagination(currentPage, totalPages);
        });
    });

    function updatePagination(currentPage, totalPages) {
        updatePaginationButtons(totalPages);
        showPage(currentPage);
        handleFilterButtonClick(); // Gọi lại xử lý filterButton sau khi chuyển trang
    }


    /**----------------------------------------------------------------- */


    // Hàm xử lý khi lựa chọn từ gợi ý
    suggestions.addEventListener('click', function(event) {
        const clickedItem = event.target.textContent;

        // Ẩn gợi ý khi đã chọn
        suggestions.style.display = 'none';

        // Lọc sản phẩm dựa trên gợi ý được chọn
        const itemsToDisplay = shopItemsData.filter(item => item.name.toLowerCase() === clickedItem.toLowerCase());
        const allProducts = document.querySelectorAll('.item');

        // Ẩn tất cả sản phẩm
        allProducts.forEach(product => {
            product.style.display = 'none';
        });

        // Hiển thị sản phẩm phù hợp
        itemsToDisplay.forEach(item => {
            const productId = `product-id-${item.id}`;
            const productToShow = document.getElementById(productId);
            if (productToShow) {
                productToShow.style.display = 'block';
            }
        });

        // Ngăn chặn sự kiện mặc định của element
        event.preventDefault();
    });
});
