const User =require("../model/userModel")
const bcrypt=require("bcrypt");
const createError = require('http-errors');
const { loginAuthSchema,registerAuthSchema } = require("../helpers/validationSchema");



const getLogin=(req,res)=>{
  if(req.session.user){
    res.redirect('/user/homepage')
}
 else {
    const message = req.flash('msg')
    res.render('userLogin', { message })
}
}


const postLogin = async(req,res,next)=>{
    const { email, password } = req.body;
    console.log(req.body)
 
  try {
    const result = await loginAuthSchema.validateAsync(req.body)
    const user = await User.findOne({ email:result.email });

    if (!user) throw createError.NotFound("User not found")

    bcrypt.compare(password, user.password, function(err, result) {
      
      if(err){
        next(err)
      }else{
        if(result){
         //init session and redirect to homepage
         req.session.user = req.body.email;
         res.redirect("/user/homepage")
        }else{
          req.flash('msg', 'INCORRECT DETAILS');
          res.redirect('/user/login');    
            }
      }

  });
    

  } catch (error) {
    next(error);
  }
};


const getSignup=(req,res)=>{
  if(req.session.user){
    res.redirect('/homepage')
}
 else {
    res.render("signup")
}
}

const userLogout=(req,res)=>{
    req.session.destroy(function (err) {
        if (err) {
            console.log(err)
            res.send('error')
        }
        else {
            res.redirect('/user/login')
        }
    })
}



const getHomepage=(req,res)=>{
    res.render("userHomepage")
}
// post request of signup
const postSignup= async (req,res,next)=>{
  const { email, password, name } = req.body;

  try {
    
    const result = await registerAuthSchema.validateAsync(req.body)
    console.log(result);
    const isExists = await User.findOne({ email: result.email });
    if (isExists) throw new Error("User already exists");

    
    bcrypt.hash(result.password, 10,async function(err, hash) {
     
      if(err){
        next(err)
       }else{
        const user =await User.create({name:result.name,  email:result.email,password:hash  })
        const savedUser = await user.save()
        res.redirect("/user/login")
        //init session and cookies
       //redirect to homepage
       }
    
  });
    
  } catch (error) {
    
    next(error);
  }
};


module.exports={getLogin,postLogin,getSignup,userLogout,getHomepage,postSignup}