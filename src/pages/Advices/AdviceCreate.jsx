import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";

// Icônes React
import {
  FaPaperPlane,
  FaCommentDots,
  FaRegClock,
  FaSave,
  FaLightbulb,
  FaListUl,
  FaQuoteRight,
  FaQuestionCircle,
} from "react-icons/fa";

// Simulation API (remplace avec axios ou ton instance réelle)
const api = {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      console.log(`POST to ${url}:`, data);
      setTimeout(() => resolve({ status: 200 }), 500);
    });
  },
};

const AdviceCreate = () => {
  const navigate = useNavigate();

  const [advice, setAdvice] = useState({
    message: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!advice.message.trim()) {
      alert("Veuillez saisir un message pour l'avis.");
      return;
    }

    const adviceWithDate = {
      ...advice,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await api.post("/advices", adviceWithDate);
      alert("Avis soumis avec succès !");
      navigate("/advices");
    } catch (err) {
      console.error("Erreur lors de la soumission de l'avis:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="advice-page-layout">
        {/* --- FORMULAIRE --- */}
        <div className="advice-main-content">
          <h2 className="page-title-icon">
            <FaPaperPlane className="header-icon" /> Créer un avis
          </h2>

          <form className="advice-form" onSubmit={handleSubmit}>
            {/* Champ Message */}
            <div className="form-group">
              <label htmlFor="message">
                <FaCommentDots className="label-icon" /> Message de l'avis *
              </label>
              <textarea
                id="message"
                placeholder="Décrivez clairement votre avis ou suggestion (max. 500 caractères)..."
                value={advice.message}
                onChange={(e) =>
                  setAdvice({ ...advice, message: e.target.value })
                }
                rows="6"
                maxLength="500"
                required
              ></textarea>
            </div>

            {/* Champ Statut */}
            <div className="form-group">
              <label htmlFor="status">
                <FaRegClock className="label-icon" /> Statut (optionnel)
              </label>
              <input
                id="status"
                type="text"
                placeholder="Ex: En attente, Traité..."
                value={advice.status}
                onChange={(e) =>
                  setAdvice({ ...advice, status: e.target.value })
                }
              />
            </div>

            {/* Bouton de soumission */}
            <button
              className="btn-save btn-icon"
              type="submit"
              disabled={loading}
            >
              <FaSave /> {loading ? "Envoi en cours..." : "Enregistrer l'avis"}
            </button>
          </form>
        </div>

        {/* --- SIDEBAR --- */}
        <aside className="advice-sidebar">
          <h3>
            <FaLightbulb /> Guide de création
          </h3>
          <p>Rédigez un avis clair, utile et orienté vers une amélioration.</p>

          <h4>
            <FaListUl /> Règles à suivre
          </h4>
          <ul>
            <li>
              Le message est <strong>obligatoire</strong>.
            </li>
            <li>Évitez les informations personnelles.</li>
            <li>Utilisez un ton professionnel.</li>
            <li>Le statut est modifiable plus tard.</li>
          </ul>

          <h4>
            <FaQuoteRight /> Exemple :
          </h4>
          <blockquote className="example-block">
            "Le tableau de bord met du temps à charger, merci de vérifier
            l’optimisation."
          </blockquote>

          <p className="contact-help">
            <FaQuestionCircle /> Besoin d'aide ? Contactez le support.
          </p>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default AdviceCreate;
