// /api/userApi.js
import useAxios from "../hooks/useAxios";

const api = useAxios();

export const getMe = () => api.get("/me"); // si endpoint disponible
