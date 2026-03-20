import React, { useState } from "react";
import "../auth.form.scss"
import { useNavigate,Link } from "react-router";
import { useAuth } from "../hooks/useAuth";


function LogIn(){
    const navigate=useNavigate()
    const {loading,handleLogin} =useAuth()

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    async function handleSubmit(e){
        e.preventDefault()
        await handleLogin({email,password})
        navigate("/")
    }
    if(loading){
        return(
        <main>
            <div className="loader"></div>
            <h1>Loading.....</h1>
            </main>
        )
    }
    return(
        <>
        <main>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h1 className="welcome-text">Welcome Back</h1>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email adress" onChange={(e)=>{setEmail(e.target.value)}}></input>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                        <button className="button primary-btn">Log In</button>
                    </div>
                </form>
                <p>Not have an account? <Link to={"/register"}>Register</Link></p>


            </div>


        </main>
        </>
    )

}
export default LogIn