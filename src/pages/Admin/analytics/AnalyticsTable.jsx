import React from "react";
import { Download } from "lucide-react";

const AnalyticsTable = ({ data = [] }) => {
  const defaultData = [
    {
      page: "/dashboard",
      visitors: "8,452",
      views: "12,845",
      time: "5m 23s",
      bounce: "24%",
    },
    {
      page: "/profile",
      visitors: "6,124",
      views: "9,452",
      time: "3m 45s",
      bounce: "32%",
    },
    {
      page: "/settings",
      visitors: "4,856",
      views: "7,124",
      time: "2m 12s",
      bounce: "45%",
    },
    {
      page: "/analytics",
      visitors: "3,745",
      views: "5,689",
      time: "6m 34s",
      bounce: "18%",
    },
    {
      page: "/reports",
      visitors: "2,985",
      views: "4,256",
      time: "4m 56s",
      bounce: "28%",
    },
  ];

  const tableData = data.length > 0 ? data : defaultData;

  return (
    <section className="analytics-detailed-table">
      <div className="analytics-table-header">
        <h3 className="analytics-table-title">Détails par Page</h3>
        <button className="analytics-table-export">
          <Download size={16} />
          CSV
        </button>
      </div>
      <div className="analytics-table-content">
        <div className="analytics-table-row analytics-table-header-row">
          <div className="analytics-table-cell analytics-table-cell--page">
            Page
          </div>
          <div className="analytics-table-cell analytics-table-cell--visitors">
            Visiteurs
          </div>
          <div className="analytics-table-cell analytics-table-cell--views">
            Vues
          </div>
          <div className="analytics-table-cell analytics-table-cell--time">
            Temps
          </div>
          <div className="analytics-table-cell analytics-table-cell--bounce">
            Rebond
          </div>
        </div>
        {tableData.map((row, index) => (
          <div key={index} className="analytics-table-row">
            <div className="analytics-table-cell analytics-table-cell--page">
              {row.page}
            </div>
            <div className="analytics-table-cell analytics-table-cell--visitors">
              {row.visitors}
            </div>
            <div className="analytics-table-cell analytics-table-cell--views">
              {row.views}
            </div>
            <div className="analytics-table-cell analytics-table-cell--time">
              {row.time}
            </div>
            <div className="analytics-table-cell analytics-table-cell--bounce">
              {row.bounce}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnalyticsTable;
