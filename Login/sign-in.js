let newshopUsersData  = JSON.parse(localStorage.getItem("shopUsersData")) || [];

function checkForm() {
    var u = document.getElementById("username");
    var p = document.getElementById("password");
    var checkExist = false;
    var checkPass = false;

    if(u.value != "") {
        if(u.value.length < 8) {
            alert("Username must be larger than 8 characters!");
            u.focus();
            return false;
        }

        newshopUsersData.forEach((user) => {
            if(user.username === u.value){
                checkExist = true;
            }
        });

        if(!checkExist){
            alert("Username not exist");
            u.focus();
            return false;
        }
    }
    else {
            alert("Please enter username!");
            u.focus();
            return false;
    }

    if(p.value != "") {
            if(p.value.length < 8) {
                alert("Password must be larger than 8 characters!");
                p.focus();
                    return false;
                }

        newshopUsersData.forEach((user) => {
            if(user.username === u.value){
                if(user.pass === p.value){
                    checkPass = true;
                }
            }
        });
        if(!checkPass){
            alert("Password is wrong");
            u.focus();
            return false;
        }
    }
    else {
                alert("Please enter password!");
                p.focus();
                return false;
    }

    localStorage.setItem('currentUser', u.value );
    location.replace("../index.html")
}

function changeSituation() {
    var mk = document.getElementById("password");
    var e = document.getElementById("eye");

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
       location.assign("/User/User.html");
    }else{
       location.assign("/Login/sign-in.html");
    }
 }
 function checkLogInC(){
 
   let currentUser = localStorage.getItem("currentUser");
   console.log(currentUser);
   if(currentUser){
      location.assign("/Cart/cart.html");
   }else{
      location.assign("/Login/sign-in.html");
   }
 }
 
 function logOut(){
   localStorage.removeItem("currentUser");
   location.assign("/Login/sign-in.html");
 }
 
