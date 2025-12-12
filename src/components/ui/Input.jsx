/**
 * Input.jsx
 * Reusable form input component with optional label and customizable styling.
 */

import React from "react";

/**
 * Input component for form fields.
 * Wraps HTML input with optional label and consistent styling.
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Optional label text displayed above input
 * @param {string} [props.type="text"] - HTML input type (text, password, email, number, etc.)
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Change event handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.className=""] - Additional CSS classes for styling
 * @returns {React.ReactElement} Input component
 *
 * @example
 * const [email, setEmail] = useState("");
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   placeholder="Enter your email"
 * />
 *
 * @example
 * <Input
 *   label="Password"
 *   type="password"
 *   value={password}
 *   onChange={handleChange}
 *   placeholder="Enter your password"
 * />
 */
const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default Input;
