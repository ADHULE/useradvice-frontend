import apiInstance from "./apiInstance";

export const getDashboardStats = () => {
  return apiInstance.get("/dashboard/stats");
};
