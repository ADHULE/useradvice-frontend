// pages/Auth/Login.jsx

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";

import Input from "../../components/ui/Input";
import Footer from "../../components/common/Footer";
import Alert from "../../components/ui/Alert";
import SocialLogin from "./SocialLogin";

import { login as loginApi } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";
import useAuth from "../../hooks/useAuth";
import { ACCOUNT_NOT_ACTIVATED_MESSAGE } from "../../utils/constants";

/**
 * Page de connexion
 * ⚠️ Ne dépend PAS des interceptors globaux
 */
const Login = () => {
  // -------------------------------
  // ÉTAT FORMULAIRE
  // -------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // -------------------------------
  // ÉTAT UI
  // -------------------------------
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);

  // -------------------------------
  // AUTH GLOBAL
  // -------------------------------
  const { login } = useAuth();

  // -------------------------------
  // SOUMISSION FORMULAIRE
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

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

      goToPath(isAdmin ? "/adminDashboard" : "/createReviewPage", {
        replace: true,
      });
    } catch (err) {
      console.error("❌ Erreur login :", err);

      const message = err.response?.data?.message;

      // Cas compte non activé
      if (message === ACCOUNT_NOT_ACTIVATED_MESSAGE) {
        setNeedsActivation(true);
        setError(
          err.response?.data?.details || "Votre compte n'est pas encore activé."
        );
      } else {
        setError(message || "Email ou mot de passe incorrect");
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // REDIRECTION ACTIVATION COMPTE
  // -------------------------------
  const handleOpenActivationPage = () => {
    goToPath("/activateAccount");
  };

  return (
    <>
      <div className="login-page">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-card"
        >
          <h2 className="flex items-center gap-2">
            <LogIn /> Connexion
          </h2>

          <p className="card-subtitle">Connectez-vous à votre compte</p>

          {/* MESSAGE D'ERREUR */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert message={error} type="error" />
            </motion.div>
          )}

          {/* FORMULAIRE */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="input-group with-icon">
              <Mail className="input-icon" />
              <Input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group with-icon">
              <Lock className="input-icon" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* ACTION */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
              <LogIn className="ml-2" />
            </button>
          </form>

          {/* ACTIVATION COMPTE */}
          {needsActivation && (
            <div className="activation-section">
              <p className="activation-message">
                Votre compte n'est pas activé.
              </p>
              <button
                type="button"
                className="activation-button"
                onClick={handleOpenActivationPage}
              >
                Activer mon compte
              </button>
            </div>
          )}

          {/* LOGIN SOCIAL */}
          <SocialLogin
            onGoogle={() => alert("Google login")}
            onGithub={() => alert("Github login")}
            onFacebook={() => alert("Facebook login")}
            text="Ou continuer avec"
          />
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
