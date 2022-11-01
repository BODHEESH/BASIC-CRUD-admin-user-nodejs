var express=require('express');
const { getLogin, postLogin, getdashboard, getlogout, postdashboard, deleteUser, searchUser, updateUser, adminPostRegister } = require('../controllers/adminControllers');
const { auth } = require('../middlewares/auth');
var router = express.Router();


// User login route GET
router.get('/login',getLogin)

// User login route GET
router.post('/login',postLogin)

// admin dashboard login
router.get('/dashboard',auth,getdashboard)

// add user by admin
router.post("/register-user",adminPostRegister)

// Logout
router.get("/logout",getlogout)

// passes id of user that has to be deleted
router.get('/params/:id',deleteUser)

// render dashboard to admin
router.post("/dashboard",postdashboard)

// search clienrts
router.post("/search",searchUser)

// for updating clients details
router.post("/update",updateUser)


module.exports = router;
