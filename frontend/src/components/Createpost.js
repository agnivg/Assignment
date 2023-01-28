import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Createpost=()=>{
    useEffect(() => {
        if (!localStorage.getItem("user")) {
          navigate("/login");
        }
      }, []);
    const navigate = useNavigate();
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("") 
    const submit=async(e)=>{
        e.preventDefault() 
        const d={
            title:title,
            body:body,
        }
        axios({
            url:'/createpost',
            method:'POST',
            headers:{'auth':"Bearer "+localStorage.getItem('jwt')},
            data: d
        }).then((res)=>{ 
            setTitle(""); 
            setBody(""); 
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
                <input type='text' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                <input type='text' placeholder='Description' value={body} onChange={(e)=>setBody(e.target.value)} required/>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default Createpost