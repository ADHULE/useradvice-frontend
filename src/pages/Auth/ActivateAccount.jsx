// src/pages/Auth/ActivateAccount.jsx - Version Modernisée

import React, { useState, useRef, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  Lock,
  Shield,
  RefreshCw,
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "../../components/common/Footer";
import { activate, requestNewCode } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";
import Alert from "../../components/ui/Alert";

const OTP_LENGTH = 6;

const ActivateAccount = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [email, setEmail] = useState("");

  const inputsRef = useRef([]);

  // Récupérer l'email depuis localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setEmail(user.email || "");
      } catch (e) {
        console.warn("Erreur parsing user");
      }
    }
  }, []);

  // Soumettre automatiquement
  useEffect(() => {
    if (otp.every((d) => d !== "")) {
      submitOtp();
    }
  }, [otp]);

  /** Gestion de la saisie */
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

  /** Gestion du collage */
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");

    if (!paste) return;

    const digits = paste.split("").slice(0, OTP_LENGTH);

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const last = digits.length - 1;
    if (inputsRef.current[last]) {
      inputsRef.current[last].focus();
    }

    e.preventDefault();
  };

  /** Gestion des touches */
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && otp[idx] === "" && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  /** Soumission */
  const submitOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setInfo(null);

    try {
      const code = otp.join("");
      const response = await activate({ code });

      setSuccess(response.data?.message || "Compte activé avec succès !");

      setTimeout(() => goToPath("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Code invalide ou expiré. Veuillez demander un nouveau code."
      );

      setOtp(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  /** Nouveau code */
  const handleRequestNewCode = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setInfo(null);

    try {
      const response = await requestNewCode();
      setInfo(
        response.data.message ||
          "Un nouveau code a été envoyé à votre adresse email."
      );

      setOtp(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0].focus();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Impossible d'envoyer un nouveau code. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page activate-page">
        {/* Bannière décorative */}
        <div className="auth-decorative-banner">
          <div className="banner-content">
            <Shield size={48} className="banner-icon" />
            <h3 className="banner-title">Activation du compte</h3>
            <p className="banner-subtitle">Dernière étape avant l'accès</p>
          </div>
          <div className="banner-gradient"></div>
        </div>

        <motion.div
          className="auth-card activate-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <div className="header-icon">
              <Sparkles size={32} />
            </div>
            <h1 className="auth-title">Vérifiez votre compte</h1>
            <p className="auth-subtitle">
              Entrez le code à 6 chiffres envoyé à{" "}
              <span className="email-highlight">{email || "votre email"}</span>
            </p>
          </div>

          {/* Messages d'état */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Alert
                  message={success}
                  type="success"
                  icon={<CheckCircle size={18} />}
                />
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Alert
                  message={error}
                  type="error"
                  icon={<AlertCircle size={18} />}
                />
              </motion.div>
            )}
            {info && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Alert message={info} type="info" icon={<Mail size={18} />} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Zone OTP */}
          <div className="otp-section">
            <div className="otp-label">
              <Lock size={18} />
              <span>Code de vérification</span>
            </div>

            <div className="otp-container" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <motion.input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  className="otp-input"
                  whileFocus={{ scale: 1.1 }}
                  disabled={loading || success}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <div className="otp-hint">
              {otp.every((d) => d !== "") ? (
                <span className="hint-success">
                  <CheckCircle size={14} />
                  Code complet
                </span>
              ) : (
                <span className="hint-default">Saisissez les 6 chiffres</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="activate-actions">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <span>Traitement en cours...</span>
              </div>
            ) : (
              <>
                {!success && (
                  <motion.button
                    type="button"
                    className="auth-submit-btn"
                    onClick={submitOtp}
                    disabled={!otp.every((d) => d !== "")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Vérifier le code
                    <ArrowRight size={20} />
                  </motion.button>
                )}

                <div className="secondary-actions">
                  <button
                    type="button"
                    className="text-btn"
                    onClick={handleRequestNewCode}
                    disabled={loading}
                  >
                    <RefreshCw size={16} />
                    Renvoyer un code
                  </button>

                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => goToPath("/login")}
                  >
                    Retour à la connexion
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Info supplémentaire */}
          <div className="activate-info">
            <div className="info-card">
              <Shield size={20} />
              <div>
                <p className="info-title">Sécurité</p>
                <p className="info-text">
                  Ce code expire dans 15 minutes pour votre sécurité.
                </p>
              </div>
            </div>

            <div className="info-card">
              <Mail size={20} />
              <div>
                <p className="info-title">Email non reçu ?</p>
                <p className="info-text">
                  Vérifiez vos spams ou renvoyez un nouveau code.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default ActivateAccount;
