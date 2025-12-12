/**
 * Login.jsx
 * Page d'authentification utilisateur (email/mot de passe).
 * Gère la connexion, les erreurs, l'activation de compte et l'intégration des logins sociaux.
 */

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  ActivitySquare,
} from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import SocialLogin from "./SocialLogin";
import Footer from "../../components/common/Footer";
import { login } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";
import useLocalStorage from "../../hooks/useLocalStorage";
import Alert from "../../components/ui/Alert";

// Message constant pour comptes non activés
const ACCOUNT_NOT_ACTIVATED_MESSAGE = "Compte non activé";

const Login = () => {
  // Champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // États UI
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);

  // Stockage via hook useLocalStorage
  const [, setToken] = useLocalStorage("accessToken", null);
  const [, setUser] = useLocalStorage("user", null);
  const [, setExpiresAt] = useLocalStorage("expiresAt", null);

  /**
   * Soumission du formulaire de login
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setNeedsActivation(false);
    setLoading(true);

    try {
      const response = await login({ email, password });
      const {
        token: accessToken,
        expiresAt: exp,
        user: userData,
      } = response.data || {};

      if (!accessToken) throw new Error("Jeton d'accès manquant.");

      // Sauvegarde dans localStorage
      setToken(accessToken);
      setUser(userData ? JSON.stringify(userData) : null);
      if (exp) setExpiresAt(exp);

      setSuccess("Connexion réussie — redirection ...");

      // Redirection selon rôle
      const isAdmin = userData?.roles?.some((r) => r.name === "ROLE_ADMIN");
      setTimeout(() => {
        const path = isAdmin ? "/adminDashboard" : "/createReviewPage";
        goToPath(path, { replace: true });
      }, 800);
    } catch (err) {
      console.error("Erreur de connexion :", err);

      const errorMessage =
        err.response?.data?.message || "Email ou mot de passe incorrect.";

      // ✅ Cas compte non activé
      if (errorMessage === ACCOUNT_NOT_ACTIVATED_MESSAGE) {
        setNeedsActivation(true);
        setError(
          err.response?.data?.details ||
            "Votre compte n'est pas encore activé. Veuillez l'activer."
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Redirection vers la page d'activation
   */
  const handleGoToActivation = () => {
    goToPath("/activateAccount", { state: { email } });
  };

  return (
    <>
      <div className="login-page">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-card"
        >
          <h2>
            <LogIn /> Bienvenue
          </h2>
          <p className="card-subtitle">Connectez-vous à votre compte</p>

          {/* Messages de succès */}
          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert message={success} type="success" />
            </motion.div>
          )}

          {/* Messages d'erreur généraux */}
          {error && !needsActivation && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert message={error} type="error" />
            </motion.div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            {/* Champ email */}
            <div className="input-group with-icon">
              <Mail className="input-icon" />
              <Input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
            </div>

            {/* Champ mot de passe */}
            <div className="input-group with-icon">
              <Lock className="input-icon" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Options */}
            <div className="options-row">
              <label className="checkbox-group">
                <input type="checkbox" /> <span>Se souvenir de moi</span>
              </label>
              <a className="forgot-password" href="#">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bloc d'action */}
            <div className="form-action-block mt-6">
              {needsActivation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="activation-block mt-4"
                >
                  <div className="alert-error flex items-start space-x-2 p-3 mb-4 rounded-lg">
                    <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                    <p className="font-semibold">{error}</p>
                  </div>
                  {/* ✅ Bouton vers activation */}
                  <button
                    type="button"
                    onClick={handleGoToActivation}
                    className="login-button activation-button"
                    disabled={loading}
                  >
                    <span>Activer mon compte</span>
                    <ActivitySquare style={{ marginLeft: 6 }} />
                  </button>
                  {/* ✅ Bouton pour réessayer */}
                  <button
                    type="button"
                    className="login-button mt-2 secondary-button"
                    onClick={() => {
                      setNeedsActivation(false);
                      setError(null);
                    }}
                    disabled={loading}
                  >
                    <span>Réessayer la connexion</span>
                    <LogIn style={{ marginLeft: 6 }} />
                  </button>
                </motion.div>
              ) : (
                <button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >
                  <span>{loading ? "Connexion..." : "Se connecter"}</span>
                  <LogIn style={{ marginLeft: 6 }} />
                </button>
              )}
            </div>
          </form>

          {/* Connexion via réseaux sociaux */}
          <SocialLogin
            onGoogle={() => alert("Login Google")}
            onGithub={() => alert("Login Github")}
            onFacebook={() => alert("Login Facebook")}
            text="Continuez avec"
          />
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
