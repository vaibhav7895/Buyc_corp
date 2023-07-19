const express=require('express');
const oemRouter=express.Router();
const {OEM_Specs}=require('../Models/oem.model');
const {auth}=require('../Middleware/auth.middleware');
oemRouter.use(auth);
oemRouter.post('/add',async(req,res)=>{
    const {model,year,price,colors,milege,power,maxspeed,userID}=req.body;
    try{
        const oem=new OEM_Specs({model,year,price,colors,milege,power,maxspeed,userID:req.body.userID});
        await oem.save();
        res.status(200).send({msg:oem});
    }catch(err){
        res.status(400).send({error:err.message});
    }
    
})

oemRouter.get('/all',async(req,res)=>{
    const userID=req.body.userID;
    
    try {
        const oem = await OEM_Specs.find({userID});
        res.status(200).send({oem});
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
})

oemRouter.patch("/:id",async(req,res)=>{
    const oemid=req.params.id;
    const userIdinUserID=req.body.userID;
    try{
        const oem=await OEM_Specs.findOne({_id:oemid});
        const userIDoem=oem.userID
        if(userIdinUserID===userIDoem){
            console.log(userIdinUserID,userIDoem)
            await OEM_Specs.findByIdAndUpdate({_id:oemid},req.body);
            res.status(200).send({msg:oem});
        }
    }catch(err){
        res.status(400).send({error:err.message});
    }
})

oemRouter.delete('/:id',async(req,res)=>{
    const oemid=req.params.id;
    const userIdinUserID=req.body.userID;
    try{
        const oem=await OEM_Specs.findOne({_id:oemid});
        const userIDoem=oem.userID
        if(userIdinUserID===userIDoem){
            console.log(userIdinUserID,userIDoem)
            await OEM_Specs.findByIdAndDelete({_id:oemid},req.body);
            res.status(200).send({msg:oem});
        }
    }catch(err){
        res.status(400).send({error:err.message});
    }
})


module.exports={oemRouter};