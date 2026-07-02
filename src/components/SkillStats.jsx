function SkillStats({ strengths = [], missingSkills = [] }) {
  const matched = strengths.length;
  const missing = missingSkills.length;
  const total = matched + missing;

  const percentage =
    total === 0 ? 0 : Math.round((matched / total) * 100);

  return (
    <div className="stats-card">

      <h2>📊 Skill Match Overview</h2>

      <div className="stats-grid">

        <div className="stat success">
          <h3>{matched}</h3>
          <p>Matched Skills</p>
        </div>

        <div className="stat danger">
          <h3>{missing}</h3>
          <p>Missing Skills</p>
        </div>

      </div>

      <h4>Overall Skill Match</h4>

      <div className="progress">

        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

      <p>{percentage}% Match</p>

    </div>
  );
}

export default SkillStats;
