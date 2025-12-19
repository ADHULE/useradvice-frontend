import React from "react";
import { motion } from "framer-motion";
import ReviewStatsCard from "./ReviewStatsCard";

const ReviewsStats = ({ stats }) => {
  const statsItems = [
    {
      type: "total",
      value: stats.total,
      label: "Total Avis",
    },
    {
      type: "average",
      value: stats.averageRating.toFixed(1),
      label: "Note Moyenne",
    },
    {
      type: "positive",
      value: stats.positive,
      label: "Positifs",
    },
    {
      type: "neutral",
      value: stats.neutral,
      label: "Neutres",
    },
    {
      type: "negative",
      value: stats.negative,
      label: "Négatifs",
    },
  ];

  return (
    <motion.div
      className="reviews-stats-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {statsItems.map((stat, index) => (
        <ReviewStatsCard key={index} {...stat} />
      ))}
    </motion.div>
  );
};

export default ReviewsStats;
