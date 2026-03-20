import { useContext, useEffect } from "react";
import { InterviewContex } from "../interview.contex";
import { getInterviewReport, getInterviewReportById, getAllInterviewReports } from "../services/interview.api";
import { useParams } from "react-router"; // ✅ FIXED

export function useInterview() {
    const contex = useContext(InterviewContex);
    const { interviewId } = useParams();

    if (!contex) {
        throw new Error("useInterview must be used inside InterviewProvider");
    }

    const { loading, report, setLoading, setReport, reports, setReports } = contex;

    async function getReport({ selfDescription, resume, jobDescription }) {
        setLoading(true);
        let response = null;

        try {
            response = await getInterviewReport({ selfDescription, resume, jobDescription });
            setReport(response.interViewReport);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

        return response?.interViewReport; // ✅ safe
    }

    async function getReportById(interviewReportId) {
        setLoading(true);
        let response = null;

        try {
            response = await getInterviewReportById(interviewReportId);
            setReport(response.report);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

        return response?.report; // ✅ safe
    }

    async function getAllReports() {
        setLoading(true);
        let response = null;

        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

        return response?.interviewReports; // ✅ safe
    }

    useEffect(() => {
        console.log("PARAM ID:", interviewId); // 🔥 debug

        if (interviewId) {
            getReportById(interviewId);
        } else {
            getAllReports();
        }
    }, [interviewId]);

    return { loading, report, reports, getReport, getReportById, getAllReports };
}