function checkForm(redirectURL) {
    var p = document.getElementById("phone");
    var phoneError = document.getElementById("phoneError");

    if(p.value !== "") {
        if(p.value.length != 10) {
            phoneError.textContent = "Please enter valid phone number!";
            p.focus();
        } else {
            phoneError.textContent = "";
            alert("OTP has been sent!");
            setTimeout(function () {
                window.location.href = redirectURL;
            }, 0); // Giá trị timeout là 0 để hàm setTimeout thực thi ngay lập tức sau khi xử lý xong đống sự kiện hiện tại
        
        }
    }
    else if(p.value === "") {
        phoneError.textContent = "Please enter phone number!";
        p.focus();
    } else {
        phoneError.textContent = "";
    }
}