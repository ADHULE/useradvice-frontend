// /api/oauthApi.js
import useAxios from "../hooks/useAxios";

const api = useAxios();

// Social login
export const loginWithGoogle = (token) => api.post("/auth/google", { token });

export const loginWithGithub = (code) => api.post("/auth/github", { code });

export const loginWithFacebook = (accessToken) =>
  api.post("/auth/facebook", { accessToken });
