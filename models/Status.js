const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    status: {type:String, enum: ['absent', 'present'], default: 'absent'}
})

module.exports = mongoose.model('Status', statusSchema)