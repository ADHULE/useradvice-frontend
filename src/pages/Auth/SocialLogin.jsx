import React from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const SocialLogin = ({
  onGoogle,
  onGithub,
  onFacebook,
  text = "Continuer avec",
}) => {
  return (
    <div className="social-login">
      <p>Ou {text} :</p>
      <div className="social-buttons">
        <button onClick={onGoogle} className="social-btn google">
          <FaGoogle /> Google
        </button>
        <button onClick={onGithub} className="social-btn apple">
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
