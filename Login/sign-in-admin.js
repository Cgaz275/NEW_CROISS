

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