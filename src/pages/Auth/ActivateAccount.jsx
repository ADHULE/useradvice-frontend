// src/pages/Auth/ActivateAccount.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import Footer from "../../components/common/Footer";
import { activate, requestNewCode } from "../../api/userApi";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import { goToPath } from "../../components/navigation/goToPath";
// import ButtonGoTo from "../../components/ui/Button";

const OTP_LENGTH = 6;

const ActivateAccount = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null); // 👉 message d’information

  const inputsRef = useRef([]);

  // Détecter si tous les chiffres sont remplis
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      submitOtp();
    }
  }, [otp]);

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

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && otp[idx] === "" && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const submitOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setInfo(null);
    try {
      const code = otp.join("");
      const response = await activate({ code });

      const msg = response.data?.message || "Compte activé avec succès !";
      setSuccess(msg);
      setTimeout(() => {
        goToPath("/login");
      }, 3000);
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

  // 👉 nouvelle fonction pour demander un code
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

          <div className="otp-container">
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
