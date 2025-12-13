// api/setupAxiosInterceptors.js

let interceptorsInitialized = false;

export default function setupAxiosInterceptors(
  apiInstance,
  { onUnauthorized }
) {
  if (interceptorsInitialized) return;
  interceptorsInitialized = true;

  apiInstance.interceptors.response.use(
    // Réponse OK
    (response) => response,

    // Gestion des erreurs
    (error) => {
      // Erreur réseau ou timeout
      if (!error.response) {
        console.error("Erreur réseau ou serveur injoignable");
        return Promise.reject({
          message:
            "Impossible de contacter le serveur. Vérifiez votre connexion.",
          originalError: error,
        });
      }

      const status = error.response.status;

      switch (status) {
        case 401:
        case 403:
          console.warn("Non autorisé (401/403)");
          if (typeof onUnauthorized === "function") {
            onUnauthorized();
          }
          break;

        case 400:
          console.warn("Requête invalide");
          break;

        case 404:
          console.warn("Ressource introuvable");
          break;

        case 500:
          console.error("Erreur interne du serveur");
          break;

        default:
          console.error("Erreur inconnue :", status);
      }

      return Promise.reject(error);
    }
  );
}
