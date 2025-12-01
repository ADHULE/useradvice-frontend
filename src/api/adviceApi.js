// /api/adviceApi.js
import useAxios from "../hooks/useAxios";

const api = useAxios();

export const getAllAdvices = () => api.get("/advices/all");
export const getAdviceById = (id) => api.get(`/advices/${id}`);
export const createAdvice = (data) => api.post("/advices", data);
export const updateAdvice = (id, data) =>
  api.put(`/advices/update/${id}`, data);
export const deleteAdvice = (id) => api.delete(`/advices/delete/${id}`);
