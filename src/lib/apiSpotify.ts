import axios from "axios";
import useAccessToken from "../hooks/useAccessToken";
import { toast } from "react-toastify";

export const apiSpotify = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});
apiSpotify.interceptors.request.use((config) => {
  const accessToken = useAccessToken();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

apiSpotify.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      window.location.href = "/";
    }
    if (Array.isArray(error.response.data?.message)) {
      return toast.error(error.response.data?.message[0]);
    }
    toast.error(
      error.response.data?.message || error.message || "Erro inesperado"
    );
    return Promise.reject(error);
  }
);
