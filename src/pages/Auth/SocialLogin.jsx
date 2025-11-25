import React from "react";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function SocialLogin({
  onGoogle,
  onApple,
  onFacebook,
  text = "Continuer avec", // tu peux changer le texte selon la page
}) {
  return (
    <div className="social-login">
      <p>Ou {text} :</p>
      <div className="social-buttons">
        <button onClick={onGoogle} className="social-btn google">
          <FaGoogle /> Google
        </button>
        <button onClick={onApple} className="social-btn apple">
          <FaApple /> Apple
        </button>
        <button onClick={onFacebook} className="social-btn facebook">
          <FaFacebook /> Facebook
        </button>
      </div>
    </div>
  );
}
