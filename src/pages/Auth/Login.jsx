import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import SocialLogin from "./SocialLogin";
import Footer from "../../components/common/Footer";

// Import de l'API
import { login } from "../../api/userApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Appel API
      const response = await login({ email, password });

      // Supposons que ton backend renvoie { token: "..." }
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);

        // Debug : afficher le token
        alert(`Connexion réussie !\nToken : ${token}`);

        // Redirection possible
        // window.location.href = "/dashboard";
      } else {
        setError("Aucun token reçu du serveur");
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError("Email ou mot de passe incorrect");
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

            {/* Message d'erreur */}
            {error && <p className="error-message">{error}</p>}

            {/* Bouton de connexion */}
            <button type="submit" className="login-button">
              Se connecter
            </button>
          </form>

          {/* Connexions sociales */}
          <SocialLogin
            onGoogle={() => alert("Connexion Google (à implémenter)")}
            onApple={() => alert("Connexion Apple (à implémenter)")}
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
