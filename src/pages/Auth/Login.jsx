/**
 * Login.jsx
 * Page d'authentification (email / mot de passe)
 * - Récupère user + token + expiresAt depuis le backend
 * - Stocke correctement les données via useAuth
 * - Redirige selon le rôle (ROLE_ADMIN / ROLE_USER)
 * - Affiche un message et un bouton d'activation si le compte est inactif
 */

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

const ACCOUNT_NOT_ACTIVATED_MESSAGE = "Compte non activé";

const Login = () => {
  // =======================
  // ÉTAT DU FORMULAIRE
  // =======================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // =======================
  // ÉTAT UI
  // =======================
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);

  // =======================
  // AUTH GLOBAL
  // =======================
  const { login } = useAuth();

  // =======================
  // SOUMISSION FORMULAIRE
  // =======================
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

      //  Stockage GLOBAL
      login({
        token,
        expiresAt,
        user,
      });

      //  Redirection selon rôle
      const isAdmin = user.roles?.some((role) => role.name === "ROLE_ADMIN");
      goToPath(isAdmin ? "/adminDashboard" : "/createReviewPage", {
        replace: true,
      });
    } catch (err) {
      console.error("Erreur login :", err);

      const message = err.response?.data?.message;

      // Cas compte non activé
      if (message === ACCOUNT_NOT_ACTIVATED_MESSAGE) {
        setNeedsActivation(true);
        setError(
          err.response?.data?.details ||
            "Votre compte n'est pas encore activé. Veuillez activer votre compte."
        );
      } else {
        setError(message || "Email ou mot de passe incorrect");
      }
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // OUVRIR LA PAGE D'ACTIVATION
  // =======================
  const handleOpenActivationPage = () => {
    // Redirige vers une nouvelle page dédiée à l’activation
    goToPath("/activateAccount", { replace: false });
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
                aria-label="Mot de passe"
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

          {/* BOUTON ACTIVER COMPTE SI INACTIF */}
          {needsActivation && (
            <div className="activation-section">
              <p className="activation-message">
                Votre compte n'est pas activé. Cliquez ci-dessous pour
                l'activer.
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
