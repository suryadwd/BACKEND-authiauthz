const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async(req,res,next) => {

  const token = req.body.token 

    if(!token) return res.status(401).json({success:false,message:"token missing"})

  try {
    
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    //decode is the payload now and usko req ye help krta h pure lifecycle tak use krne ko and uske age user ye koi bhi name ho sakta h
    req.user = decode
    next()
  } catch (error) {
    res.status(500).json({ message:"Internal server error"});
  }

}

exports.isStudent = (req,res,next) => {

  try {
    
    if(req.user.role != "Student") return res.status(401).json({success:false,message:"this is protected route for student only"})
      next()
  } catch (error) {
    res.status(500).json({ message:"Internal server error"});
  }

}

exports.isAdmin = (req,res,next) => {

  try {
    
    if(req.user.role != "Admin") return res.status(401).json({success:false,message:"this is protected route for Admin only"})
      next()
  } catch (error) {
    res.status(500).json({ message:"Internal server error"});
  }

}

