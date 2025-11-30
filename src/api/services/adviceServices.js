import Alert from "../../components/ui/Alert";
import axiosConfig from "../axiosConfig"; // Import de la configuration Axios

const api = axiosConfig();

//  Créer un avis
export const createAdvice = async (advice) => {
  try {
    const response = await api.post("/advices", advice);
    return response.data;
  } catch (error) {
    Alert("Erreur createAdvice :", error);
    throw error;
  }
};

// Récupérer tous les avis d’un utilisateur

export const getUserAdvices = async (userId) => {
  try {
    const response = await api.get(`/advices/user/${userId}`);
    return response.data;
  } catch (error) {
    Alert("Erreur getUserAdvices :", error);
    throw error;
  }
};

//  Mettre à jour un avis
export const updateAdvice = async (adviceId, updatedAdvice) => {
  try {
    const response = await api.put(`/advices/${adviceId}`, updatedAdvice);
    return response.data;
  } catch (error) {
    Alert("Erreur updateAdvice :", error);
    throw error;
  }
};

// Supprimer un avis
export const deleteAdvice = async (adviceId) => {
  try {
    const response = await api.delete(`/advices/${adviceId}`);
    return response.data;
  } catch (error) {
    Alert("Erreur deleteAdvice :", error);
    throw error;
  }
};
