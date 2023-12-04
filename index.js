
function checkLogIn(){

    let currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
    if(currentUser){
       location.assign("User/User.html");
    }else{
       location.assign("Login/sign-in.html");
    }
}