// Service pour gérer les tokens JWT dans localStorage
class TokenService {
  accessToken = null;
  expiresAt = null;

  // Charger les valeurs depuis localStorage
  loadFromStorage() {
    this.accessToken = localStorage.getItem("accessToken");
    this.expiresAt = localStorage.getItem("expiresAt");
  }

  // Sauvegarder un nouveau token
  save(token, expiresAt) {
    this.accessToken = token;
    this.expiresAt = expiresAt;

    localStorage.setItem("accessToken", token);
    localStorage.setItem("expiresAt", expiresAt);
  }

  // Supprimer toutes les infos liées à l’authentification
  clear() {
    this.accessToken = null;
    this.expiresAt = null;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("user");
  }

  // Vérifier si le token est expiré
  isExpired() {
    if (!this.expiresAt) return true;
    return Date.now() >= new Date(this.expiresAt).getTime();
  }

  // Récupérer le token courant
  getAccessToken() {
    return this.accessToken || localStorage.getItem("accessToken");
  }
}

export default new TokenService();
