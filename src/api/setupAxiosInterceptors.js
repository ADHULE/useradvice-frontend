let interceptorsSet = false;

export default function setupAxiosInterceptors(
  apiInstance,
  { getToken, clearToken }
) {
  if (interceptorsSet) return;
  interceptorsSet = true;

  apiInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        clearToken();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}
