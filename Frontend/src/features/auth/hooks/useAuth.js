import { useContext ,useEffect} from "react";
import { AuthContex } from "../auth.contex";
import { register,login,logout,getMe } from "../services/auth.api";

export function useAuth(){

   const contex= useContext(AuthContex)
   const {user,setUser,loading,setLoading}=contex

     async function handleLogin({email,password}){
        setLoading(true)
        try{
        const data= await login({email,password})
        setUser(data.user)
        setLoading(false)
        }
        catch(err){
            console.log("failed to fetch api")
        }

    } 
    async function handleRegister({username,email,password}) {
        setLoading(true)
        const data=await register({username,email,password})
        setUser(data.user)
        setLoading(false)
        
    }
    async function handleLogout(){
        setLoading(true)
        try{

            const data=await logout()
        }
        catch(err){
            console.log("Error occured to fetch data")
        }
        setUser(null)
        setLoading(false)

    }
    useEffect(()=>{
   async function getSetUser(){
       try{
           const data = await getMe()
           setUser(data.user)
       }
       catch(err){
           setUser(null)   // user not logged in
       }
       finally{
        setLoading(false)
       }
   }

   getSetUser()
},[])
    
    return {user,loading,handleLogin,handleRegister,handleLogout}

}