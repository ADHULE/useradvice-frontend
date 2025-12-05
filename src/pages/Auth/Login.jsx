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
      // Appel API de connexion
      const response = await login({ email, password });

      //  Déstructuration ajustée : Le 'refresh' est ignoré car il est dans un Cookie HttpOnly.
      const { token: accessToken, expiresAt } = response.data;

      // Condition de succès : vérifier uniquement la présence de l'Access Token.
      if (accessToken) {
        // 1. Stockage de l'Access Token dans localStorage
        // L'intercepteur Axios le lira pour l'ajouter à l'en-tête Authorization.
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expiresAt", expiresAt);

        // 2. Nettoyage de l'ancien Refresh Token dans localStorage (pour sécurité/propreté)
        localStorage.removeItem("refreshToken");

        // Message succès
        setSuccess(
          "Connexion réussie ! Redirection vers l'espace avis en cours..."
        );

        // Redirection après 2 secondes
        setTimeout(() => {
          goToPath("/createReviewPage"); // Redirection vers la page sécurisée
        }, 2000);
      } else {
        // Si la réponse était 200 mais le token est étrangement absent
        setError("Erreur de protocole: Access Token manquant dans la réponse.");
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
      // Récupère le message d'erreur du backend (ex: Bad credentials)
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
            >
              <CheckCircle size={20} /> {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert-error"
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
                aria-label="Afficher / Masquer le mot de passe"
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
              Se connecter
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
