import {createBrowserRouter} from "react-router"
import LogIn from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Home from "./features/ai/pages/Home"
import Protected from "./features/auth/components/Protected"
import Interview from "./features/ai/pages/interview"



export const router=createBrowserRouter([
    {
        path:"/login",
        element:<LogIn/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    }
    
])