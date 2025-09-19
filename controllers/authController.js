const User = require("../models/User");
const jwt = require('jsonwebtoken')

const generateToken = async (id, role) => {
    return await jwt.sign({id: id, role}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

exports.register = async(req,res) => {
    const { name } = req.body;
    const existingStudent = await User.find({ name })
    if(existingStudent) return res.status(400).json({error: "Student already registered!"})
    await User.create(req.body)
    res.status(201).json({message: "Student registered successfully"})
}

exports.login = async (req,res) => {
    const { name, role, password } = req.body;
    const existingStudent = await User.find({ name }).select('-password')
    if(!existingStudent) return res.status(404).json({error: "Invalid credentials"})
    const token = await generateToken(existingStudent._id, existingStudent.role)
    const isMatch = await existingStudent.comparePassword(password)
    if(!isMatch) return res.status(400).json({error: "Invalid credentails"})
    res.json({token, existingStudent})
}

