const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../models/orders'); 
const User = require('../models/userModel');
const Shop = require('../models/shopModel');

const userProfile='';
//userSide get orders
router.get('/:id',(req,res,next)=>
{
    const id = req.params.id;
    User.find({_id:id})
    .populate("orders")
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{res.status(400).json({error:error})})
});

//adminSide get orders
router.get('/:id',(req,res,next)=>
{ 
    const id = req.params.id;
    Shop.find({_id:id})
    .populate("orders")
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{res.status(400).json({error:error})})
});

router.post('/:id',async (req,res,next)=>  
{
    const id = req.params.id;
    let order = new Orders({
        _id: mongoose.Types.ObjectId(),
        userId:req.body.userId,
        flName:req.body.flName,
        flImg:req.body.flImg,
        senderName:req.body.senderName,
        reName:req.body.reName,
        address:req.body.address,
        contact:req.body.contact,
        date:req.body.date,
        time:req.body.time, 
        message:req.body.message,
        sId: req.body.sId
    })
     await order.save()
    .then(async(result1)=>{
        await User.findByIdAndUpdate({_id:id},{$push:{orders:(result1._id)}})
        .then(async(result2)=>{
            await Shop.findByIdAndUpdate({_id:result1.sId},{$push:{orders:(result1._id)}})
            .then((result3)=>{
                res.status(200).json({message:"Order successfully placed..!"})})
            })
            .catch((err)=>console.log(err))
        .catch((err)=>console.log(err))
    })
    .catch((error)=>{res.status(400).json({error:error})})
});
 
router.patch('/',(req,res,next)=>
{
    console.log(req.body);
    let updateOps = {};
    updateOps['_id']=req.body.id;
    updateOps['userId']=req.body.userId;
    updateOps['flName']=req.body.flName;
    updateOps['flImg']=req.body.flImg;
    updateOps['senderName']=req.body.senderName;
    updateOps['reName']=req.body.reName;    
    updateOps['address']=req.body.address;
    updateOps['contact']=req.body.contact;
    updateOps['date']=req.body.date;
    updateOps['time']=req.body.time;
    updateOps['message']=req.body.message;

    console.log("updateOps:",updateOps);

    Orders.findOneAndUpdate({ _id : req.body.id},{$set:updateOps})
    .exec()
    .then(result=>
     {
         if(result)
         {
             res.status(200).json({
             Message:'Order is updated Successfully',order:result
             });
         }
         else
         {
             res.status(500).json({error:err});
        }
     })
     .catch(err=>{
           res.status(200).json({error:err});
     });
});


router.delete('/:_id',async(req,res,next)=>
{
    const id = req.params._id;
    let orderId = id.split(' ')[0];
    let userId = id.split(' ')[1];
    console.log('orderid:'+orderId);
    console.log('userID:'+userId);
    await Orders.findOneAndDelete({_id:orderId})
    .exec()
    .then(async(result1)=>{ 
        console.log('in result:',result1._id);
        await User.findByIdAndUpdate({_id:userId},{$pull:{orders:(result1._id)}})
        .then(async(result2)=>{
            await Shop.findByIdAndUpdate({_id:result1.sId},{$pull:{orders:(result1._id)}})
            .then((result3)=>{
                res.status(200).json({message:"Order successfully Deleted..!"})})
            })
        .catch((err)=>{res.status(401).json({error:err})})
    });
})


module.exports = router;