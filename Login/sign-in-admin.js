function checkForm() {
    var u = document.getElementById("username");
    var p = document.getElementById("password");

    var checkPass = false;

        shopAdminData.forEach((admin) => {
            if(admin.username === u.value){
                if(admin.pass === p.value){
                    checkPass = true;
                }
            }
        });
        if(!checkPass){
            alert("Password is wrong");
            u.focus();
            return false;
        }
        location.replace("../admin/adminM.html");
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
