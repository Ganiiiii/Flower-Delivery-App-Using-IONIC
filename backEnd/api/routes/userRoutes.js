const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('Secret');
const User = require('../models/userModel');

async function getUser(userName)
{
    
    let result = await User.findOne({userName:userName})
    .then((result)=>{
        console.log(result);
        return result;

    })
    .catch((error)=>{return 0})
    return result;
}

router.get('/',(req,res,next)=>
{
    User.find()
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{res.status(400).json({error:error})})
});


router.get('/:userName',(req,res,next)=>
{
    let userName = req.params.userName;
    User.findOne({userName:userName})
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{res.status(400).json(error);})

});



router.post('/register',async (req,res,next)=>  
{
    var password= cryptr.encrypt(req.body.password);
    let user = new User({
        _id: mongoose.Types.ObjectId(),
        fName:req.body.fName,
        contact:req.body.contact,
        userName:req.body.userName,
        password:password
    })
    await user.save()
    .then((result)=>{res.status(200).json({message:"successfully inserted..!",user:result})})
    .catch((error)=>{res.status(400).json({error:error})})
});

router.post('/login',async (req,res,next)=>
{
    let userData = await getUser(req.body.userName);
    if(userData)
    {
        var password = cryptr.decrypt(userData.password);
        if(password === req.body.password)
            res.status(200).json({message:'Login successfulLY'})
        else
            res.status(400).json({message:'Username or password is incorrect'});
    }
    else
    res.status(400).json({message:'Not found'});

})

module.exports = router;