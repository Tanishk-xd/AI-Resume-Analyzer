import "./App.css";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import JobDescription from "./components/JobDescription";
import AnalyzeButton from "./components/AnalyzeButton";
import AnalysisResult from "./components/AnalysisResult";
import LoadingSpinner from "./components/LoadingSpinner";
import Footer from "./components/Footer";

function App() {
  // States
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const resetAnalysis = () => {
  setResume(null);
  setJobDescription("");
  setAnalysis(null);
};

  return (
    <>
      <Navbar />

      <Hero />

      <UploadBox
        resume={resume}
        setResume={setResume}
      />

      <JobDescription
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />

      <AnalyzeButton
        resume={resume}
        jobDescription={jobDescription}
        setAnalysis={setAnalysis}
        loading={loading}
        setLoading={setLoading}
      />

      {/* Show Spinner while AI is working */}
      {loading && <LoadingSpinner />}

      {/* Show Analysis after AI finishes */}
      {!loading && analysis && (
        <AnalysisResult analysis={analysis} />
      )}

      <Footer />
    </>
  );
}

export default App;