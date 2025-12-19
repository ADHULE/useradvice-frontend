import React from "react";
import { Globe, MoreVertical } from "lucide-react";
import TrafficSource from "./ TrafficSource";

const TrafficCard = ({ trafficSources = [] }) => {
  const defaultSources = [
    {
      name: "Recherche Organique",
      percentage: 45,
      value: "12.4K",
      color: "#4361ee",
    },
    {
      name: "Réseaux Sociaux",
      percentage: 28,
      value: "7.8K",
      color: "#4cc9f0",
    },
    { name: "Direct", percentage: 15, value: "4.2K", color: "#7209b7" },
    { name: "Référencement", percentage: 8, value: "2.1K", color: "#f72585" },
    { name: "Email", percentage: 4, value: "1.1K", color: "#8338ec" },
  ];

  const sources = trafficSources.length > 0 ? trafficSources : defaultSources;

  return (
    <div className="analytics-traffic-card">
      <div className="analytics-traffic-card__header">
        <h4 className="analytics-traffic-card__title">
          <Globe size={18} />
          Sources de Trafic
        </h4>
        <MoreVertical size={16} />
      </div>
      <div className="analytics-traffic-card__content">
        {sources.map((source, index) => (
          <TrafficSource key={index} {...source} />
        ))}
      </div>
    </div>
  );
};

export default TrafficCard;
