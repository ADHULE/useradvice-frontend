import React from "react";
import { FileText, Download, Percent, Clock } from "lucide-react";
import StatCard from "./StatCard";

const ReportsStats = () => {
  const stats = [
    {
      title: "Rapports Générés",
      value: "1,842",
      change: "+15.2%",
      icon: <FileText size={24} />,
      trend: "up",
      color: "#4361ee",
    },
    {
      title: "Téléchargements",
      value: "9,745",
      change: "+28.5%",
      icon: <Download size={24} />,
      trend: "up",
      color: "#4cc9f0",
    },
    {
      title: "Taux de Complétion",
      value: "94.3%",
      change: "+5.1%",
      icon: <Percent size={24} />,
      trend: "up",
      color: "#7209b7",
    },
    {
      title: "Rapports en Attente",
      value: "12",
      change: "-40%",
      icon: <Clock size={24} />,
      trend: "down",
      color: "#f72585",
    },
  ];

  return (
    <section className="reports-stats">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </section>
  );
};

export default ReportsStats;
