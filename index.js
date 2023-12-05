
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
