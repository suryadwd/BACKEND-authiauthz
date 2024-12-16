const mongoose = require("mongoose")

require("dotenv").config();

const dbConnect = () => {
 
  mongoose.connect(process.env.MONGO_URL)
       .then(() => console.log("dbConnected"))
        .catch((error) => {
        console.error(error.message)
        process.exit(1)
       });

}

module.exports = dbConnect
