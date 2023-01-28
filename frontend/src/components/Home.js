import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home=()=>{
    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (!localStorage.getItem("user")) {
          navigate("/login");
        }
      }, []);
    useEffect(()=>{
        axios({
            url:`/posts?page=${page}`,
            method:'GET',
            headers:{'auth':"Bearer "+localStorage.getItem('jwt')}
        }).then(res=>{
            setPosts(res.data.posts)
        })
    },[])
    const [posts,setPosts]=useState([])
    const [page,setPage]=useState(1)
    const submit=(e)=>{
        e.preventDefault()        
        axios({
            url:`/posts?page=${page}`,
            method:'GET',
            headers:{'auth':"Bearer "+localStorage.getItem('jwt')}
        }).then((res)=>{
            setPosts(res.data.posts)
        }).catch((e)=>{
            console.log("Internal Server error");
        });
    }

    const updatePassword=()=>{
        navigate("/updatePass")
    }

    const updatePost=(id)=>{
        navigate("/update",{ state: { id:id } })
    }

    const deletePost=(id)=>{
        axios({
            url:`/deletepost/${id}`,
            method:'DELETE',
            headers:{'auth':"Bearer "+localStorage.getItem('jwt')},
            data: {postId:id}
        }).then((res)=>{
            if(res.data.success){
                console.log(res.data.message)
                const newPosts=posts.filter(post=>{
                    if(post._id!==id)
                        return post
                })
                setPosts(newPosts)
            }
            else
            console.log(res.data.message)          
        }).catch((e)=>{
            console.log(e)
            console.log("Internal Server error");
        })
    }
    return(
        <>
            <h2>Profile</h2>
            <div>
                <h3>{user.name}</h3>
                <button onClick={()=>updatePassword()}>Update Password</button>
                <button onClick={()=>navigate("/create")}>Create Post</button>
                <button onClick={()=>{
                    localStorage.clear()
                    navigate('/login')
                }}>Logout</button>
            </div>
            <div>
                <h2>All Posts</h2>
                <form onSubmit={submit}> 
                    <input type="text" placeholder='Page No' value={page} onChange={(e)=>setPage(e.target.value)} required />
                    <button type='submit'>Submit</button>
                </form>
                {
                    posts &&
                    posts.map((post,i)=>{
                    return(
                        <div key={post._id} style={{backgroundColor:"thistle", marginBottom:"5px"}}>
                            <h5>{post.postedBy.name}{post.postedBy._id==user._id && <button onClick={()=>deletePost(post._id)}>Delete</button>}{post.postedBy._id==user._id && <button onClick={()=>updatePost(post._id)}>Update</button>}</h5>
                            <h6>{post.postedBy.username}</h6>                        
                            <div>
                                <h6>{post.title}</h6>
                                <p>{post.body}</p>                                                          
                            </div>
                        </div>
                    )
                })
                }                       
            </div>
        </>
    )
}

export default Home