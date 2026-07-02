import downloadPDF from "../utils/pdfGenerator";
import ScoreCard from "./ScoreCard";
import SkillStats from "./SkillStats";
import SkillsChart from "./SkillsChart";
import copyReport from "../utils/copyReport";

function AnalysisResult({ analysis, resetAnalysis }) {
  if (!analysis) return null;

  const score = analysis.atsScore || 0;

  return (
    <div className="analysis-box">

      {/* ================= SCORE CARD ================= */}

      <ScoreCard score={score} />

      {/* ================= TITLE ================= */}

      <h2 className="analysis-title">
        🤖 AI Resume Analysis
      </h2>

      {/* ================= ACTION BUTTONS ================= */}

      <div className="action-buttons">

  <button
    className="download-btn"
    onClick={() => downloadPDF(analysis, score)}
  >
    📄 Download Report
  </button>

  <button
    className="copy-btn"
    onClick={() => copyReport(analysis)}
  >
    📋 Copy Report
  </button>

  <button
    className="reset-btn"
    onClick={resetAnalysis}
  >
    🔄 Analyze Again
  </button>

</div>

      {/* ================= DASHBOARD ROW 1 ================= */}

      <div className="dashboard-grid">

        {/* Resume Summary */}

        <div className="summary-card">

          <h3>📄 Resume Summary</h3>

          <p>{analysis.summary}</p>

        </div>

        {/* Skill Statistics */}

        <div>

  <SkillStats
    strengths={analysis.strengths}
    missingSkills={analysis.missingSkills}
  />

  <SkillsChart
    strengths={analysis.strengths}
    missingSkills={analysis.missingSkills}
  />

</div>

      </div>

      {/* ================= DASHBOARD ROW 2 ================= */}

      <div className="dashboard-grid">

        {/* Strengths */}

        <div className="analysis-card">

          <h3>💪 Strengths</h3>

          <div className="chips">

            {analysis.strengths?.map((item, index) => (

              <span
                key={index}
                className="chip success"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

        {/* Missing Skills */}

        <div className="analysis-card">

          <h3>❌ Missing Skills</h3>

          <div className="chips">

            {analysis.missingSkills?.map((item, index) => (

              <span
                key={index}
                className="chip danger"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      </div>

      {/* ================= DASHBOARD ROW 3 ================= */}

      <div className="dashboard-grid">

        {/* Weaknesses */}

        <div className="analysis-card">

          <h3>⚠ Weaknesses</h3>

          <div className="chips">

            {analysis.weaknesses?.map((item, index) => (

              <span
                key={index}
                className="chip warning"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

        {/* Suggestions */}

        <div className="analysis-card">

          <h3>💡 Suggestions</h3>

          <div className="chips">

            {analysis.suggestions?.map((item, index) => (

              <span
                key={index}
                className="chip info"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      </div>

      {/* ================= FINAL VERDICT ================= */}

      <div className="analysis-card verdict-card">

        <h3>🏆 Final Verdict</h3>

        <p>{analysis.finalVerdict}</p>

      </div>

    </div>
  );
}

export default AnalysisResult;