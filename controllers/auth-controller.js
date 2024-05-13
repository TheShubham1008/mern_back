const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

// *-------------------------------
//* User Registration Logic
// *-------------------------------

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {


      return res.status(400).json({ message: "email already exists" });
    }

    //const saltRound = 10;
    //const hash_password = await bcrypt.hash(password, saltRound);
    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      info: userCreated,
      msg: "Registration Succesful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json("Internal server error");
  }
};

// *-------------------------------
//* User Login Logic
// *-------------------------------

const login = async (req, res) => {
  try {
    const{email,password}=req.body;

    const userExist=await User.findOne({email});

    if(!userExist){
      return res.status(400).json({message:"Invalid Credentials"});
    }

   // const user =await bcrypt.compare(password,userExist.password);
    const user =await userExist.comparePassword(password);


    if(user){
      res.status(200).json({
        info: userExist,
        msg: "Login  Succesful",
        token: await userExist.generateToken(),
        userId:userExist._id.toString(),
      });
    }else{
      res.status(401).json({message:"Invalid Email or Password "});
    }

  } catch (error) {
    console.error("Internal server error:", error);
    //res.status(500).json("Internal server error");
    next(error);
  }
};



// *---------------------------------------------
// User Logic(to send user data to for it's use)  
// *-------------------------------------------- 

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};





module.exports = { home, register,login,user};
