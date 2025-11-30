import React from "react";
import {
  FaBuilding,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaStar,
} from "react-icons/fa";

const Footer = () => {
  // Année courante pour le copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-5 p-5">
      <div className="container">
        <div className="row">
          {/* Colonne 1: Logo et Présentation */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-white mb-3">
              <FaBuilding className="me-2 text-primary" /> SYSTEME ADHULE
            </h5>
            <p className="text-secondary">
              Leader dans les solutions numériques et votre plateforme d'avis de
              confiance.
            </p>
          </div>

          {/* Colonne 2: Liens Rapides */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-white mb-3">Liens Utiles</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  À Propos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-light text-decoration-none">
                  <FaStar className="me-1" /> Espace Avis
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Réseaux Sociaux et Contact */}
          <div className="col-md-4">
            <h5 className="text-white mb-3">Suivez-nous</h5>
            <div className="d-flex mb-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light me-3 fs-4"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light me-3 fs-4"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light me-3 fs-4"
              >
                <FaLinkedin />
              </a>
            </div>
            <small className="text-secondary">
              Email: support@adhule.com <br />
              Tél: +243 (0) XX XXX XX XX
            </small>
          </div>
        </div>

        {/* Ligne de Copyright */}
        <div className="row mt-4 pt-3 border-top border-secondary">
          <div className="col text-center">
            <p className="mb-0 text-secondary">
              &copy; {currentYear} SYSTEME ADHULE. Tous droits réservés. |
              Politique de Confidentialité
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
