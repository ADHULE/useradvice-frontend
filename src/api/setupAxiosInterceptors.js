// api/setupAxiosInterceptors.js

/**
 * Flag global pour éviter l'empilement des interceptors
 */
let interceptorsInitialized = false;

/**
 * Initialisation des interceptors Axios globaux
 *
 * ⚠️ IMPORTANT :
 * - Ne fait AUCUNE redirection
 * - Ne fait AUCUN logout
 * - Informe seulement via callback
 */
export default function setupAxiosInterceptors(
  apiInstance,
  { onUnauthorized } = {}
) {
  if (interceptorsInitialized) return;
  interceptorsInitialized = true;

  apiInstance.interceptors.response.use(
    /**
     * Réponse OK
     */
    (response) => response,

    /**
     * Gestion centralisée des erreurs HTTP
     */
    (error) => {
      // Erreur réseau / serveur inaccessible
      if (!error.response) {
        console.error("❌ Serveur injoignable");
        return Promise.reject({
          message:
            "Impossible de contacter le serveur. Vérifiez votre connexion.",
          originalError: error,
        });
      }

      const status = error.response.status;
      const currentPath = window.location.pathname;

      switch (status) {
        case 401:
        case 403:
          console.warn("⚠️ Accès non autorisé", status);

          /**
           * 🚫 Les routes publiques sont ignorées
           */
          const publicRoutes = ["/login", "/register", "/activateAccount"];

          if (!publicRoutes.includes(currentPath)) {
            onUnauthorized?.(error);
          }
          break;

        case 400:
          console.warn("⚠️ Requête invalide (400)");
          break;

        case 404:
          console.warn("⚠️ Ressource introuvable (404)");
          break;

        case 500:
          console.error("🔥 Erreur serveur (500)");
          break;

        default:
          console.error("❓ Erreur HTTP :", status);
      }

      return Promise.reject(error);
    }
  );
}
