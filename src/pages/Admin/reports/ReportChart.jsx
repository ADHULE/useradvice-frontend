import React from "react";
import { motion } from "framer-motion";
import { BarChart3, LineChart, PieChart } from "lucide-react";

const ReportChart = ({ data = [], type = "bar", title = "Vue d'ensemble" }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const getIcon = () => {
    switch (type) {
      case "bar":
        return <BarChart3 size={18} />;
      case "line":
        return <LineChart size={18} />;
      case "pie":
        return <PieChart size={18} />;
      default:
        return <BarChart3 size={18} />;
    }
  };

  return (
    <div className="reports-chart">
      <div className="reports-chart__header">
        <h4 className="reports-chart__title">
          {getIcon()}
          {title}
        </h4>
      </div>
      <div className="reports-chart__content">
        {type === "bar" && (
          <div className="reports-chart__bars">
            {data.map((item, index) => (
              <div key={index} className="reports-chart__bar-group">
                <div className="reports-chart__bar-label">{item.label}</div>
                <motion.div
                  className="reports-chart__bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                  style={{ backgroundColor: item.color }}
                />
                <div className="reports-chart__bar-value">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {type === "line" && (
          <div className="reports-chart__line-container">
            <div className="reports-chart__line-grid">
              {[0, 25, 50, 75, 100].map((percent, i) => (
                <div key={i} className="reports-chart__grid-line">
                  <span>{percent}%</span>
                </div>
              ))}
            </div>
            <svg className="reports-chart__line" viewBox="0 0 100 100">
              <path
                d={`M0,${100 - data[0]?.value || 0} ${data
                  .map(
                    (d, i) =>
                      `L${(i / (data.length - 1)) * 100},${100 - d.value}`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#4361ee"
                strokeWidth="3"
              />
            </svg>
          </div>
        )}

        {type === "pie" && (
          <div className="reports-chart__pie">
            {data.map((slice, index) => (
              <div
                key={index}
                className="reports-chart__pie-slice"
                style={{
                  backgroundColor: slice.color,
                  transform: `rotate(${(index * 360) / data.length}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      {type !== "pie" && (
        <div className="reports-chart__legend">
          {data.map((item, index) => (
            <div key={index} className="reports-chart__legend-item">
              <div
                className="reports-chart__legend-color"
                style={{ backgroundColor: item.color }}
              />
              <span className="reports-chart__legend-label">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportChart;
