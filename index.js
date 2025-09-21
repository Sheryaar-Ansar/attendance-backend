const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

const authRoutes = require('./routes/authRoute')
const studentRoutes = require('./routes/studentRoute')

const { connectDB } = require('./config/db')

connectDB()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/student', studentRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`server running on ${PORT}`);
})