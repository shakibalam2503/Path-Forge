import { createContext, useState } from "react";
export const InterviewContex = createContext()
export  function InterviewProvider({children}){

    const [loading,setLoading]=useState(false)
    const [report,setReport]=useState(null)
    const [reports,setReports]=useState([])
    return(
        <InterviewContex.Provider value={{loading,report,setLoading,setReport,reports,setReports}}>
            {children}
        </InterviewContex.Provider>
    )


}