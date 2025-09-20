const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role: {type:String, enum: ['admin', 'student'], default:'student'},
    status: {type:mongoose.Schema.Types.ObjectId, ref: 'Status'}
}, { timestamps:true })

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(candidatePw){
    return await bcrypt.compare(candidatePw, this.password)
}

module.exports = mongoose.model('User', userSchema)



