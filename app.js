require("dotenv").config()
const express = require('express');
const app= express ()
var createError = require('http-errors');
var path = require('path');
const session = require('express-session')
const flash = require('connect-flash')
const { v4: uuidv4 } = require("uuid")



const bodyParser=require("body-parser")
var cookieParser = require('cookie-parser');
app.use(express.json())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set("view engine", "ejs")

app.use(cookieParser());
app.use(flash());

// Browser cache (when back presses in browser)

app.use((req, res, next) => {
    if (!req.admin) {
      res.header("cache-control", "private,no-cache,no-store,must revalidate");
      res.header("Express", "-3");
    }
    next();
  });

//  Created session and cokkie max age
  
  const maxAge = 24 * 60 * 60 * 1000;
  app.use(
    session({
      secret: uuidv4(),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: maxAge }
    })
  );

// Initialise routes 

app.use("/user",require("./routes/userRouter"))
app.use("/admin",require("./routes/adminRouter"))


//Mongo db connection
const {connectDb}= require("./helpers/mongo_init");
connectDb();

 //handle all the requests to the routes that does not exists

 app.use(async(req,res,next)=>{
  next(createError.NotFound())
})

//error handler that handles all errors that passes in next(error)

app.use((err,req,res,next)=>{
  res.status(err.status || 500)
  res.json({error:{status:err.status || 500,message:err.message}
  })
})
  
// port setting

module.exports = app;
PORT = 5005;
const port= process.env.PORT || 5005
app.listen(port,()=>
console.log(`server is running at port at ${PORT}`))
