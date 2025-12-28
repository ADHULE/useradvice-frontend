// pages/Auth/Login.jsx - Version Corrigée

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Footer from "../../components/common/Footer";
import Alert from "../../components/ui/Alert";
import SocialLogin from "./SocialLogin";

import { login as loginApi } from "../../api/userApi";
import useAuth from "../../hooks/useAuth";

// Définir la constante manquante
const ACCOUNT_NOT_ACTIVATED_MESSAGE = "ACCOUNT_NOT_ACTIVATED";

/**
 * Page de connexion - Version Corrigée
 */
const Login = () => {
  const navigate = useNavigate();

  // États du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // États UI
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Auth global
  const { login } = useAuth();

  // Helper pour la navigation
  const goToPath = (path, options = {}) => {
    if (options.replace) {
      navigate(path, { replace: true });
    } else {
      navigate(path);
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email invalide";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError(null);
    setNeedsActivation(false);
    setLoading(true);

    try {
      const response = await loginApi({ email, password });
      const { user, token, expiresAt } = response.data;

      if (!token || !user) {
        throw new Error("Réponse serveur invalide");
      }

      // Stockage global sécurisé
      login({ token, expiresAt, user });

      // Redirection selon rôle
      const isAdmin = user.roles?.some((role) => role.name === "ROLE_ADMIN");

      goToPath(isAdmin ? "/adminDashboard" : "/createReviewPage");
    } catch (err) {
      console.error("❌ Erreur login :", err);

      const message = err.response?.data?.message;
      const errorCode = err.response?.data?.errorCode;

      // Cas compte non activé
      if (
        message === ACCOUNT_NOT_ACTIVATED_MESSAGE ||
        errorCode === "ACCOUNT_NOT_ACTIVATED"
      ) {
        setNeedsActivation(true);
        setError(
          err.response?.data?.details ||
            "Votre compte n'est pas encore activé. Veuillez vérifier vos emails."
        );
      } else if (err.response?.status === 401) {
        setError("Email ou mot de passe incorrect");
      } else if (err.response?.status === 429) {
        setError(
          "Trop de tentatives. Veuillez réessayer dans quelques minutes."
        );
      } else {
        setError(message || "Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirection activation compte
  const handleOpenActivationPage = () => {
    goToPath("/activateAccount");
  };

  // Réinitialisation mot de passe
  const handleForgotPassword = () => {
    goToPath("/forgot-password");
  };

  // Gestion des connexions sociales
  const handleSocialLogin = (provider) => {
    setLoading(true);
    // Redirection directe vers l'endpoint OAuth
    window.location.href = `/auth/${provider}`;
  };

  return (
    <>
      <div className="auth-page login-page">
        {/* Bannière décorative */}
        <div className="auth-decorative-banner">
          <div className="banner-content">
            <Shield size={48} className="banner-icon" />
            <h3 className="banner-title">Connexion sécurisée</h3>
            <p className="banner-subtitle">Votre sécurité est notre priorité</p>
          </div>
          <div className="banner-gradient"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="auth-card login-card"
        >
          <div className="auth-header">
            <div className="header-icon">
              <Sparkles size={32} />
            </div>
            <h1 className="auth-title">Bienvenue de retour</h1>
            <p className="auth-subtitle">
              Connectez-vous pour accéder à votre espace personnel
            </p>
          </div>

          {/* Messages d'erreur */}
          <AnimatePresence>
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
          </AnimatePresence>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail size={18} className="label-icon" />
                Adresse email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email)
                    setFormErrors({ ...formErrors, email: "" });
                }}
                error={formErrors.email}
                disabled={loading}
                autoComplete="email"
              />
              {formErrors.email && (
                <span className="form-error">{formErrors.email}</span>
              )}
            </div>

            {/* Mot de passe */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password" className="form-label">
                  <Lock size={18} className="label-icon" />
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="forgot-password"
                  disabled={loading}
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="password-input-wrapper">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password)
                      setFormErrors({ ...formErrors, password: "" });
                  }}
                  error={formErrors.password}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.password && (
                <span className="form-error">{formErrors.password}</span>
              )}
            </div>

            {/* Soumettre */}
            <motion.button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Activation compte */}
          <AnimatePresence>
            {needsActivation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="activation-notice"
              >
                <div className="notice-content">
                  <Shield size={20} />
                  <p>Votre compte nécessite une activation</p>
                </div>
                <button
                  type="button"
                  className="activation-btn"
                  onClick={handleOpenActivationPage}
                  disabled={loading}
                >
                  Activer mon compte
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Séparateur */}
          <div className="auth-divider">
            <span>Ou continuer avec</span>
          </div>

          {/* Login social */}
          <SocialLogin
            onGoogle={() => handleSocialLogin("google")}
            onGithub={() => handleSocialLogin("github")}
            onFacebook={() => handleSocialLogin("facebook")}
            isLoading={loading}
            loadingProvider={loading ? "social" : null}
            text=""
          />

          {/* Lien d'inscription */}
          <div className="auth-footer">
            <p>
              Pas encore de compte ?{" "}
              <button
                onClick={() => goToPath("/signup")}
                className="auth-link"
                disabled={loading}
              >
                S'inscrire
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
