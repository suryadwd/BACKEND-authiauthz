const bcrypt = require("bcrypt");
const user = require("../model/userData");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await user.findOne({ email });

    const hashPassword = await bcrypt.hash(password, 10);

    if (!userExist) {
      const newUser = new user({ name, email, password: hashPassword, role });
      await newUser.save();
      res.status(201).json({ success: true, data: newUser });
    } else {
      res.status(404).json({ message: "user already exist" });
    }
  } catch (error) {
    console.error("Error:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "both fields are needed" });
  
    const userExist = await user.findOne({ email });
  
    if (!userExist)
      return res
        .status(400)
        .json({ success: false, message: "email is not register" });
  
    const checkPass = await bcrypt.compare(password, userExist.password);
  
    const payload = {
      email: userExist.email,
      id: userExist._id,
      role: userExist.role,
    };
  
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
  
    if (checkPass) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
  
      userExist.token = token;
      userExist.password = undefined;
  
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        userExist,
        message: "user logged in successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "passward invalid" });
    }

  } catch (error) {
    res.status(500).json({ message:"Internal server error"});
  }
  
};
