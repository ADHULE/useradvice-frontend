// src/pages/Advice/AdviceCreate.jsx - Version Finale

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import {
  FaPaperPlane,
  FaCommentDots,
  FaRegClock,
  FaSave,
  FaLightbulb,
  FaListUl,
  FaQuoteRight,
  FaQuestionCircle,
  FaArrowLeft, // Pour la navigation
} from "react-icons/fa";

import { createAdvice } from "../../api/adviceApi";

const AdviceCreate = () => {
  const navigate = useNavigate();

  const [advice, setAdvice] = useState({
    message: "",
    // Le statut est généralement défini par le backend lors de la création (ex: PENDING)
    status: "EN ATTENTE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Pour afficher les erreurs

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur

    if (!advice.message.trim()) {
      setError("Veuillez saisir un message pour l'avis.");
      return;
    }

    // Le contrôle du token est techniquement géré par l'intercepteur Axios,
    // mais cette vérification rapide est utile.
    if (!localStorage.getItem("accessToken")) {
      alert("Session expirée. Veuillez vous reconnecter.");
      navigate("/login");
      return;
    }

    const advicePayload = {
      // Nettoyage de l'objet pour l'envoi
      message: advice.message.trim(),
      status: advice.status.trim() || "PENDING", // Valeur par défaut si vide
      // La date doit idéalement être gérée côté serveur pour l'exactitude,
      // mais on la garde ici pour respecter la structure initiale :
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      const response = await createAdvice(advicePayload);

      // Si l'appel API réussit (statut 2xx), la redirection est faite immédiatement :
      navigate("/myAdvices");
    } catch (err) {
      console.error("Erreur lors de la soumission de l'avis:", err);

      // 🚩 Gestion détaillée de l'erreur pour le débogage
      const apiError = err.response?.data?.message || err.message;

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError(
          "Session expirée ou droits insuffisants. L'avis n'a pas été créé."
        );
        // Redirection vers le login si le refresh token a échoué (géré par l'intercepteur)
      } else {
        setError(
          `Une erreur est survenue lors de l'enregistrement. Détails : ${apiError}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToAdvices = () => {
    navigate("/myAdvices");
  };

  return (
    <>
      <div className="advice-page-layout">
        <div className="advice-main-content">
          <button
            className="btn-back-to-list"
            onClick={handleGoToAdvices}
            title="Voir mes avis"
          >
            <FaListUl /> Mes Avis
          </button>

          <h2 className="page-title-icon">
            <FaPaperPlane className="header-icon" /> Créer un Avis
          </h2>

          {/* ❌ Affichage de l'erreur */}
          {error && <div className="alert alert-error">{error}</div>}

          <form className="advice-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="message">
                <FaCommentDots className="label-icon" /> Message *
              </label>
              <textarea
                id="message"
                placeholder="Décrivez clairement votre avis..."
                value={advice.message}
                onChange={(e) =>
                  setAdvice({ ...advice, message: e.target.value })
                }
                rows="6"
                maxLength="500"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="status">
                <FaRegClock className="label-icon" /> Statut (facultatif)
              </label>
              <input
                id="status"
                type="text"
                placeholder="Ex : En attente, Traité..."
                value={advice.status}
                onChange={(e) =>
                  setAdvice({ ...advice, status: e.target.value })
                }
              />
            </div>

            <button
              className="btn-save btn-icon"
              type="submit"
              disabled={loading}
            >
              <FaSave /> {loading ? "Envoi..." : "Enregistrer"}
            </button>
          </form>
        </div>

        <aside className="advice-sidebar">
          <h3>
            <FaLightbulb /> Guide
          </h3>
          <p>
            Rédigez un avis clair et utile. Le message ne doit pas dépasser 500
            caractères.
          </p>

          <h4>
            <FaListUl /> Règles
          </h4>
          <ul>
            <li>Le message est obligatoire.</li>
            <li>Le statut par défaut sera *En attente*.</li>
            <li>Évitez les informations personnelles.</li>
          </ul>

          <h4>
            <FaQuoteRight /> Exemple :
          </h4>
          <blockquote className="example-block">
            "L'interface mobile est coupée sur la page de profil. J'ai le
            statut: En attente."
          </blockquote>

          <p className="contact-help">
            <FaQuestionCircle /> Besoin d’aide ? Contactez le support.
          </p>
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default AdviceCreate;
