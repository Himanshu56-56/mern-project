const User=require("../models/user-model");
const bcrypt=require("bcryptjs");
const home=async(req,res)=>{
    try{
           res.status(200).send("Welcome to world best MERN Stack technology using router");
    }catch(error){
      console.log(error);
    }
};
 
const register =async(req,res,next)=>{
    try{
        console.log(req.body);
        const{username, email, phone, password}=req.body;

        const userExist =await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"email already exists"});
        }

        // hash the password
        
        // const saltRound =10;
        // const hash_password = await bcrypt.hash(password,saltRound);

       
const userCreated = await User.create({
  username,
  email,
  phone,
  password: hash_password,
});
          res.status(201).json({msg:"Registration Successfully", token:await userCreated.generateToken(),userId:userCreated.id.toString(),});
    }catch(error){
        // res.status(500).json("internal server error");
      next(error);
    }
};

// user login logic
const login = async (req, res, next) => {
  try {
    console.log("LOGIN BODY 👉", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 🔥 FIX HERE
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({
      msg: "Login Successfully",
      token: await userExist.generateToken(),
      userId: userExist.id.toString(),
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    next(error);
  }
};

//to send user data - User Logic

const user = async (req, res) => {
  try {
    return res.status(200).json({
      userData: req.user, // 🔥 frontend expects this
    });
  } catch (error) {
    console.log(`error from user route ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports={home,register,login,user};