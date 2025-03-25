import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001", // ✅ Correct Backend URL
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
