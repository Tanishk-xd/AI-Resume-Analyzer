import { jsPDF } from "jspdf";

function downloadPDF(analysis, score) {

  const doc = new jsPDF();

  let y = 20;

  // =========================
  // Title
  // =========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AI Resume Analysis Report", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    y
  );

  y += 15;

  // =========================
  // ATS Score
  // =========================

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  doc.text(`ATS Score : ${score}%`, 20, y);

  y += 15;

  // =========================
  // Resume Summary
  // =========================

  doc.setFontSize(15);

  doc.text("Resume Summary", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const summary = doc.splitTextToSize(
    analysis.summary || "No Summary Available",
    170
  );

  doc.text(summary, 20, y);

  y += summary.length * 6 + 10;

  // =========================
  // Helper Function
  // =========================

  const addSection = (title, items) => {

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);

    doc.text(title, 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    if (items && items.length > 0) {

      items.forEach(item => {

        doc.text(`• ${item}`, 25, y);

        y += 7;

      });

    } else {

      doc.text("None", 25, y);

      y += 7;

    }

    y += 5;

  };

  // =========================

  addSection("Strengths", analysis.strengths);

  addSection("Missing Skills", analysis.missingSkills);

  addSection("Weaknesses", analysis.weaknesses);

  addSection("Suggestions", analysis.suggestions);

  // =========================
  // Final Verdict
  // =========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.text("Final Verdict", 20, y);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const verdict = doc.splitTextToSize(
    analysis.finalVerdict || "",
    170
  );

  doc.text(verdict, 20, y);

  y += verdict.length * 6 + 15;

  // =========================
  // Footer
  // =========================

  doc.setFontSize(10);

  doc.setTextColor(120);

  doc.text(
    "Generated using AI Resume Analyzer",
    20,
    285
  );

  doc.save("AI_Resume_Report.pdf");

}

export default downloadPDF;