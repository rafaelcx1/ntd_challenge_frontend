import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_END_POINT
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  config.headers.set("X-Timezone", timezone)

  return config;
});

export { api };
