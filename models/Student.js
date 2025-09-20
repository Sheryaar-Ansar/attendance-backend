const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    rollNo: {type:Number, required:true, unique: true},
    day: {type:String, required:true},
    status: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
},{ timestamps:true })

module.exports = mongoose.model('Student', studentSchema)