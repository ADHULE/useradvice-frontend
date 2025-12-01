import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useAxios from "./useAxios";

const useAuth = () => {
  const api = useAxios();
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.error("Erreur récupération utilisateur:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return { user, token, login, logout };
};

export default useAuth;
