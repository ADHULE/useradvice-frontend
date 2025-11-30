import React, { Component } from "react";
import { FaUserPlus, FaSignInAlt, FaStar, FaBuilding } from "react-icons/fa";
import { goToPath } from "../../components/navigation/goToPath";
import ButtonGoTo from "../../components/ui/Button";

class Home extends Component {
  constructor(props) {
    super(props);

    // État local : savoir si l'utilisateur est connecté
    this.state = {
      isLoggedIn: false,
    };
  }

  /**
   * Méthode pour gérer la connexion ou l'inscription
   * @param {string} action - "Connexion" ou "Inscription"
   */
  handleAuthClick = (action) => {
    if (action === "Connexion") {
      goToPath("/login");
    } else if (action === "Inscription") {
      goToPath("/signup");
    }
  };

  /**
   * Méthode de déconnexion
   */
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    alert("Vous êtes déconnecté.");
    goToPath("/login");
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div className="home-container">
        <main className="main-content-presentation">
          {/* ===================== */}
          {/* Boutons Connexion / Inscription ou Logout */}
          {/* ===================== */}
          <div className="auth-buttons-placeholder">
            {isLoggedIn ? (
              <>
                {/* Bouton pour envoyer un avis */}
                <ButtonGoTo
                  label="Envoyer un Avis"
                  className="auth-button auth-button-submit"
                  type="button"
                  path="/avis"
                  isLoggedIn={isLoggedIn}
                  onAuthClick={this.handleAuthClick}
                />

                {/* Bouton de déconnexion */}
                <ButtonGoTo
                  label="Déconnexion"
                  className="auth-button auth-button-logout"
                  type="button"
                  path="/login"
                  isLoggedIn={isLoggedIn}
                  onAuthClick={this.handleAuthClick}
                  // Ici on redéfinit le clic pour la déconnexion
                  onClick={this.handleLogout}
                />
              </>
            ) : (
              <>
                {/* Bouton de connexion */}
                <ButtonGoTo
                  label="Connexion"
                  className="auth-button auth-button-login"
                  type="button"
                  path="/login"
                  isLoggedIn={isLoggedIn}
                  onAuthClick={this.handleAuthClick}
                />

                {/* Bouton d'inscription */}
                <ButtonGoTo
                  label="Inscription"
                  className="auth-button auth-button-register"
                  type="button"
                  path="/signup"
                  isLoggedIn={isLoggedIn}
                  onAuthClick={this.handleAuthClick}
                />
              </>
            )}
          </div>

          {/* ===================== */}
          {/* Section HERO */}
          {/* ===================== */}
          <section className="hero-section">
            <h1>Bienvenue sur la plateforme d'avis de SYSTEME ADHULE</h1>
            <p className="hero-tagline">
              Partagez votre expérience et aidez-nous à bâtir l'excellence.
            </p>

            {/* Bouton principal d'accès à l'espace avis */}
            <ButtonGoTo
              label="Accéder à mon espace Avis"
              className="cta-button"
              type="button"
              path="/avis-espace"
              isLoggedIn={isLoggedIn}
              onAuthClick={this.handleAuthClick}
            />
          </section>

          {/* ===================== */}
          {/* Section d'information */}
          {/* ===================== */}
          <section className="info-section">
            <div className="info-card">
              <FaStar className="info-icon" />
              <h3>Notre Engagement</h3>
              <p>
                Nous valorisons la transparence et l'honnêteté. Chaque avis est
                une chance de mieux vous servir.
              </p>
            </div>

            <div className="info-card">
              <FaBuilding className="info-icon" />
              <h3>À Propos de SYSTEME ADHULE</h3>
              <p>
                Leader dans notre domaine, SYSTEME ADHULE s'engage à fournir des
                solutions de haute qualité.
              </p>
            </div>

            <div className="info-card">
              <FaUserPlus className="info-icon" />
              <h3>Pourquoi créer un compte ?</h3>
              <p>
                Créer un compte vous permet de soumettre des avis vérifiés,
                suivre vos contributions et contacter le support.
              </p>
            </div>
          </section>
        </main>

        {/* ===================== */}
        {/* Footer */}
        {/* ===================== */}
        <footer className="home-footer">
          &copy; {new Date().getFullYear()} SYSTEME ADHULE. Tous droits
          réservés.
        </footer>
      </div>
    );
  }
}

export default Home;
