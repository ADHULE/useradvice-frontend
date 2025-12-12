// src/pages/Auth/SocialLogin.jsx
import React from "react";
import { FaGoogle, FaFacebook, FaGithub, FaApple } from "react-icons/fa";

const SocialLogin = ({
  onGoogle,
  onGithub,
  onFacebook,
  onApple,
  text = "Continuer avec",
}) => {
  return (
    <div className="social-login">
      <p>Ou {text} :</p>
      <div className="social-buttons">
        <button onClick={onGoogle} className="social-btn google">
          <FaGoogle /> Google
        </button>
        {onApple && (
          <button onClick={onApple} className="social-btn apple">
            <FaApple /> Apple
          </button>
        )}
        <button onClick={onGithub} className="social-btn github">
          <FaGithub /> Github
        </button>
        <button onClick={onFacebook} className="social-btn facebook">
          <FaFacebook /> Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
