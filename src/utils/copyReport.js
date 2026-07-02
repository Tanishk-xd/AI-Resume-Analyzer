import { toast } from "react-toastify";

async function copyReport(analysis) {
  try {
    const report = `
AI Resume Analysis Report

ATS Score: ${analysis.atsScore}%

Resume Summary:
${analysis.summary}

Strengths:
${analysis.strengths.join("\n• ")}

Missing Skills:
${analysis.missingSkills.join("\n• ")}

Weaknesses:
${analysis.weaknesses.join("\n• ")}

Suggestions:
${analysis.suggestions.join("\n• ")}

Final Verdict:
${analysis.finalVerdict}
`;

    await navigator.clipboard.writeText(report);

    toast.success("Report copied to clipboard! 📋");

  } catch (error) {

    toast.error("Failed to copy report.");

  }
}

export default copyReport;