// src/pages/Auth/Signup.jsx
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, UserPlus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import SocialLogin from "./SocialLogin";
import Input from "../../components/ui/Input";

import { GENRES } from "../../utils/constants/genres";
import { JOURS } from "../../utils/constants/jours";
import { MOIS } from "../../utils/constants/mois";
import { ANNEES } from "../../utils/constants/annees";
import Footer from "../../components/common/Footer";
import { register } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";
import Alert from "../../components/ui/Alert";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");

  const [jour, setJour] = useState("");
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const clearFormFields = () => {
    setFirstName("");
    setLastname("");
    setJour("");
    setMois("");
    setAnnee("");
    setGender("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const dateOfBirth = `${annee}-${mois.padStart(2, "0")}-${jour.padStart(
      2,
      "0"
    )}`;

    const userData = {
      firstname: firstName,
      lastname,
      gender,
      dateOfBirth,
      email,
      password,
    };

    setLoading(true);

    try {
      const response = await register(userData);
      const successMessage =
        response.data?.message ||
        "Inscription réussie ! Veuillez activer votre compte.";
      setSuccess(successMessage);
      clearFormFields();
      setTimeout(() => {
        goToPath("/login");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <motion.div
          className="signup-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="flex items-center justify-center gap-2 text-primary">
            <UserPlus /> Créer un compte
          </h2>
          <p className="card-subtitle">
            Rejoignez-nous et commencez votre aventure
          </p>

          {/* Messages d'état */}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert-success"
              role="alert"
              aria-live="polite"
            >
              <Alert message={success} type="success" />
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
              <Alert message={error} type="error" />
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Prénom et Postnom */}
            <div className="flex gap-2">
              <div className="input-group flex-1">
                <User className="input-icon" />
                <Input
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="input-group flex-1">
                <User className="input-icon" />
                <Input
                  placeholder="Postnom"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Genre */}
            <div className="input-group">
              <User className="input-icon" />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="flex-1 input-field"
                disabled={loading}
                aria-label="Genre"
              >
                <option value="" disabled>
                  Sélectionner le genre
                </option>
                {GENRES.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date de naissance */}

            <div className="input-group-container">
              <label htmlFor="birth-date-group">Date de naissance</label>
              <div className="date-selector-group" id="birth-date-group">
                <select
                  value={jour}
                  onChange={(e) => setJour(e.target.value)}
                  required
                  className="modern-select"
                  disabled={loading}
                  aria-label="Jour"
                >
                  <option value="" disabled>
                    Jour
                  </option>
                  {JOURS.map((j) => (
                    <option key={j.value} value={j.value}>
                      {j.label}
                    </option>
                  ))}
                </select>

                <select
                  value={mois}
                  onChange={(e) => setMois(e.target.value)}
                  required
                  className="modern-select"
                  disabled={loading}
                  aria-label="Mois"
                >
                  <option value="" disabled>
                    Mois
                  </option>
                  {MOIS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>

                <select
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                  required
                  className="modern-select"
                  disabled={loading}
                  aria-label="Année"
                >
                  <option value="" disabled>
                    Année
                  </option>
                  {ANNEES.map((y) => (
                    <option key={y.value} value={y.value}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <Mail className="input-icon" />
              <Input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Mot de passe */}
            <div className="input-group">
              <Lock className="input-icon" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirmation mot de passe */}
            <div className="input-group">
              <Lock className="input-icon" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                aria-label={
                  showConfirmPassword
                    ? "Masquer la confirmation du mot de passe"
                    : "Afficher la confirmation du mot de passe"
                }
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {/* Bouton principal */}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
              ) : (
                <UserPlus className="w-5 h-5 mr-2" />
              )}
              {loading ? "Inscription en cours..." : "Créer le compte"}
            </button>
          </form>

          {/* Lien vers la page de connexion */}
          <div className="login-link">
            Déjà un compte ? <a href="/login">Se connecter</a>
          </div>

          {/* Connexions sociales */}
          <SocialLogin
            onGoogle={() => alert("Connexion Google (à implémenter)")}
            onApple={() => alert("Connexion Apple (à implémenter)")}
            onFacebook={() => alert("Connexion Facebook (à implémenter)")}
            text="Inscrivez-vous avec"
          />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
