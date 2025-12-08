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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await login({ email, password });
      console.log("Réponse API :", response.data);

      const { token, expiresAt, user } = response.data || {};

      if (!token) {
        setError("Erreur : Jeton d'accès manquant dans la réponse serveur.");
        setLoading(false);
        return;
      }

      // Stockage
      localStorage.setItem("accessToken", token);
      if (expiresAt) localStorage.setItem("expiresAt", expiresAt);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Connexion réussie — redirection ...");

      // Vérification ADMIN
      const isAdmin = user?.roles?.some((r) => r.name === "ROLE_ADMIN");

      setTimeout(() => {
        if (isAdmin) {
          goToPath("/adminDashBoard", { replace: true });
        } else {
          goToPath("/createReviewPage", { replace: true });
        }
      }, 800);
    } catch (err) {
      console.error("Erreur de connexion :", err);
      const message =
        err.response?.data?.message || "Email ou mot de passe incorrect.";
      setError(message);
    } finally {
      setLoading(false);
    }
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

            <div className="options-row">
              <label className="checkbox-group">
                <input type="checkbox" /> <span>Se souvenir de moi</span>
              </label>
              <a className="forgot-password" href="#">
                Mot de passe oublié ?
              </a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              <span>{loading ? "Connexion..." : "Se connecter"}</span>
              <LogInIcon style={{ marginLeft: 6 }} />
            </button>
          </form>

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
