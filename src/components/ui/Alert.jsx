// src/components/common/Alert.jsx
import React from "react";
import "./Alert.css";

const Alert = ({ message, type = "info" }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;
