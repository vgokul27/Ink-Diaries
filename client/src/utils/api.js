import axios from "axios";
import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user, /* forceRefresh */ false);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
