document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');

    const newshopItemsData = [
        {
            id: "abcd",
            name: "Choco Muffin",
            price: 1.2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Muffin",
            img: "../Images/Products/1.png",
          },
          {
            id: "xyzh",
            name: "Lava Bread",
            price: 2.5,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/2.png",
          },
          {
            id: "ujfh",
            name: "French Bread",
            price: 1.25,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/3.png",
          },
          {
            id: "oqis",
            name: "Berry Sandwich Loaf",
            price: 4.5,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/4.png",
          },
          {
            id: "mdns",
            name: "Butter Cheese Bread",
            price: 6,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/5.png",
          },
          {
            id: "qweo",
            name: "Cheese Cake",
            price: 6.7,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Cake",
            img: "../Images/Products/6.png",
          },
          {
            id: "gnms",
            name: "Brown Sugar Bread",
            price: 5.2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/7.png",
          },
          {
            id: "qwuh",
            name: "Cream Cake",
            price: 1.3,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/8.png",
          },
          {
            id: "ibch",
            name: "Almond Bread Loaf",
            price: 5.4,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/9.png",
          },
          {
            id: "jjjm",
            name: "Butter Cake",
            price: 4.5,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Cake",
            img: "../Images/Products/10.png",
          },
          {
            id: "kisjf",
            name: "Honey Pancake",
            price: 2.1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Cake",
            img: "../Images/Products/11.png",
          },
          {
            id: "qqwu",
            name: "Berry Muffin",
            price: 3,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Muffin",
            img: "../Images/Products/12.png",
          },
          {
            id: "msad",
            name: "Croissant",
            price: 4,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/13.png",
          },
          {
            id: "oran",
            name: "Florence Oval",
            price: 3.2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/14.png",
          },
          {
            id: "psdaj",
            name: "Original Cookie",
            price: 2.2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/15.png",
          },
          {
            id: "proSB",
            name: "Snow Bagel",
            price: 3.1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            category: "Bread",
            img: "../Images/Products/16.png",
          },
    ];

    suggestions.innerHTML = '';

    // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
    searchInput.addEventListener('input', function() {
        const inputText = this.value.toLowerCase();

        // Lọc sản phẩm dựa trên tên hoặc category từ mảng shopItemsData
        const matchedProducts = shopItemsData.filter(product =>
            product.name.toLowerCase().includes(inputText) || product.category.toLowerCase().includes(inputText)
        );

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
