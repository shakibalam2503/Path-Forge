import React, { useState } from "react";
import "../auth.form.scss"
import { Link ,useNavigate} from "react-router";
import { useAuth } from "../hooks/useAuth";


function Register(){
    const {loading,handleRegister}=useAuth()
    const navigate=useNavigate()
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    async function handleSubmit(e){
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }
    if(loading){
        return(
            <main>
                <h1>loading......</h1>
            </main>
        )
    }
    return(
        <>
        <main>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h1 className="welcome-text">Create account</h1>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"id="username" name="username" placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}}></input>


                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email adress" onChange={(e)=>setEmail(e.target.value)}></input>



                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                        
                        <button className="button primary-btn">Register</button>
                    </div>
                </form>
                <p>Alredy have an account?<Link to={"/login"}>Log in</Link></p>


            </div>


        </main>
        </>
    )

}
export default Register