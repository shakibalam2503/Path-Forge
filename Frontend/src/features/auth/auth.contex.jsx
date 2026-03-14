import { createContext, useState } from "react";



export const  AuthContex=createContext()


export function AuthProvider({children}){
   const [user,setUser]= useState(null)
   const [loading,setLoading]=useState(true)

    

   return(
    <AuthContex.Provider value={{user,setUser,loading,setLoading}}>
        {children}
    </AuthContex.Provider>
   )

}