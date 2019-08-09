const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    sName: {type:String,required:true},
    oName: {type:String,required:true},
    contact: {type:String,required:true},
    address: {type:String,required:true},
    userName: {type:String,required:true},
    password: {type:String,required:true},
    orders:[{type:mongoose.Schema.Types.ObjectId,ref:"Orders"}]
})
module.exports = mongoose.model('Shops',shopSchema);