import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Calendar,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import SocialLogin from "./SocialLogin"; // <-- composant réutilisable

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

  // Fonctions de social login
  const handleGoogleSignup = () =>
    alert("Inscription avec Google (à implémenter)");
  const handleAppleSignup = () =>
    alert("Inscription avec Apple (à implémenter)");
  const handleFacebookSignup = () =>
    alert("Inscription avec Facebook (à implémenter)");

  return (
    <div className="signup-container">
      <motion.div
        className="signup-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>
          Créer un compte <UserPlus />
        </h2>
        <p className="card-subtitle">Rejoignez-nous maintenant</p>

        <form onSubmit={handleSignup}>
          {/* Nom */}
          <div className="input-group">
            <User />
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          {/* Postnom */}
          <div className="input-group">
            <User />
            <input
              type="text"
              placeholder="Postnom"
              value={postnom}
              onChange={(e) => setPostnom(e.target.value)}
              required
            />
          </div>

          {/* Genre */}
          <div className="input-group">
            <User />
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <option value=""> Genre </option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          {/* Date de naissance */}
          <div className="date-group">
            <div className="input-group">
              <Calendar />
              <select
                value={jour}
                onChange={(e) => setJour(e.target.value)}
                required
              >
                <option value="">Jour</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <Calendar />
              <select
                value={mois}
                onChange={(e) => setMois(e.target.value)}
                required
              >
                <option value="">Mois</option>
                {[
                  "01",
                  "02",
                  "03",
                  "04",
                  "05",
                  "06",
                  "07",
                  "08",
                  "09",
                  "10",
                  "11",
                  "12",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <Calendar />
              <select
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                required
              >
                <option value="">Année</option>
                {Array.from({ length: 100 }, (_, i) => 2025 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email */}
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

          {/* Mot de passe */}
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

          {/* Confirmer mot de passe */}
          <div className="input-group">
            <Lock />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword((s) => !s)}
              aria-label="Afficher / Masquer le mot de passe"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button type="submit" className="signup-button">
            Créer le compte
          </button>
        </form>

        <div className="login-link">
          Déjà un compte ? <a href="/login">Se connecter</a>
        </div>

        {/* Bloc SocialLogin réutilisable */}
        <SocialLogin
          onGoogle={handleGoogleSignup}
          onApple={handleAppleSignup}
          onFacebook={handleFacebookSignup}
          text="inscrivez-vous avec"
        />
      </motion.div>
    </div>
  );
};

export default Signup;
