//-----------------------------SEARCHING SUGGEST----------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');
  
    const keywords = ['bread', 'muffin', 'cake', 'choco muffin','brown bread', 'cream cake','butter cake','berry sandwich',
'almond bread','butter bread','honey pancake','lava bread','french bread','orginal cookie','florence oval',
'berry muffin','croissant']; // Các từ khóa để gợi ý
  
    suggestions.style.display = 'none'; // Ẩn suggest ban đầu
  
    searchInput.addEventListener('input', function() {
      const inputText = this.value.toLowerCase(); // Lấy nội dung nhập vào và chuyển thành chữ thường
  
      const matchedKeywords = keywords.filter(keyword => keyword.includes(inputText));
  
      // Xóa bỏ các gợi ý trước đó
      suggestions.innerHTML = '';
  
      // Kiểm tra và hiển thị gợi ý hoặc thông báo "Not found"
      if (inputText !== '') {
        if (matchedKeywords.length > 0) {
          const limitedKeywords = matchedKeywords.slice(0, 5); // Giới hạn hiển thị 5 kết quả đầu tiên
          limitedKeywords.forEach(keyword => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + keyword;
            a.textContent = keyword;
            li.appendChild(a);
            suggestions.appendChild(li);
          });
        } else {
          const li = document.createElement('li');
          li.textContent = 'Not found';
          li.style.color = 'white';
          suggestions.appendChild(li);
        }
        suggestions.style.display = 'block'; // Hiển thị suggest nếu có kết quả
      } else {
        suggestions.style.display = 'none'; // Ẩn suggest nếu input trống
      }
    });
  
    // Sự kiện blur: ẩn suggest khi người dùng bấm ra ngoài input
    searchInput.addEventListener('blur', function() {
      suggestions.style.display = 'none';
    });
});