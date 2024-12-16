const express = require("express")
const app = express()

const cookieParser = require("cookie-parser")
app.use(cookieParser)

require("dotenv").config()

const database = require('./config/db')
database()

app.use(express.json())


const user = require("./routes/user")
app.use("/api/v1",user)

app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVER IS RUNNING ${process.env.PORT}`)
})
