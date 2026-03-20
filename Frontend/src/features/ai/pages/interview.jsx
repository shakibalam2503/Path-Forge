import React, { useEffect, useState } from "react";
import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate, useParams } from "react-router";

const Interview = () => {
  const { report, getReportById, loading, setReport ,getpdfResume} = useInterview(undefined);
  const [activeTab, setActiveTab] = useState("technical");
  const { interviewId } = useParams();
  if (loading) {
    return (
      <main>
        <div className="loader"></div>
        <h1>Loading.....</h1>
      </main>
    );
  }

  // still fetching (first render) → show nothing
  if (report === undefined) return null;

  //fetched but no data
  if (report === null) {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>No report found.</h1>
      </main>
    );
  }
  const renderContent = () => {
    switch (activeTab) {
      case "technical":
        return (
          <div className="qa-list">
            <div className="content-header">
              <h2>Technical Questions</h2>
              <p>Practice these core technical concepts for your role.</p>
            </div>
            {report.technicalQuestions.map((q, index) => (
              <div key={index} className="qa-card">
                <div className="q-badge">
                  <span className="q-number">{index + 1}</span>
                  <span className="q-label">Q</span>
                </div>
                <div className="qa-content">
                  <h3>{q.question}</h3>
                  <div className="intention">
                    <strong>Intention:</strong> {q.intention}
                  </div>
                  <div className="answer">
                    <strong>Ideal Answer:</strong> {q.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "behavioral":
        return (
          <div className="qa-list">
            <div className="content-header">
              <h2>Behavioral Questions</h2>
              <p>Prepare your STAR method stories for these scenarios.</p>
            </div>
            {report.behavioralQuestions.map((q, index) => (
              <div key={index} className="qa-card">
                <div className="q-badge">
                  <span className="q-number">{index + 1}</span>
                  <span className="q-label">Q</span>
                </div>
                <div className="qa-content">
                  <h3>{q.question}</h3>
                  <div className="intention">
                    <strong>Intention:</strong> {q.intention}
                  </div>
                  <div className="answer">
                    <strong>Ideal Answer:</strong> {q.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "roadmap":
        return (
          <div className="roadmap-list">
            <div className="content-header">
              <h2>Preparation Road Map</h2>
              <p>Your step-by-step daily guide to interview success.</p>
            </div>
            {report.preparationPlan.map((plan, index) => (
              <div key={index} className="roadmap-day" data-day={plan.day}>
                <div className="day-badge">
                  <span className="day-number">{plan.day}</span>
                  <span className="day-label">Day</span>
                </div>
                <div className="day-content">
                  <div className="focus">{plan.focus}</div>
                  <ul>
                    {plan.tasks.map((task, tIndex) => (
                      <li key={tIndex}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="interview-container">
      <div className="interview-layout">
        <aside className="left-sidebar">
          <div
            className={`nav-item ${activeTab === "technical" ? "active" : ""}`}
            onClick={() => setActiveTab("technical")}
          >
            Technical questions
          </div>
          <div
            className={`nav-item ${activeTab === "behavioral" ? "active" : ""}`}
            onClick={() => setActiveTab("behavioral")}
          >
            Behavioral questions
          </div>
          <div
            className={`nav-item ${activeTab === "roadmap" ? "active" : ""}`}
            onClick={() => setActiveTab("roadmap")}
          >
            Road Map
          </div>
          <button onClick={() => getpdfResume(interviewId)} className="button primary-btn">
            <svg
              width="100%"
              height="1rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 3.33782C19.989 5.06687 22 8.29859 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 8.29859 4.01099 5.06687 7 3.33782M8 12L12 16M12 16L16 12M12 16V2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                
              />
            </svg>
            Download Ai genterated pdf
          </button>
        </aside>

        <main className="main-content">{renderContent()}</main>

        <aside className="right-sidebar">
          <div className="match-score-section">
            <h3 className="section-title">Match Score</h3>
            <div
              className={`score-circle ${report.matchScore >= 70 ? "high" : report.matchScore >= 50 ? "medium" : "low"}`}
            >
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${report.matchScore}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">
                  {report.matchScore}%
                </text>
              </svg>
            </div>
            <p className="score-text">
              Based on your resume and the job description.
            </p>
          </div>

          <h3 className="section-title">Skill Gaps</h3>
          <div className="tags-container">
            {report.skillGaps.map((gap, idx) => {
              const severityClass = gap.severity
                ? `severity-${gap.severity}`
                : "";
              return (
                <span
                  key={idx}
                  className={`skill-tag ${severityClass}`}
                  title={gap.skill}
                >
                  {gap.skill}
                </span>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
