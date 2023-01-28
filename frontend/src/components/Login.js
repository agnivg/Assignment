import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    axios({
      url: "/signin",
      method: "POST",
      data: { email: email, password:password },
    })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('jwt',res.data.token)
          localStorage.setItem('user',JSON.stringify(res.data.user))
          setEmail("");
          setPassword("")
          navigate("/");
        }else{
            console.log(res.data.message) 
        }
      })
      .catch((e) => {
        console.log("Internal Server error");
      });
  };
  return (
    <>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            Login
          </button>
        </form>
        <br/><h7><Link to="/register">Don't have an account(Signup)</Link></h7>
    </>
  );
};

export default Login;