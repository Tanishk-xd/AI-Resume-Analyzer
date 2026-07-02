import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ScoreCard({ score }) {

  let message = "";
  let color = "#22c55e";

  if (score >= 85) {
    message = "Excellent Match 🎉";
    color = "#22c55e";
  } else if (score >= 70) {
    message = "Good Match 👍";
    color = "#3b82f6";
  } else if (score >= 50) {
    message = "Average Match 🙂";
    color = "#f59e0b";
  } else {
    message = "Needs Improvement ⚠";
    color = "#ef4444";
  }

  return (
    <div className="score-card">

      <h2>ATS Score</h2>

      <div className="circle-wrapper">

        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#111827",
            pathColor: color,
            trailColor: "#e5e7eb",
            textSize: "18px",
          })}
        />

      </div>

      <h3>{message}</h3>

    </div>
  );
}

export default ScoreCard;