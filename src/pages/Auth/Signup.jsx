// src/pages/Signup.jsx
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import SocialLogin from "./SocialLogin";
import Input from "../../components/ui/Input";

import { GENRES } from "../../utils/constants/genres";
import { JOURS } from "../../utils/constants/jours";
import { MOIS } from "../../utils/constants/mois";
import { ANNEES } from "../../utils/constants/annees";
import Footer from "../../components/common/Footer";

const Signup = () => {
  const [nom, setNom] = useState("");
  const [postnom, setPostnom] = useState("");
  const [jour, setJour] = useState("");
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");
  const [genre, setGenre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const dateNaissance = `${annee}-${mois}-${jour}`;

    alert(
      `Compte créé :
Nom : ${nom}
Postnom : ${postnom}
Genre : ${genre}
Date de naissance : ${dateNaissance}
Email : ${email}`
    );
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

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Nom et Postnom */}
            <div className="flex gap-2">
              <div className="input-group flex-1">
                <User className="input-icon" />
                <Input
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="input-group flex-1">
                <User className="input-icon" />
                <Input
                  placeholder="Postnom"
                  value={postnom}
                  onChange={(e) => setPostnom(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Genre */}
            <div className="input-group">
              <User className="input-icon" />
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="flex-1 input-field"
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
            <label className="text-sm font-medium block">
              Date de naissance
            </label>
            <div className="flex-gap-2">
              <select
                value={jour}
                onChange={(e) => setJour(e.target.value)}
                required
                className="input-field flex-1"
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
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
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
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Bouton principal */}
            <button type="submit" className="signup-button">
              Créer le compte
            </button>
          </form>

          {/* Lien vers login */}
          <div className="login-link">
            Déjà un compte ? <a href="/login">Se connecter</a>
          </div>

          {/* Connexion sociale */}
          <SocialLogin
            onGoogle={() => alert("Google")}
            onApple={() => alert("Apple")}
            onFacebook={() => alert("Facebook")}
            text="Inscrivez-vous avec"
          />
        </motion.div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Signup;
