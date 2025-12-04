// src/pages/Signup.jsx

import React, { useState } from "react";
// ... (imports)
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import SocialLogin from "./SocialLogin";
import Input from "../../components/ui/Input";

// Imports des constantes
import { GENRES } from "../../utils/constants/genres";
import { JOURS } from "../../utils/constants/jours";
import { MOIS } from "../../utils/constants/mois";
import { ANNEES } from "../../utils/constants/annees";
import Footer from "../../components/common/Footer";
import { register } from "../../api/userApi";
import { goToPath } from "../../components/navigation/goToPath";

const Signup = () => {
  // Utilisation du camelCase standard pour les états
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState(""); // Corresponds à 'lastname' dans l'API

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
      const errorMsg = "Les mots de passe ne correspondent pas.";
      setError(errorMsg);
      alert(`Erreur: ${errorMsg}`);
      return;
    }

    const dateOfBirth = `${annee}-${mois.padStart(2, "0")}-${jour.padStart(
      2,
      "0"
    )}`;

    // 3. Préparation des données pour l'API :
    const userData = {
      firstname: firstName,
      lastname,
      gender, // La valeur sera "Homme", "Femme", ou "Autre"
      dateOfBirth,
      email,
      password,
    };

    setLoading(true);

    try {
      const response = await register(userData);
      // ... (gestion du succès)
      const successMessage =
        response.data?.message ||
        "Inscription réussie ! Veuillez activer votre compte.";
      setSuccess(successMessage);
      alert(`Succès: ${successMessage}`);
      clearFormFields();
      console.log("Inscription réussie:", response.data);
      setTimeout(() => {
        goToPath("/adviceCreate");
      }, 3000);
    } catch (err) {
      // ... (gestion de l'erreur)
      const errorMessage =
        err.response?.data?.message ||
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      setError(errorMessage);
      alert(`Erreur: ${errorMessage}`);
      console.error("Erreur d'inscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (Rendu du formulaire)
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
          {/* ... (Affichage des messages d'état) ... */}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Prénom */}
            <div className="flex gap-2">
              <div className="input-group flex-1">
                <User className="input-icon" />
                <Input
                  placeholder="Prénom"
                  value={firstName} // Utilise l'état local firstName
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              {/* Postnom */}
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
              >
                <option value="" disabled>
                  Sélectionner le genre
                </option>
                {/* Assurez-vous que les valeurs correspondent à ce que l'API attend (ex: "Homme") */}
                {GENRES.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            {/* ... (suite du formulaire est correcte) ... */}

            <label className="text-sm font-medium block">
              Date de naissance
            </label>
            <div className="flex gap-2">
              <select
                value={jour}
                onChange={(e) => setJour(e.target.value)}
                required
                className="input-field flex-1"
                disabled={loading}
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
                className="input-field flex-1"
                disabled={loading}
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
                className="input-field flex-1"
                disabled={loading}
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

          <div className="login-link">
            Déjà un compte ? <a href="/login">Se connecter</a>
          </div>

          <SocialLogin
            onGoogle={() => alert("Google")}
            onApple={() => alert("Apple")}
            onFacebook={() => alert("Facebook")}
            text="Inscrivez-vous avec"
          />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
