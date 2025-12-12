/**
 * Button.jsx
 * Reusable button component with multiple modes (navigation, onClick, submit).
 */

import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Button component that supports navigation, click handlers, and submission.
 * Can display label, children, or both. Supports multiple style variants.
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Button text to display
 * @param {React.ReactNode} [props.children] - React children to render inside button (overrides label)
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.type="button"] - HTML button type ("button", "submit", "reset")
 * @param {string} [props.path] - Route path to navigate to (optional)
 * @param {Function} [props.onClick] - Click handler function (optional)
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {string} [props.variant="primary"] - Style variant ("primary", "secondary", "danger", "success", etc.)
 * @returns {React.ReactElement} Button component
 *
 * @example
 * // Simple button with label
 * <Button label="Click me" onClick={handleClick} />
 *
 * @example
 * // Navigation button
 * <Button label="Go to Users" path="/userList" />
 *
 * @example
 * // Submit button with custom styling
 * <Button label="Save" type="submit" variant="success" className="custom-style" />
 *
 * @example
 * // Button with children (icon + text)
 * <Button path="/home" variant="secondary">
 *   <HomeIcon /> Home
 * </Button>
 */
const Button = ({
  label,
  className = "",
  type = "button",
  path,
  onClick,
  disabled = false,
  variant = "primary",
  children,
}) => {
  const navigate = useNavigate();

  /**
   * Handle button click with priority logic:
   * 1. If disabled, prevent action
   * 2. If onClick provided, execute it
   * 3. If path provided, navigate to it
   * @param {React.MouseEvent} e - Click event
   */
  const handleClick = (e) => {
    // If button is disabled, prevent any action
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Priority 1: Execute onClick handler if provided
    if (onClick) {
      onClick(e);
      return;
    }

    // Priority 2: Navigate to path if provided
    if (path) {
      navigate(path);
    }
  };

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {/* Display children if provided, otherwise display label */}
      {children || label}
    </button>
  );
};

export default Button;

/**
 * ButtonGoTo component for backward compatibility.
 * Enhanced button that checks authentication status before navigation.
 * Redirects to login if user is not authenticated.
 *
 * @deprecated Use Button component instead. This is maintained for backward compatibility.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Button label text
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.type="button"] - HTML button type
 * @param {string} props.path - Route to navigate to
 * @param {boolean} props.isLoggedIn - Whether user is currently logged in
 * @param {Function} [props.onAuthClick] - Callback when user needs to authenticate
 * @param {...Object} props - Other props to pass to Button
 * @returns {React.ReactElement} Button component
 *
 * @example
 * // Requires authentication before navigation
 * <ButtonGoTo
 *   label="View Admin"
 *   path="/admin"
 *   isLoggedIn={user !== null}
 *   onAuthClick={(action) => navigate('/login')}
 * />
 */
const ButtonGoTo = ({
  label,
  className = "",
  type = "button",
  path,
  isLoggedIn,
  onAuthClick,
  onClick,
  ...props
}) => {
  const navigate = useNavigate();

  /**
   * Handle authentication-aware navigation.
   * Checks if user is logged in before allowing navigation.
   */
  const handleClick = () => {
    if (isLoggedIn) {
      if (path) {
        navigate(path);
      } else if (onClick) {
        onClick();
      }
    } else if (onAuthClick) {
      onAuthClick("Connexion");
    }
  };

  return (
    <Button
      label={isLoggedIn ? label : `${label} (Connexion requise)`}
      className={className}
      type={type}
      onClick={handleClick}
      {...props}
    />
  );
};

export { ButtonGoTo };
