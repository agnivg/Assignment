const bcrypt = require('bcryptjs')
const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/secrets')

router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser)
            return res.json({success:false,message:"User email already exists"})
        bcrypt.hash(password,12).then(hashedpassw=>{
            const user=new User({
                email:email,
                name:name,
                password:hashedpassw
            })
            user.save().then(u=>{
                return res.json({success:true,message:"Saved Successfully"})
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })      
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser)
            return res.json({success:false,message:"Invalid email or password"})
        bcrypt.compare(password,savedUser.password).then(f=>{
            if(f){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                savedUser.password=null
                return res.json({success:true,message:"SignedIn successfully",token:token,user:savedUser})
            }
            else
                return res.json({success:false,message:"Invalid email or password"})
        }).catch(err=>{
            console.log(err)
        })     
    }).catch(err=>{
        console.log(err)
    })
})

module.exports=router