const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fName:{type:String,required:true},
    contact:{type:String,required:true},
    userName:{type:String,required:true},
    password:{type:String,required:true},
    orders:[{type:mongoose.Schema.Types.ObjectId,ref:"Orders"}]
})

module.exports = mongoose.model('AppUsers',userSchema);