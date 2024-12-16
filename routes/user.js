const express = require("express")
const router = express.Router()

const {login, signup} = require("../controller/auth")

const {auth, isStudent, isAdmin} = require("../middleware/auth")

router.post("/login",login)
router.post("/signup",signup)

//protected routes onlky assing people can assess these links
router.get('/test',auth, (req,res) => {
  res.status(200).json({success:true,message:"wlcomde to test protectewd route"})
} )

router.get("/student",auth,isStudent, (req, res) => {  res.status(200).json({success:true,message:"wlcomde to test protectewd route"})
res.status(200).json({success:true,message:"wlcomde to  protectecd route for student"})
})

router.get("/admin",auth,isAdmin, (req, res) => {  res.status(200).json({success:true,message:"wlcomde to admin protectewd route"})
res.status(200).json({success:true,message:"wlcomde to  protectecd route for admin"})
})


module.exports = router
