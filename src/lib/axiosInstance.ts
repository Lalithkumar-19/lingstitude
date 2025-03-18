import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001", // Set your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Set Authorization Token (if using authentication)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Example: Fetch token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
