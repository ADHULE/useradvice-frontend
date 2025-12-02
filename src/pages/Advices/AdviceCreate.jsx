import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";

// IMPORTER LES ICÔNES REACT
import {
  FaPaperPlane, // Pour le titre ou l'action principale
  FaCommentDots, // Pour le champ message
  FaRegClock, // Pour le champ statut
  FaSave, // Pour le bouton Enregistrer
  FaLightbulb, // Pour le titre de la sidebar
  FaListUl, // Pour les règles
  FaQuoteRight, // Pour la citation
  FaQuestionCircle, // Pour l'aide
} from "react-icons/fa";

// Simulation API (remplace avec ton axios ou instance réelle)
const api = {
  post: (url, data) => {
    return new Promise((resolve) => {
      console.log(`POST to ${url}:`, data);
      setTimeout(resolve, 500);
    });
  },
};

const AdviceCreate = () => {
  const navigate = useNavigate();

  const [advice, setAdvice] = useState({
    message: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation simple pour s'assurer que le message n'est pas vide
    if (!advice.message.trim()) {
      alert("Veuillez saisir un message pour l'avis.");
      return;
    }

    // Ajouter la date de création automatiquement
    const adviceWithDate = {
      ...advice,
      createdAt: new Date().toISOString(),
      // Assigner l'utilisateur si nécessaire (dépend de votre structure d'API/auth)
      // userId: currentUserId,
    };

    api
      .post("/advices", adviceWithDate)
      .then(() => {
        alert("Avis soumis avec succès !");
        navigate("/advices");
      })
      .catch((err) =>
        console.error("Erreur lors de la soumission de l'avis:", err)
      );
  };

  return (
    <>
      <div className="advice-page-layout">
        {/* --- FORMULAIRE --- */}
        <div className="advice-main-content">
          {/* Titre avec Icône */}
          <h2 className="page-title-icon">
            <FaPaperPlane className="header-icon" /> Créer un avis
          </h2>

          <form className="advice-form" onSubmit={handleSubmit}>
            {/* Champ Message */}
            <div className="form-group">
              {/* Label avec Icône */}
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
              {/* Label avec Icône */}
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

            {/* Bouton de soumission avec Icône */}
            <button className="btn-save btn-icon" type="submit">
              <FaSave /> Enregistrer l'avis
            </button>
          </form>
        </div>

        {/* --- SIDEBAR --- */}
        <aside className="advice-sidebar">
          {/* Titre de la Sidebar avec Icône */}
          <h3>
            <FaLightbulb /> Guide de création
          </h3>
          <p>Rédigez un avis clair, utile et orienté vers une amélioration.</p>

          {/* Règles à suivre avec Icône */}
          <h4>
            <FaListUl /> Règles à suivre
          </h4>
          <ul>
            <li>Le message est **obligatoire**.</li>
            <li>Évitez les informations personnelles.</li>
            <li>Utilisez un ton professionnel.</li>
            <li>Le statut est modifiable plus tard.</li>
          </ul>

          {/* Exemple avec Icône */}
          <h4>
            <FaQuoteRight /> Exemple :
          </h4>
          <blockquote className="example-block">
            "Le tableau de bord met du temps à charger, merci de vérifier
            l’optimisation."
          </blockquote>

          {/* Aide et contact avec Icône */}
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
