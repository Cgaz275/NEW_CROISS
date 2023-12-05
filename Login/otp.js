function checkForm(redirectURL) {
    var o = document.getElementById("otp");
    var oError = document.getElementById("otp_error");
    var p1 = document.getElementById("new_pass");
    var pass1Error = document.getElementById("pass1Error");
    var p2 = document.getElementById("pass2");
    var pass2Error = document.getElementById("pass2Error");
    var Upper = /[A-Z]/.test(p1.value);
    var Special = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(p1.value);

    var check = true;

    if(o.value !== "") {
        if(o.value.length != 4) {
            oError.textContent = "Please enter valid OTP";
            o.focus();
            check = false;
        } else {
            oError.textContent = "";
        }
    }
    else if(o.value === "") {
        oError.textContent = "Please enter OTP!";
        o.focus();
        check = false;
    } else {
        oError.textContent = "";
    }

    if(p1.value !== "") {
        if(p1.value.length < 8 && !Upper && !Special) {
            pass1Error.textContent = "Password must be larger than 8 characters, contains upper and special characters!";
            p1.focus();
            check = false;
        } else {
            pass1Error.textContent = "";
        }
    }
    else if(p1.value === "") {
        pass1Error.textContent = "Please enter new password!";
        p.focus();
        check = false;
    } else {
        pass1Error.textContent = "";
    }

    if(p2.value !== "") {
        if(p2.value !== p1.value) {
            pass2Error.textContent = "Wrong confirmation!";
            p2.focus();
            check = false;
        } else {
            pass2Error.textContent = "";
        }
    }
    else if(p2.value === "") {
        pass2Error.textContent = "Please confirm password!";
        p2.focus();
        check = false;
    } else {
        pass2Error.textContent = "";
    }

    if(check) {
        alert("Password changed!");
            setTimeout(function () {
                window.location.href = redirectURL;
            }, 0);
    }
}

function changeSituation1() {
    var mk = document.getElementById("new_pass");
    var e = document.getElementById("eye1");
    
    if(mk.type === "password") {
        mk.type = "text";
    }
    else {
        mk.type = "password";
    }
}

function changeSituation2() {
    var mk = document.getElementById("pass2");
    var e = document.getElementById("eye2");
    
    if(mk.type === "password") {
        mk.type = "text";
    }
    else {
        mk.type = "password";
    }
}


function checkLogIn(){

    let currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
    if(currentUser){
       location.assign("User/User.html");
    }else{
       location.assign("Login/sign-in.html");
    }
 }
 function checkLogInC(){
 
   let currentUser = localStorage.getItem("currentUser");
   console.log(currentUser);
   if(currentUser){
      location.assign("/Cart/cart.html");
   }else{
      location.assign("Login/sign-in.html");
   }
 }
 
 function logOut(){
   localStorage.removeItem("currentUser");
   location.assign("Login/sign-in.html");
 }
 