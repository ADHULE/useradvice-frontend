import React, { useState } from "react";

const TimeRangeSelector = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState("week");

  const ranges = [
    { id: "day", label: "24H" },
    { id: "week", label: "7J" },
    { id: "month", label: "30J" },
    { id: "quarter", label: "3M" },
    { id: "year", label: "1A" },
  ];

  const handleSelect = (rangeId) => {
    setSelectedRange(rangeId);
    if (onChange) onChange(rangeId);
  };

  return (
    <div className="analytics-time-range">
      <div className="analytics-time-range__selector">
        {ranges.map((range) => (
          <button
            key={range.id}
            className={`analytics-time-range__button ${
              selectedRange === range.id
                ? "analytics-time-range__button--active"
                : ""
            }`}
            onClick={() => handleSelect(range.id)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;
