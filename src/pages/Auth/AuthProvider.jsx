import { createContext, useContext } from "react";
import { goToPath } from "../../components/navigation/goToPath";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    goToPath("/");
  };

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
