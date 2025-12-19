import React from "react";
import { motion } from "framer-motion";
import { Filter, Download, MoreVertical } from "lucide-react";

const ChartPlaceholder = ({ title, type = "bar", data = [] }) => {
  return (
    <motion.div
      className="dashboard-chart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="chart__header">
        <h3 className="chart__title">{title}</h3>
        <div className="chart__actions">
          <button className="chart__action-btn">
            <Filter size={16} />
          </button>
          <button className="chart__action-btn">
            <Download size={16} />
          </button>
          <button className="chart__action-btn">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="chart__content">
        <div className="chart__visualization">
          {type === "bar" && (
            <div className="chart__bars">
              {[65, 80, 45, 90, 75, 85, 60].map((height, i) => (
                <motion.div
                  key={i}
                  className="chart__bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                />
              ))}
            </div>
          )}

          {type === "pie" && (
            <div className="chart__pie">
              <div className="pie__slice" style={{ "--percentage": 40 }}></div>
              <div className="pie__slice" style={{ "--percentage": 30 }}></div>
              <div className="pie__slice" style={{ "--percentage": 20 }}></div>
              <div className="pie__slice" style={{ "--percentage": 10 }}></div>
              <div className="pie__center"></div>
            </div>
          )}
        </div>

        <div className="chart__legend">
          {data.map((item, i) => (
            <div key={i} className="legend__item">
              <div
                className="legend__color"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend__label">{item.label}</span>
              <span className="legend__value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChartPlaceholder;
