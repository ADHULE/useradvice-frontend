import React from "react";
import { Smartphone, Monitor, Tablet } from "lucide-react";

const DevicesCard = () => {
  const devices = [
    {
      name: "Mobile",
      percentage: 62,
      icon: <Smartphone size={16} />,
      color: "#4361ee",
    },
    {
      name: "Desktop",
      percentage: 32,
      icon: <Monitor size={16} />,
      color: "#4cc9f0",
    },
    {
      name: "Tablette",
      percentage: 6,
      icon: <Tablet size={16} />,
      color: "#7209b7",
    },
  ];

  return (
    <div className="analytics-devices-card">
      <div className="analytics-devices-card__header">
        <h4 className="analytics-devices-card__title">
          <Smartphone size={18} />
          Appareils
        </h4>
      </div>
      <div className="analytics-devices-card__content">
        {devices.map((device, index) => (
          <div key={index} className="analytics-device-item">
            <div className="analytics-device-item__info">
              <div className="analytics-device-item__icon">{device.icon}</div>
              <span className="analytics-device-item__name">{device.name}</span>
            </div>
            <div className="analytics-device-item__percentage">
              {device.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesCard;
