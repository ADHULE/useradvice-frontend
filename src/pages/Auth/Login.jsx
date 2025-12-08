// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle,
  AlertCircle,
  LogInIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import SocialLogin from "./SocialLogin";
import Footer from "../../components/common/Footer";
import { login } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await login({ email, password });
      const { token: accessToken, expiresAt } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expiresAt", expiresAt);
        localStorage.removeItem("refreshToken");

        setSuccess(
          "Connexion réussie ! Redirection vers l'espace avis en cours..."
        );

        setTimeout(() => {
          goToPath("/createReviewPage");
        }, 2000);
      } else {
        setError("Erreur de protocole: Access Token manquant dans la réponse.");
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
      const errorMessage =
        err.response?.data?.message || "Email ou mot de passe incorrect.";
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="login-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-card"
        >
          <h2>
            <LogIn /> Bienvenue
          </h2>
          <p className="card-subtitle">Connectez-vous à votre compte</p>

          {/* Messages de feedback */}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert-success"
              role="alert"
              aria-live="polite"
            >
              <CheckCircle size={20} /> {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert-error"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle size={20} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Champ email */}
            <div className="input-group with-icon">
              <Mail className="input-icon" />
              <Input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
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
                className="flex-1"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
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

            {/* Bouton de connexion */}
            <button type="submit" className="login-button">
              <span>Se connecter</span>
              <LogInIcon style={{ marginLeft: "8px" }} />
            </button>
          </form>

          {/* Connexions sociales */}
          <SocialLogin
            onGoogle={() => alert("Connexion Google (à implémenter)")}
            onGithub={() => alert("Connexion Github (à implémenter)")}
            onFacebook={() => alert("Connexion Facebook (à implémenter)")}
            text="Continuez avec"
          />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
