document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');

    const keywords = ['bread', 'muffin', 'cake', 'choco muffin', 'brown bread', 'cream cake', 
    'butter cake', 'berry sandwich', 'almond bread', 'butter bread', 'honey pancake', 'lava bread', 
    'french bread', 'orginal cookie', 'florence oval', 'berry muffin', 'croissant'];

    suggestions.innerHTML = '';

    // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
    searchInput.addEventListener('input', function() {
        const inputText = this.value.toLowerCase();

        // Lọc các từ khóa phù hợp với nội dung nhập vào
        const matchedKeywords = keywords.filter(keyword => keyword.includes(inputText));

        suggestions.innerHTML = '';

        if (inputText !== '') {
            if (matchedKeywords.length > 0) {
                // Lọc và hiển thị gợi ý tối đa 5 từ khóa phù hợp
                const limitedKeywords = matchedKeywords.slice(0, 5);
                limitedKeywords.forEach(keyword => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = '#' + keyword;
                    a.textContent = keyword;
                    li.appendChild(a);
                    suggestions.appendChild(li);
                });

                // Lọc sản phẩm dựa trên gợi ý
                const itemsToDisplay = newshopItemsData.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
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

    // Hàm xử lý khi lựa chọn từ gợi ý
    suggestions.addEventListener('click', function(event) {
        const clickedItem = event.target.textContent;

        // Ẩn gợi ý khi đã chọn
        suggestions.style.display = 'none';

        // Lọc sản phẩm dựa trên gợi ý được chọn
        const itemsToDisplay = newshopItemsData.filter(item => item.name.toLowerCase() === clickedItem.toLowerCase());
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
