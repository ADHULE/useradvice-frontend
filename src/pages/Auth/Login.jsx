// src/pages/Login.jsx
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import SocialLogin from "./SocialLogin";
import ButtonGoTo from "../../components/ui/Button";
import Footer from "../../components/common/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLoggedIn = false; // à remplacer par ton vrai état d'authentification

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Connexion de l'utilisateur : ${email}`);
  };

  // Fonctions de connexion externe
  const handleGoogleLogin = () => alert("Connexion Google (à implémenter)");
  const handleAppleLogin = () => alert("Connexion Apple (à implémenter)");
  const handleFacebookLogin = () => alert("Connexion Facebook (à implémenter)");

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
            onGoogle={handleGoogleLogin}
            onApple={handleAppleLogin}
            onFacebook={handleFacebookLogin}
            text="Continuez avec"
          />

          {/* Lien vers inscription avec ButtonGoTo
        <div className="signup-link">
          <ButtonGoTo
          label="Créer un compte"
          className="login-button secondary"
          path="/signup"
          isLoggedIn={isLoggedIn}
            onAuthClick={() =>
              alert("Veuillez vous connecter pour créer un compte")
              }
              />
        </div> */}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
