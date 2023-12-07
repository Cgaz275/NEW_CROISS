
function checkLogIn(){

    let currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
    if(currentUser){
      // If logged in, show the logout button
      document.getElementById("logoutButton").style.display = "block"; // Fixed: Showing the logout button
       location.assign("/NEWCROISSSSS/User/User.html");
    }else{
       location.assign("/NEWCROISSSSS/Login/sign-in.html");
    }
}  
function checkLogInC(){

   let currentUser = localStorage.getItem("currentUser");
   console.log(currentUser);
   if(currentUser){
      location.assign("/NEWCROISSSSS/Cart/cart.html");
   }else{
      location.assign("/NEWCROISSSSS/Login/sign-in.html");
   }
}

function logOut(){
   localStorage.removeItem("currentUser");
   location.assign("/NEWCROISSSSS/Login/sign-in.html");
   
}

