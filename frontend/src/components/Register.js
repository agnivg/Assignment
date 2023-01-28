import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register=()=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    useEffect(()=>{
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    },[])
    
    const submit=(e)=>{
        e.preventDefault()        
        const d={
            name:name,
            email:email,
            password:password
        }
        axios({
            url:'/signup',
            method:'POST',
            data: d
        }).then((res)=>{
            setEmail("");
            setName("");
            setPassword("");
            if(res.data.success) {
                navigate('/login')
                console.log("Data submitted");
            }else
                console.log(res.data.message)       
        }).catch((e)=>{
            console.log("Internal Server error");
        });
    }
    return(
        <>
            <h2>Register</h2>
            <form onSubmit={submit}> 
                <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required />
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button type='submit'>Submit</button>
            </form>
            <br/><h7><Link to="/login">Already have an account(Login)</Link></h7>
        </>
    )
}

export default Register