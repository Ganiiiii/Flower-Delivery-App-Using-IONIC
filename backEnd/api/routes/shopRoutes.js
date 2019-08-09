const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('Secret');
const User = require('../models/userModel');
const Shop = require('../models/shopModel');

async function getUser(userName)
{
    
    let result = await Shop.findOne({userName:userName})
    .then((result)=>{
        console.log(result);
        return result;
    })
    .catch((error)=>{return 0})
    return result;
}

router.get('/',(req,res,next)=>
{
    Shop.find()
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{res.status(400).json({error:error})})
});


router.get('/:sId',(req,res,next)=>
{
    let sId = req.params.sId;
    Shop.findOne({_id:sId})
    .populate('orders')
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{res.status(400).json(error);})

});



router.post('/register',async (req,res,next)=>  
{
    var password= cryptr.encrypt(req.body.password);
    let shop = new Shop({
        _id: mongoose.Types.ObjectId(),
        sName:req.body.sName,
        oName:req.body.oName,
        contact:req.body.contact,
        address:req.body.address,
        userName:req.body.userName,
        password:password
    })
    await shop.save()
    .then((result)=>{res.status(200).json({message:"successfully inserted..!",shop:result})})
    .catch((error)=>{res.status(400).json({error:error})})
});

router.post('/login',async (req,res,next)=>
{
    let shopData = await getUser(req.body.userName);
    if(shopData)
    {
        var password = cryptr.decrypt(shopData.password);
        if(password === req.body.password)
            res.status(200).json({message:'login successfulLY',shop:shopData})
        else
            res.status(400).json({message:'Username or password is incorrect'});
    }
    else
    res.status(400).json({message:'Not found'});
})

module.exports = router;
