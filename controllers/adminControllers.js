const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const {
  loginAuthSchema,
  registerAuthSchema,
} = require("../helpers/validationSchema");


// admin dummy data

const admin = {
  myEmail: "admin@123.com",
  myPassword: 12345,
};

// checks the session exists or not at the time of admin login 

const getLogin = (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin/dashboard");
  } else {
    const message = req.flash("msg");
    res.render("adminlogin", { message });
  }
};

// admin validation using dummy data and creates a session for admin 

const postLogin = (req, res) => {
  const { email, password } = req.body;
  if (email == admin.myEmail && password == admin.myPassword) {
    req.session.admin = req.body.email;
    res.redirect("/admin/dashboard");
  } else {
    req.flash("msg", "INCORRECT DETAILS");
    res.redirect("/admin/login");
  }
};


//handling post request of register from user registration

const adminPostRegister = async (req, res, next) => {
  try {
    const result = await registerAuthSchema.validateAsync(req.body);

    const isExists = await User.findOne({ email: result.email });
    if (isExists) throw new Error("User already exists");

    // password hashing

    bcrypt.hash(result.password, 10, async function (err, hash) {
      if (err) {
        next(err);
      } else {
        const user = await User.create({
          name: result.name,
          email: result.email,
          password: hash,
        });
        const savedUser = await user.save();

        //init session and cookies
        //redirect to homepage

        res.redirect("/admin/dashboard");
      }
    });
  } catch (error) {
    next(error);
  }
};


// getting all user details as an object

const getdashboard = async (req, res, next) => {
  const AllUsers = await User.find({});
  res.render("dashboard", { AllUsers: AllUsers });
};

// check whether the user is exists or not

const postdashboard = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const result = await registerAuthSchema.validateAsync(req.body);
    console.log(result);
    const isExists = await User.findOne({ email: result.email });
    if (isExists) throw new Error("User already exists");

    bcrypt.hash(result.password, 10, async function (err, hash) {
      if (err) {
        next(err);
      } else {
        const user = await User.create({
          name: result.name,
          email: result.email,
          password: hash,
        });
        const savedUser = await user.save();
        res.redirect("/admin/dashboard");
        //init session and cookies
        //redirect to homepage
      }
    });
  } catch (error) {
    next(error);
  }
};


// destroying session when logout presses

const getlogout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      res.redirect("/admin/login");
    }
  });
};


// delete user using params id

const deleteUser = async (req, res) => {
  // req.params.id
  try {
    const userToDelete = await User.deleteOne({ _id: req.params.id });

    res.redirect("/admin/dashboard");
  } catch (error) {
    next(error);
  }
};


//  updating clients from admin dashboard

const updateUser = async (req, res, next) => {
  try {
    const validateEmail = function (email) {
      const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      return re.test(email);
    };

    const { name, email, userId } = req.body;
    let update = {};
    if (validateEmail(req.body.email)) {
      update = {
        email: email,
        name: name,
      };
    }

    console.log(name, email, userId);

    let user = await User.findOneAndUpdate({ _id: userId }, update, {
      new: true,
    });
    res.redirect("/admin/dashboard");
    console.log(user);
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      error.message = "Please provide a valid email";
    }
    next(error);
  }
};

// search user from admin dashboard

const searchUser = async (req, res, next) => {
  try {
    const search_query = req.body.search_query;
    const searchData = await User.find({
      name: { $regex: "^" + search_query, $options: "i" },
    });
    res.render("dashboard", { AllUsers: searchData });
  } catch (error) {
    next(Error);
  }
};



module.exports = {
  getLogin,
  postLogin,
  getdashboard,
  getlogout,
  postdashboard,
  deleteUser,
  searchUser,
  updateUser,
  adminPostRegister,
};
