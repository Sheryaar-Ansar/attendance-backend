const mongoose = require('mongoose')
const dotenv  = require('dotenv')
dotenv.config()

exports.connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log(`[DB] connected`))
    .catch(err=>console.error(err))
}