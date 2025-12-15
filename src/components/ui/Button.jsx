import React from "react";
import { useNavigate } from "react-router-dom";

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

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
      return;
    }

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
