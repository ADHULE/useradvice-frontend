// src/pages/Auth/Signup.jsx - Version Modernisée

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SocialLogin from "./SocialLogin";
import Input from "../../components/ui/Input";
import Alert from "../../components/ui/Alert";

import { GENRES } from "../../utils/constants/genres";
import { JOURS } from "../../utils/constants/jours";
import { MOIS } from "../../utils/constants/mois";
import { ANNEES } from "../../utils/constants/annees";
import Footer from "../../components/common/Footer";
import { register } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";

const Signup = () => {
  // États du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jour, setJour] = useState("");
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // États UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Validation du mot de passe
  const validatePassword = (pass) => {
    const requirements = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /\d/.test(pass),
      special: /[!@#$%^&*]/.test(pass),
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(password);

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};

    if (!firstName) errors.firstName = "Le prénom est requis";
    if (!lastName) errors.lastName = "Le nom est requis";
    if (!gender) errors.gender = "Le genre est requis";
    if (!jour || !mois || !annee)
      errors.date = "La date de naissance est requise";

    if (!email) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email invalide";
    }

    if (password) {
      const req = validatePassword(password);
      if (!req.length) errors.password = "Minimum 8 caractères";
      else if (!req.uppercase) errors.password = "Une majuscule requise";
      else if (!req.lowercase) errors.password = "Une minuscule requise";
      else if (!req.number) errors.password = "Un chiffre requis";
      else if (!req.special) errors.password = "Un caractère spécial requis";
    } else {
      errors.password = "Le mot de passe est requis";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Réinitialisation du formulaire
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setJour("");
    setMois("");
    setAnnee("");
    setGender("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFormErrors({});
  };

  // Soumission
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError(null);
    setSuccess(null);
    setLoading(true);

    const dateOfBirth = `${annee}-${mois.padStart(2, "0")}-${jour.padStart(
      2,
      "0"
    )}`;

    const userData = {
      firstname: firstName,
      lastname: lastName,
      gender,
      dateOfBirth,
      email,
      password,
    };

    try {
      const response = await register(userData);
      const successMessage =
        response.data?.message ||
        "Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.";

      setSuccess(successMessage);
      clearForm();

      setTimeout(() => {
        goToPath("/login");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Une erreur est survenue. Veuillez réessayer.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Année actuelle pour validation
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 13; // Minimum 13 ans

  return (
    <>
      <div className="auth-page signup-page">
        {/* Bannière décorative */}
        <div className="auth-decorative-banner">
          <div className="banner-content">
            <UserPlus size={48} className="banner-icon" />
            <h3 className="banner-title">Commencez votre aventure</h3>
            <p className="banner-subtitle">Rejoignez notre communauté</p>
          </div>
          <div className="banner-gradient"></div>
        </div>

        <motion.div
          className="auth-card signup-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <div className="header-icon">
              <Sparkles size={32} />
            </div>
            <h1 className="auth-title">Créer un compte</h1>
            <p className="auth-subtitle">
              Remplissez les informations ci-dessous
            </p>
          </div>

          {/* Messages d'état */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Alert
                  message={success}
                  type="success"
                  icon={<CheckCircle size={18} />}
                />
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Alert
                  message={error}
                  type="error"
                  icon={<AlertCircle size={18} />}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSignup} className="auth-form">
            {/* Noms */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  <User size={18} className="label-icon" />
                  Prénom
                </label>
                <Input
                  id="firstName"
                  placeholder="Votre prénom"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (formErrors.firstName)
                      setFormErrors({ ...formErrors, firstName: "" });
                  }}
                  error={formErrors.firstName}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  <User size={18} className="label-icon" />
                  Nom
                </label>
                <Input
                  id="lastName"
                  placeholder="Votre nom"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (formErrors.lastName)
                      setFormErrors({ ...formErrors, lastName: "" });
                  }}
                  error={formErrors.lastName}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Genre */}
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                <User size={18} className="label-icon" />
                Genre
              </label>
              <div className="select-wrapper">
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    if (formErrors.gender)
                      setFormErrors({ ...formErrors, gender: "" });
                  }}
                  className={`modern-select ${
                    formErrors.gender ? "error" : ""
                  }`}
                  disabled={loading}
                >
                  <option value="">Sélectionner votre genre</option>
                  {GENRES.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {formErrors.gender && (
                  <span className="form-error">{formErrors.gender}</span>
                )}
              </div>
            </div>

            {/* Date de naissance */}
            <div className="form-group">
              <label className="form-label">
                <Calendar size={18} className="label-icon" />
                Date de naissance
              </label>
              <div className="date-selector-group">
                <div className="date-select">
                  <select
                    value={jour}
                    onChange={(e) => {
                      setJour(e.target.value);
                      if (formErrors.date)
                        setFormErrors({ ...formErrors, date: "" });
                    }}
                    className="modern-select"
                    disabled={loading}
                  >
                    <option value="">Jour</option>
                    {JOURS.map((j) => (
                      <option key={j.value} value={j.value}>
                        {j.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="date-select">
                  <select
                    value={mois}
                    onChange={(e) => {
                      setMois(e.target.value);
                      if (formErrors.date)
                        setFormErrors({ ...formErrors, date: "" });
                    }}
                    className="modern-select"
                    disabled={loading}
                  >
                    <option value="">Mois</option>
                    {MOIS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="date-select">
                  <select
                    value={annee}
                    onChange={(e) => {
                      setAnnee(e.target.value);
                      if (formErrors.date)
                        setFormErrors({ ...formErrors, date: "" });
                    }}
                    className="modern-select"
                    disabled={loading}
                  >
                    <option value="">Année</option>
                    {ANNEES.filter(
                      (y) => y.value >= minYear && y.value <= maxYear
                    ).map((y) => (
                      <option key={y.value} value={y.value}>
                        {y.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {formErrors.date && (
                <span className="form-error">{formErrors.date}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail size={18} className="label-icon" />
                Adresse email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email)
                    setFormErrors({ ...formErrors, email: "" });
                }}
                error={formErrors.email}
                disabled={loading}
              />
            </div>

            {/* Mot de passe */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Lock size={18} className="label-icon" />
                Mot de passe
              </label>
              <div className="password-input-wrapper">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Créez un mot de passe sécurisé"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password)
                      setFormErrors({ ...formErrors, password: "" });
                  }}
                  error={formErrors.password}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Indicateurs de force du mot de passe */}
              {password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`strength-bar ${
                          Object.values(passwordRequirements).filter(Boolean)
                            .length >= i
                            ? "active"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <div className="strength-requirements">
                    {Object.entries(passwordRequirements).map(([key, met]) => (
                      <div
                        key={key}
                        className={`requirement ${met ? "met" : ""}`}
                      >
                        <CheckCircle size={14} />
                        <span>
                          {key === "length" && "8+ caractères"}
                          {key === "uppercase" && "Majuscule"}
                          {key === "lowercase" && "Minuscule"}
                          {key === "number" && "Chiffre"}
                          {key === "special" && "Caractère spécial"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <Lock size={18} className="label-icon" />
                Confirmer le mot de passe
              </label>
              <div className="password-input-wrapper">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (formErrors.confirmPassword)
                      setFormErrors({ ...formErrors, confirmPassword: "" });
                  }}
                  error={formErrors.confirmPassword}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Masquer la confirmation"
                      : "Afficher la confirmation"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Conditions */}
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  J'accepte les{" "}
                  <button type="button" className="inline-link">
                    conditions d'utilisation
                  </button>{" "}
                  et la{" "}
                  <button type="button" className="inline-link">
                    politique de confidentialité
                  </button>
                </span>
              </label>
            </div>

            {/* Bouton d'inscription */}
            <motion.button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Inscription en cours...
                </>
              ) : (
                <>
                  Créer mon compte
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Séparateur */}
          <div className="auth-divider">
            <span>Ou s'inscrire avec</span>
          </div>

          {/* Login social */}
          <SocialLogin
            onGoogle={() => goToPath("/auth/google")}
            onGithub={() => goToPath("/auth/github")}
            onFacebook={() => goToPath("/auth/facebook")}
            text=""
          />

          {/* Lien de connexion */}
          <div className="auth-footer">
            <p>
              Déjà un compte ?{" "}
              <button onClick={() => goToPath("/login")} className="auth-link">
                Se connecter
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
