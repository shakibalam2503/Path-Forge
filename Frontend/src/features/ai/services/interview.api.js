import axios from "axios";
const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL || "http://localhost:5000",
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

/**
 * @description service to convert resume and job description into pdf and send it to user 
 */
export async function getResumePdf(interviewReportId){


    const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`, 
    {}, 
    {
      responseType: "blob"
    }
  );
  
    // Create a URL for the blob and trigger a download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resume_${interviewReportId}.pdf`);       
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    return response.data
}