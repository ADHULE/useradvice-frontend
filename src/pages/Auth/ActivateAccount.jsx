// src/pages/Auth/ActivateAccount.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import Footer from "../../components/common/Footer";
import { activate, requestNewCode } from "../../api/userApi";
import { Link } from "react-router-dom";
import { goToPath } from "../../components/navigation/goToPath";

const OTP_LENGTH = 6;

const ActivateAccount = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const inputsRef = useRef([]);

  // Soumettre automatiquement quand tout est rempli
  useEffect(() => {
    if (otp.every((d) => d !== "")) {
      submitOtp();
    }
  }, [otp]);

  /** Gère la saisie caractère par caractère */
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);

    if (idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  /** Gère le collage d’un code complet (6 chiffres) */
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");

    if (!paste) return;

    const digits = paste.split("").slice(0, OTP_LENGTH);

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Place le focus après le dernier chiffre collé
    const last = digits.length - 1;
    if (inputsRef.current[last]) {
      inputsRef.current[last].focus();
    }

    e.preventDefault();
  };

  /** Effacement intelligent */
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && otp[idx] === "" && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  /** Soumission API */
  const submitOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setInfo(null);

    try {
      const code = otp.join("");
      const response = await activate({ code });

      setSuccess(response.data?.message || "Compte activé avec succès !");
      setTimeout(() => goToPath("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de l'activation. Votre code est expiré !"
      );

      setOtp(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  /** Requête nouveau code */
  const handleRequestNewCode = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setInfo(null);

    try {
      const response = await requestNewCode();
      setInfo(
        response.data.message ||
          "Un nouveau code a été généré. Veuillez vérifier votre mail."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Impossible de générer un nouveau code. Réessayez plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="activate-container">
        <div className="activate-card">
          <h2 className="activate-title">Activation du compte</h2>

          {success && (
            <div className="alert success">
              <FaCheckCircle /> {success}
            </div>
          )}
          {error && (
            <div className="alert error">
              <FaExclamationCircle /> {error}
            </div>
          )}
          {info && (
            <div className="alert info">
              <FaCheckCircle /> {info}
            </div>
          )}

          {/* Zone OTP */}
          <div className="otp-container" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="otp-input"
              />
            ))}
          </div>

          <div className="activionOption">
            {loading && (
              <div className="loading">
                <FaSpinner className="spin" size={24} />
                <span>Activation en cours...</span>
              </div>
            )}

            <Link to={"/reSendActivationCode"}>
              Demander un nouveau code d'activation
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ActivateAccount;
