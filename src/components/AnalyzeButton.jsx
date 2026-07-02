import { toast } from "react-toastify";

function AnalyzeButton({
  resume,
  jobDescription,
  setAnalysis,
  loading,
  setLoading,
}) {

  const handleAnalyze = async () => {

    // Validate Resume
    if (!resume) {
      toast.warning("Please upload your resume.");
      return;
    }

    // Validate Job Description
    if (!jobDescription.trim()) {
      toast.warning("Please enter a Job Description.");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
        "http://localhost:5000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Full Response:", data);
      console.log("Analysis Object:", data.analysis);

      if (data.success) {

        setAnalysis(data.analysis);

        toast.success("Resume analyzed successfully! 🎉");

      } else {

        toast.error(data.message || "Analysis failed.");

      }

    } catch (error) {

      console.error("Error:", error);

      toast.error("Unable to connect to the server.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <button
      className="analyze-btn"
      onClick={handleAnalyze}
      disabled={loading}
    >

      {loading ? "Analyzing..." : "Analyze Resume"}

    </button>

  );

}

export default AnalyzeButton;