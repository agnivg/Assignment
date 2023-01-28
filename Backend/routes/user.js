const express=require('express')
const bcrypt = require('bcryptjs')
const router=express.Router()
const mongoose=require('mongoose')
const verifyLogin=require('../middleware/verifylogin')
const User=mongoose.model("User")

router.put('/updatepassword',verifyLogin,(req,res)=>{
    bcrypt.hash(req.body.password,12).then(hashedpassw=>{
        User.findByIdAndUpdate({_id:req.user._id},{
            password:hashedpassw
        },{new:true}).then(user=>{
            if(user)
                return res.json({success:true,message:'Password updated',user:user})
            else
                return res.json({success:false,message:'Error in updating password'})
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})


module.exports=router