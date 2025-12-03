import React from "react";
// Ajout de FaWhatsapp
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Remplacez 'XXXXXXXXXX' par le numéro de téléphone réel,
  // incluant le code pays (ex: +33612345678)
  const whatsappNumber = "XXXXXXXXXX";

  return (
    <footer
      className="home-footer"
      role="contentinfo"
      aria-label="Pied de page de la société"
    >
      <div className="footer-icons">
        {/* 1. LinkedIn : Confiance & Travail */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Profil LinkedIn de SYSTEME ADHULE"
          title="Confiance et Travail (LinkedIn)"
        >
          <FaLinkedin />
        </a>

        {/* 2. GitHub : Travail & Clarté */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Référentiel GitHub de SYSTEME ADHULE"
          title="Travail et Innovation (GitHub)"
        >
          <FaGithub />
        </a>

        {/* 3. WhatsApp : Confiance & Communication Directe (Nouveau !) */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter SYSTEME ADHULE via WhatsApp"
          title="Communication Rapide et Confiance (WhatsApp)"
        >
          <FaWhatsapp />
        </a>

        {/* 4. Facebook : Communauté & Amour */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Page Facebook de SYSTEME ADHULE"
          title="Amour et Communauté (Facebook)"
        >
          <FaFacebook />
        </a>

        {/* 5. Instagram : Inspiration & Amour */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Profil Instagram de SYSTEME ADHULE"
          title="Inspiration et Partage (Instagram)"
        >
          <FaInstagram />
        </a>
      </div>

      <div className="footer-text">
        &copy; <strong>{currentYear} SYSTEME ADHULE</strong> — Tous droits
        réservés.
      </div>
    </footer>
  );
};

export default Footer;
