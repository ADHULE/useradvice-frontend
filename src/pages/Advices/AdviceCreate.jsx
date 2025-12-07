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
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { createAdvice } from "../../api/adviceApi";
import { goToPath } from "../../components/navigation/goToPath";

const AdviceCreate = () => {
  const [advice, setAdvice] = useState({
    message: "",
    status: "PENDING",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!advice.message.trim()) {
      setError("Veuillez saisir un message pour l'avis.");
      return;
    }

    if (!localStorage.getItem("accessToken")) {
      alert("Session expirée. Veuillez vous reconnecter.");
      goToPath("/login");
      return;
    }

    const advicePayload = {
      message: advice.message.trim(),
      status: advice.status.trim() || "PENDING",
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await createAdvice(advicePayload);
      goToPath("/myAdvices");
    } catch (err) {
      console.error("Erreur lors de la soumission de l'avis:", err);
      const apiError = err.response?.data?.message || err.message;

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError(
          "Session expirée ou droits insuffisants. L'avis n'a pas été créé."
        );
        goToPath("/login");
      } else {
        setError(
          `Une erreur est survenue lors de l'enregistrement. Détails : ${apiError}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="advice-page-layout">
        <div className="advice-main-content">
          <div className="nav-buttons">
            <button
              className="btn-back-previous"
              onClick={() => goToPath("/createReviewPage")}
              title="Retour à la page précédente"
            >
              <FaArrowLeft /> Page précédente
            </button>

            <button
              className="btn-back-to-list"
              onClick={() => goToPath("/myAdvices")}
              title="Voir mes avis"
            >
              <FaArrowRight /> Retour à Mes Avis
            </button>
          </div>

          <h2 className="page-title-icon">
            <FaPaperPlane className="header-icon" /> Créer un Avis
          </h2>

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
            <li>
              Le statut par défaut sera <strong>En attente</strong>.
            </li>
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
