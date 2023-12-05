let newshopUsersData  = JSON.parse(localStorage.getItem("shopUsersData")) || [];

            const u = document.getElementById("username");
            const a = document.getElementById("address");
            const p = document.getElementById("phone");
            const p1 = document.getElementById("pass1");
            const p2 = document.getElementById("pass2");


        function checkForm() {
            var checkIncorrect = false;
            var usernameError = document.getElementById("usernameError");
            var addressError = document.getElementById("addressError");
            var phoneError = document.getElementById("phoneError");
            var pass1Error = document.getElementById("pass1Error");
            var pass2Error = document.getElementById("pass2Error");
            var Upper = /[A-Z]/.test(p1.value);
            var Special = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(p1.value);

            if(u.value !== "") {
                if(u.value.length < 8) {
                    usernameError.textContent = "Username must be larger than 8 characters!";
                    checkIncorrect = true;
                    u.focus();
                } else {
                    usernameError.textContent = "";
                }

                newshopUsersData.forEach((user) => {
                    if(user.username === u.value){
                        usernameError.textContent = "Username is exist";
                        u.focus();
                        checkIncorrect = true;
                    }

                });
            }
            else if(u.value === "") {
                usernameError.textContent = "Please enter Username!"
                u.focus();
                checkIncorrect = true;

            } else {
                usernameError.textContent = "";
            }

            if(p1.value !== "") {
                if(p1.value.length < 8 && !Upper && !Special) {
                    pass1Error.textContent = "Password must be larger than 8 characters, contains upper and special characters!";
                    p1.focus();
                    checkIncorrect = true;

                } else {
                    pass1Error.textContent = "";
                }
            }
            else if(p1.value === "") {
                pass1Error.textContent = "Please enter password!";
                p.focus();
                checkIncorrect = true;
            } else {
                pass1Error.textContent = "";
            }

            if(p2.value !== "") {
                if(p2.value !== p1.value) {
                    pass2Error.textContent = "Wrong confirmation!";
                    p2.focus();
                    checkIncorrect = true;
                } else {
                    pass2Error.textContent = "";
                }
            }
            else if(p2.value === "") {
                pass2Error.textContent = "Please confirm password!";
                p2.focus();
                checkIncorrect = true;
            } else {
                pass2Error.textContent = "";
            }

            if(a.value === "") {
                addressError.textContent = "Please enter address!";
                a.focus();
                checkIncorrect = true;
            } else {
                addressError.textContent = "";
            }

            if(p.value !== "") {
                if(p.value.length < 10) {
                    phoneError.textContent = "Please enter valid phone number!";
                    p.focus();
                    checkIncorrect = true;
                } else {
                    phoneError.textContent = "";
                }
            }
            else if(p.value === "") {
                phoneError.textContent = "Please enter phone number!";
                p.focus();
                checkIncorrect = true;
            } else {
                phoneError.textContent = "";
            }

            if(!checkIncorrect){
                addUsers();
                location.assign("../Login/sign-in.html")
            }


        }

        function changeSituation1() {
            var mk = document.getElementById("pass1");
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

function addUsers(){
/*add product*/


  // Validate input (you can add more validation as needed)

  // Create a new product object
  const newUsers = {
    username: u.value,
    pass: p1.value,
    address: a.value,
    phone: p.value,
  };

  // Add the new product to the array
  newshopUsersData.push(newUsers);

  // Render the updated products

  localStorage.setItem('shopUsersData', JSON.stringify(newshopUsersData));

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
 