// /api/oauthApi.js
import apiInstance from "./useAxios";

// Social login
export const loginWithGoogle = (token) =>
  apiInstance.post("/auth/google", { token });

export const loginWithGithub = (code) =>
  apiInstance.post("/auth/github", { code });

export const loginWithFacebook = (accessToken) =>
  apiInstance.post("/auth/facebook", { accessToken });
