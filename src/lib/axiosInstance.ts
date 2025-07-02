import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lingstitute-server.onrender.com", // ✅ Correct Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Intercept requests to include token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("Admintoken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }

  return config;
});

export default axiosInstance;
