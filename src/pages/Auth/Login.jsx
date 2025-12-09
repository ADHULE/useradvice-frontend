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
  ActivitySquare,
} from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import SocialLogin from "./SocialLogin";
import Footer from "../../components/common/Footer";
import { login } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";

// Message attendu du backend pour un compte désactivé
const ACCOUNT_NOT_ACTIVATED_MESSAGE = "Compte non activé";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);

  // --- Soumission du formulaire ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setNeedsActivation(false);
    setLoading(true);

    try {
      const response = await login({ email, password });
      const { token, expiresAt, user } = response.data || {};

      if (!token) throw new Error("Jeton d'accès manquant.");

      // Stockage local du token et de l'utilisateur
      localStorage.setItem("accessToken", token);
      if (expiresAt) localStorage.setItem("expiresAt", expiresAt);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Connexion réussie — redirection ...");

      // Redirection selon rôle
      const isAdmin = user?.roles?.some((r) => r.name === "ROLE_ADMIN");
      setTimeout(() => {
        const path = isAdmin ? "/adminDashBoard" : "/createReviewPage";
        goToPath(path, { replace: true });
      }, 800);
    } catch (err) {
      console.error("Erreur de connexion :", err);

      const errorMessage =
        err.response?.data?.message || "Email ou mot de passe incorrect.";

      // Vérification si le compte est désactivé
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

  // --- Redirection vers la page d'activation ---
  const handleGoToActivation = () => {
    goToPath("/activateAccount", { state: { email } });
  };

  // --- Bloc affiché si activation requise ---
  const ActivationPrompt = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="activation-block mt-4"
    >
      <div className="alert-error flex items-start space-x-2 p-3 mb-4 rounded-lg">
        <AlertCircle size={20} className="mt-1 flex-shrink-0" />
        <p className="font-semibold">{error}</p>
      </div>
      <button
        type="button"
        onClick={handleGoToActivation}
        className="login-button activation-button"
        disabled={loading}
      >
        <span>Activer mon compte</span>
        <ActivitySquare style={{ marginLeft: 6 }} />
      </button>
      <button
        type="submit"
        className="login-button mt-2 secondary-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        <span>Réessayer la connexion</span>
        <LogInIcon style={{ marginLeft: 6 }} />
      </button>
    </motion.div>
  );

  // --- Bouton standard de connexion ---
  const LoginButton = () => (
    <button type="submit" className="login-button" disabled={loading}>
      <span>{loading ? "Connexion..." : "Se connecter"}</span>
      <LogInIcon style={{ marginLeft: 6 }} />
    </button>
  );

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert-success"
            >
              <CheckCircle size={20} /> {success}
            </motion.div>
          )}

          {/* Messages d'erreur (hors activation) */}
          {error && !needsActivation && (
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

            {/* Bloc d'action : bouton standard ou bloc d'activation */}
            <div className="form-action-block mt-6">
              {needsActivation ? <ActivationPrompt /> : <LoginButton />}
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
