import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import SocialLogin from "./SocialLogin"; // <-- composant réutilisable

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Connexion de l'utilisateur : ${email}`);
  };

  // Fonctions de connexion externe
  const handleGoogleLogin = () =>
    alert("Connexion avec Google (à implémenter)");
  const handleAppleLogin = () => alert("Connexion avec Apple (à implémenter)");
  const handleFacebookLogin = () =>
    alert("Connexion avec Facebook (à implémenter)");

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <h2>Bienvenue </h2>
        <p className="card-subtitle">Connectez-vous à votre compte</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail />
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="options-row">
            <label className="checkbox-group">
              <input type="checkbox" /> <span>Se souvenir de moi</span>
            </label>
            <a className="forgot-password" href="#">
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>

        {/* --- Bloc SocialLogin réutilisable --- */}
        <SocialLogin
          onGoogle={handleGoogleLogin}
          onApple={handleAppleLogin}
          onFacebook={handleFacebookLogin}
          text="continuez avec"
        />

        <div className="signup-link">
          Pas encore de compte ? <a href="/signup">S'inscrire</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
