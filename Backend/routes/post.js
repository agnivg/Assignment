const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const verifyLogin=require('../middleware/verifylogin')
const Post=mongoose.model("Post")

router.get('/posts',verifyLogin,(req,res)=>{
    const page=req.query.page-1;
    Post.find().skip(page*10).limit(10).populate("postedBy","_id name").then(posts=>{
        return res.json({posts:posts})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/fiftyposts',verifyLogin,(req,res)=>{
    for(var i=1;i<=50;i++){
        const post=new Post({
            title:`Post ${i}`,
            body:`Desc ${i}`,
            postedBy:req.user
        })
        post.save().then(u=>{
            console.log(i)
        }).catch(err=>{
            console.log(err)
        })
    }   
    return res.json({success:true,message:"Posted Successfully"})
})

router.put('/updatepost/:id',verifyLogin,(req,res)=>{
    const {title,body}=req.body;
    Post.findByIdAndUpdate({_id:req.params.id},{
        title:title,
        body:body
    },{new:true}).then(user=>{
        if(user)
            return res.json({success:true,message:'Post updated',user:user})
        else
            return res.json({success:false,message:'Error in updating post'})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',verifyLogin,(req,res)=>{
    const {title,body}=req.body
    req.user.password=undefined     //so that mongodb does not store the user's password
    const post=new Post({
        title:title,
        body:body,
        postedBy:req.user
    })
    post.save().then(u=>{
        return res.json({success:true,message:"Posted Successfully"})
    }).catch(err=>{
        console.log(err)
    })
})

router.delete('/deletepost/:postId',verifyLogin,(req,res)=>{
    Post.findByIdAndDelete({_id:req.params.postId}).exec((err,result)=>{
        if(result)
            return res.json({success:true,message:'Post Deleted Successfully',result:result})
        else
            return res.json({success:false,message:'Unsuccessful'})
    })
})

module.exports=router