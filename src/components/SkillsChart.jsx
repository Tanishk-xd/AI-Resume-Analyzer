import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SkillsChart({
  strengths = [],
  missingSkills = [],
}) {

  const data = {
    labels: [
      "Matched Skills",
      "Missing Skills",
    ],
    datasets: [
      {
        data: [
          strengths.length,
          missingSkills.length,
        ],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (

    <div className="chart-card">

      <h3>📊 Skills Distribution</h3>

      <div className="chart-container">

        <Pie
          data={data}
          options={options}
        />

      </div>

    </div>

  );

}

export default SkillsChart;