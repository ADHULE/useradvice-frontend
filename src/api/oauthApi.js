import apiInstance from "./apiInstance";

export const loginWithGoogle = () => apiInstance.get("/auth/google");
export const loginWithGithub = () => apiInstance.get("/auth/github");
export const loginWithFacebook = () => apiInstance.get("/auth/facebook");

export const oauth2Redirect = (provider) =>
  apiInstance.get(`/oauth2/authorization/${provider}`);

// Fonction utilitaire pour gérer la redirection
export const handleOAuthRedirect = (provider) => {
  switch (provider) {
    case "google":
      return loginWithGoogle();
    case "github":
      return loginWithGithub();
    case "facebook":
      return loginWithFacebook();
    default:
      return oauth2Redirect(provider);
  }
};
