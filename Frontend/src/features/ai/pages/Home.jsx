import React, { useRef, useState } from "react";
import "../styles/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

function Home() {

  const {loading,getReport,reports}=useInterview()
  const [selfDescription,setSelfDescription]=useState("")
  const [jobDescription,setJobDescription]=useState("")
  const resumeInputRef=useRef()
  const navigate=useNavigate()
  async function handleReport(){
    const resume=resumeInputRef.current.files[0]
    const data =await getReport({selfDescription,jobDescription,resume})
    navigate(`/interview/${data._id}`)
  }
  if(loading){
    return(
        <main>
            <div className="loader"></div>
            <h1>Loading.....</h1>
            </main>
        )
  }



  return (
    <main className="home-container">
      <div className="home-header">
        <h1>Create Your Custom <span>Interview Plan</span></h1>
        <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
      </div>

      <div className="interview-card">
        <div className="card-content">
          {/* Left Column */}
          <div className="left-column">
            <div className="section-header">
              <div className="header-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <h2>Target Job Description</h2>
              </div>
              <span className="badge required">REQUIRED</span>
            </div>
            <div className="textarea-wrapper">
              <textarea
                name="jobDescription" onChange={(e)=>{setJobDescription(e.target.value)}}
                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              ></textarea>
              <div className="char-count">0 / 5000 chars</div>
            </div>
          </div>

          <div className="vertical-divider"></div>

          {/* Right Column */}
          <div className="right-column">
            <div className="section-header">
              <div className="header-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <h2>Your Profile</h2>
              </div>
            </div>

            <div className="upload-section">
              <div className="upload-header">
                <h3>Upload Resume</h3>
                <span className="badge best-results">BEST RESULTS</span>
              </div>
              <label className="drag-drop-area" htmlFor="resume-upload">
                <input ref={resumeInputRef} type="file" id="resume-upload" hidden accept=".pdf,.docx" />
                <div className="upload-content">
                  <svg className="upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <p className="primary-text">Click to upload or drag &amp; drop</p>
                  <p className="secondary-text">PDF or DOCX (Max 4MB)</p>
                </div>
              </label>
            </div>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div className="self-desc-section">
              <h3>Quick Self-Description</h3>
              <div className="textarea-wrapper">
                <textarea
                  name="selfDescription"
                  onChange={(e)=>{setSelfDescription(e.target.value)}}
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                ></textarea>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <span className="footer-info">AI-Powered Strategy Generation • Approx 30s</span>
          <button onClick={handleReport} className="generate-btn">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
             Generate My Interview Strategy
          </button>
        </div>
      </div>

      {reports && reports.length > 0 && (
        <div className="recent-reports-section">
          <div className="section-header">
            <h2>Recent Reports</h2>
          </div>
          <div className="reports-grid">
            {reports.map((report) => (
              <div 
                key={report._id} 
                className="report-card" 
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <div className="report-content">
                  <h3 className="report-title">{report.title || 'Technical Interview Strategy'}</h3>
                  <div className="report-meta">
                    <span className="report-date">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                    {report.matchScore && (
                      <span className="report-score">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        {report.matchScore}% Match
                      </span>
                    )}
                  </div>
                </div>
                <div className="report-action">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
