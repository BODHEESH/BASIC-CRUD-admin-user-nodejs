
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema =  mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        validate: [validateEmail, 'Please fill a valid email address'],
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        minlength:[6,"Password must contain 6 letters"],
        required:[true,"Password is required"]
    }
  })
  
const User = mongoose.model('user', UserSchema);
module.exports = User;