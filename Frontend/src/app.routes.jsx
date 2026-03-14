import {createBrowserRouter} from "react-router"
import LogIn from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"



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
        element:<Protected><h1>jdhsajhdahja</h1></Protected>
    }
])