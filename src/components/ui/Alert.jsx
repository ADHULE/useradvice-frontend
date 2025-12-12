/**
 * Alert.jsx
 * Reusable alert component for displaying messages with different types/severity levels.
 */

import React from "react";

/**
 * Alert component for displaying notification messages.
 * Displays messages with different styles based on alert type.
 *
 * @param {Object} props - Component props
 * @param {string} props.message - The message text to display
 * @param {string} [props.type="info"] - Alert type/severity level
 *   - "info": Information message (blue)
 *   - "success": Success message (green)
 *   - "warning": Warning message (yellow/orange)
 *   - "error": Error message (red)
 * @returns {React.ReactElement} Alert component
 *
 * @example
 * <Alert message="Account created successfully!" type="success" />
 *
 * @example
 * <Alert message="Something went wrong" type="error" />
 */
const Alert = ({ message, type = "info" }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;
