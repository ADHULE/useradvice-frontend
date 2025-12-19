// src/utils/notifications.js
import { toast } from "react-hot-toast";
import useLanguage from "../hooks/useLanguage";

export const useLocalizedToast = () => {
  const { t } = useLanguage();

  const showSuccess = (messageKey, params = {}) => {
    toast.success(t(messageKey, params), {
      style: {
        background: "var(--color-success)",
        color: "white",
      },
    });
  };

  const showError = (messageKey, params = {}) => {
    toast.error(t(messageKey, params), {
      style: {
        background: "var(--color-error)",
        color: "white",
      },
    });
  };

  const showInfo = (messageKey, params = {}) => {
    toast(t(messageKey, params), {
      style: {
        background: "var(--color-info)",
        color: "white",
      },
    });
  };

  return { showSuccess, showError, showInfo };
};

// Dans votre hook useLanguage.js, ajoutez ces messages :
const translations = {
  fr: {
    // ... vos traductions existantes

    // Messages de succès
    "success.saved": "✅ Enregistré avec succès",
    "success.deleted": "🗑️ Supprimé avec succès",
    "success.updated": "🔄 Mis à jour avec succès",

    // Messages d'erreur
    "error.required": "❌ Ce champ est requis",
    "error.invalidEmail": "📧 Email invalide",
    "error.network": "🌐 Erreur de connexion",

    // Messages d'information
    "info.loading": "⏳ Chargement en cours...",
    "info.noData": "📭 Aucune donnée disponible",
  },

  en: {
    // ... vos traductions existantes

    "success.saved": "✅ Successfully saved",
    "success.deleted": "🗑️ Successfully deleted",
    "success.updated": "🔄 Successfully updated",

    "error.required": "❌ This field is required",
    "error.invalidEmail": "📧 Invalid email",
    "error.network": "🌐 Connection error",

    "info.loading": "⏳ Loading...",
    "info.noData": "📭 No data available",
  },
  // ... autres langues
};
