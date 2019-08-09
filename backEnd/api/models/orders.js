const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type:String,required:true},
    flName:{type:String,required:true},
    flImg:{type:String,required:true},
    senderName:{type:String,required:true},
    reName:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    message:{type:String,required:true},
    sId:{type:String,required:true}
})
module.exports = mongoose.model('Orders',ordersSchema);