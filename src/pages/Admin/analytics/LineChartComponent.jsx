import React from "react";
import { motion } from "framer-motion";

const LineChartComponent = ({ data = [], color = "#4361ee" }) => {
  return (
    <div className="analytics-line-chart">
      <div className="analytics-line-chart__canvas">
        {data.map((point, i) => (
          <motion.div
            key={i}
            className="analytics-line-chart__point"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            style={{
              left: `${(i / (data.length - 1)) * 100}%`,
              bottom: `${point}%`,
              backgroundColor: color,
            }}
          />
        ))}
        <svg className="analytics-line-chart__line" viewBox="0 0 100 100">
          <path
            d={`M0,${100 - data[0]} ${data
              .map(
                (point, i) => `L${(i / (data.length - 1)) * 100},${100 - point}`
              )
              .join(" ")}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default LineChartComponent;
