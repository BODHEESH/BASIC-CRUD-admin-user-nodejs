var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');
var submitError = document.getElementById('submit-error');


function validateName() {
    var name=document.getElementById("contact-name").value;

    if(name.length== 0){
        nameError.innerHTML = "Name is required";
        return false;
    }
    if(name.length<3){
        nameError.innerHTML='Minimum 3 charater';
        return false;
    }
    if (name.match(' '+' ')) {
        nameError.innerHTML = 'Adjacent spaces are not allowed';
        return false;
    }
    if(!name.match( /^[a-zA-Z]+( [a-zA-Z]+)+$/)){
        nameError.innerHTML='Write full name';
        return false;
    }
   
    nameError.innerHTML= '';
    return true;
   
}

// function validatePhone() {
//     var phone = document.getElementById("contact-phone").value;

//     if(phone.length == 0){
//         phoneError.innerHTML = 'phone no is required';
//         return false;
//     }

//     if(phone.length !== 10){
//         phoneError.innerHTML = 'phone no should be 10 digits';
//         return false;
//     }

//     if(!phone.match(/^[0-9]{10}$/)){
//         phoneError.innerHTML='Only digits please';
//         return false;
//     }
//     if(phone== 9207830668){
//         phoneError.innerHTML = 'hey its my num bro!'
//         return false;
//     }
//     phoneError.innerHTML= '';
//     return true;


// }

function validateEmail (){
    var email =document.getElementById("contact-email").value;

    if(email.length == 0){
        emailError.innerHTML ='Email is required'
        return false;
    }

    if(!email.match( /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)){
        emailError.innerHTML = 'Email Invalid'
        return false;
    }
    if(email=='ameenputhalath789@gmail.com'){
        emailError.innerHTML = 'hey its my mail'
        return false;
    }

    emailError.innerHTML = '';
    return true;
}
function validatePass(){
    var password = document.getElementById('contact-password').value;


    if(password == ""){
        passwordError.innerHTML ="Fill the password please!"
        return false;
    }
    if(password.length < 8){
        passwordError.innerHTML =  "Password length must be atleast 8 characters";
        return false;
    }
    // if(!password.match(  /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,15}$/)){
    //     passwordError.innerHTML='Password should contain at least One numeric digit, One Uppercase and one Lowercase letter';
    //     return false;
    // }
    // if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && 
    //             password.match(/[^a-zA-Z\d]/g) && password.length >= 8)

   
    if(password.length > 15){
        passwordError.innerHTML = "Password length must not exceed 15 characters";
        return false;
    }
    
    passwordError.innerHTML = '';
    return true;
}


function validatePassword(){
    var password = document.getElementById('contact-password').value;
    var confirmPassword=document.getElementById("contact-Confirmpassword").value;
    if(password!= confirmPassword){
        alert("Passwords do not match");
        return false;
    }
    passwordError.innerHTML = '';
    return true;
}

function validateForm(){
    if(!validateName() || !validatePass() || !validateEmail() ||!validatePassword()) {
      submitError.style.display='block';
      submitError.innerHTML='Please Fill Correctly';
      setTimeout(function(){submitError.style.display='none';},5005);
      return false;
    }
}


