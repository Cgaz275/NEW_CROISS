//-----------------------------SEARCHING SUGGEST----------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');
  
    // Danh sách các danh mục sản phẩm
    const categories = ['bread', 'cake', 'muffin'];
  
    // Danh sách từ khóa để gợi ý trong ô tìm kiếm
    const keywords = ['bread', 'muffin', 'cake', 'choco muffin', 'brown bread', 'cream cake', 
    'butter cake', 'berry sandwich', 'almond bread', 'butter bread', 'honey pancake', 'lava bread', 
    'french bread', 'orginal cookie', 'florence oval', 'berry muffin', 'croissant'];
  
    suggestions.style.display = 'none';
  
    // Xử lý sự kiện input khi người dùng nhập vào ô tìm kiếm
    searchInput.addEventListener('input', function() {
      const inputText = this.value.toLowerCase();
  
      // Lọc các từ khóa phù hợp với nội dung nhập vào
      const matchedKeywords = keywords.filter(keyword => keyword.includes(inputText));
  
      suggestions.innerHTML = '';
  
      if (inputText !== '') {
        if (matchedKeywords.length > 0) {
          // Hiển thị gợi ý tối đa 5 từ khóa phù hợp
          const limitedKeywords = matchedKeywords.slice(0, 5);
          limitedKeywords.forEach(keyword => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + keyword;
            a.textContent = keyword;
            li.appendChild(a);
            suggestions.appendChild(li);
          });
        } else {
          // Hiển thị thông báo khi không tìm thấy từ khóa phù hợp
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

    //xử lý sự kiện click

    // Hàm xử lý khi lựa chọn từ gợi ý
    suggestions.addEventListener('click', function(event) {
    const clickedItem = event.target.textContent;

    // Ẩn gợi ý khi đã chọn
    suggestions.style.display = 'none';

    // Kiểm tra xem từ khóa được chọn thuộc category hay là sản phẩm riêng
    if (categories.includes(clickedItem.toLowerCase())) {
        // Lọc và hiển thị sản phẩm thuộc category được chọn
        const itemsToDisplay = newshopItemsData.filter(item => item.category.toLowerCase() === clickedItem.toLowerCase());
        const allProducts = document.querySelectorAll('.item');

        // Ẩn tất cả sản phẩm
        allProducts.forEach(product => {
            product.style.display = 'none';
        });

        // Hiển thị sản phẩm thuộc category được chọn
        itemsToDisplay.forEach(item => {
            const productId = `product-id-${item.id}`;
            const productToShow = document.getElementById(productId);
            if (productToShow) {
                productToShow.style.display = 'block';
            }
        });
    } else {
        // Lọc và hiển thị sản phẩm chỉ đúng với từ khóa được chọn
        const matchedItems = newshopItemsData.filter(item => item.name.toLowerCase().includes(clickedItem.toLowerCase()));
        const allProducts = document.querySelectorAll('.item');

        allProducts.forEach(product => {
            product.style.display = 'none';
        });

        matchedItems.forEach(item => {
            const productId = `product-id-${item.id}`;
            const productToShow = document.getElementById(productId);
            if (productToShow) {
                productToShow.style.display = 'block';
            }
        });
    }
});
  
    // Xử lý sự kiện blur khi người dùng click ra ngoài ô tìm kiếm
    searchInput.addEventListener('blur', function() {
      suggestions.style.display = 'none'; // Ẩn gợi ý khi ô tìm kiếm không được focus
    });
  
    let selectedSuggestion = '';
  
    // Hàm xử lý lọc và hiển thị sản phẩm dựa trên gợi ý
    let filterBySuggestion = () => {
      const suggestionValue = selectedSuggestion.toLowerCase();
      
      if (categories.includes(suggestionValue)) {
        const itemsToDisplay = newshopItemsData.filter(item => item.category.toLowerCase() === suggestionValue);
  
        const allProducts = document.querySelectorAll('.item');
        allProducts.forEach(product => {
          product.style.display = 'none';
        });
  
        itemsToDisplay.forEach(item => {
          const productId = `product-id-${item.id}`;
          const productToShow = document.getElementById(productId);
          if (productToShow) {
            productToShow.style.display = 'block';
          }
        });
      } else {
        const matchedItems = newshopItemsData.filter(item => item.name.toLowerCase().includes(selectedSuggestion));
        
        const allProducts = document.querySelectorAll('.item');
        allProducts.forEach(product => {
          product.style.display = 'none';
        });
        
        matchedItems.forEach(item => {
          const productId = `product-id-${item.id}`;
          const productToShow = document.getElementById(productId);
          if (productToShow) {
            productToShow.style.display = 'block';
          }
        });
      }
    };
  });


  ///////////////////////////////////////////////////

  