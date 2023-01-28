import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const UpdatePassword=()=>{
    useEffect(() => {
        if (!localStorage.getItem("user")) {
          navigate("/login");
        }
      }, []);
    const navigate = useNavigate()
    const [password,setPassword]=useState("") 
    const submit=async(e)=>{
        e.preventDefault() 
        axios({
            url:`/updatepassword`,
            method:'PUT',
            headers:{'auth':"Bearer "+localStorage.getItem('jwt')},
            data: {password:password}
        }).then((res)=>{ 
            setPassword("");  
            if(res.data.success){
                console.log(res.data.message)
                navigate("/")
            }
            else
                console.log(res.data.message)                         
        }).catch((e)=>{
            console.log("Internal Server error");
        })
    }
    return(
        <div>
            <form onSubmit={submit}> 
                <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <button type="submit">Update Password</button>
            </form>
        </div>
    )
}

export default UpdatePassword