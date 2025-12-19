import React from "react";
import { motion } from "framer-motion";

const TrafficSource = ({ name, percentage, value, color }) => {
  return (
    <div className="analytics-traffic-source">
      <div className="analytics-traffic-source__info">
        <div
          className="analytics-traffic-source__dot"
          style={{ backgroundColor: color }}
        />
        <div className="analytics-traffic-source__details">
          <span className="analytics-traffic-source__name">{name}</span>
          <span className="analytics-traffic-source__percentage">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="analytics-traffic-source__value">{value}</div>
      <div className="analytics-traffic-source__bar">
        <motion.div
          className="analytics-traffic-source__progress"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default TrafficSource;
