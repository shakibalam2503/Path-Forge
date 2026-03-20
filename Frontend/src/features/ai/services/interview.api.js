import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})
/**
 * @description service to generate report based on selfdescription,resume and jobDescription 
 */
export async function getInterviewReport({selfDescription,resume,jobDescription}){
    const formData=new FormData()
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resume)
    formData.append("jobDescription",jobDescription)
    const response =  await api.post("/api/interview/",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response.data

}
/**
 *@descriptionservice service to  get report based on id 
 */
export async function getInterviewReportById(interviewReportId) {
    const response=await api.get(`/api/interview/report/${interviewReportId}`)
    return response.data
}
/**
 * 
 * @description service to get all the previous Results
 */
export async function getAllInterviewReports() {
    const response=await api.get("/api/interview/report/allInterviewReport")
    return response.data        
}