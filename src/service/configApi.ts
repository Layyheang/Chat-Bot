import axios from "axios";

// Backend API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 
    "Content-Type": "application/json",
  },
  withCredentials: true // Enable sending cookies and auth headers
});

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    config.headers["Access-Control-Allow-Credentials"] = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Auto Refresh Token (EXCLUDING LOGIN REQUESTS)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retry && error.response?.status === 401) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refresh_token: refreshToken },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            }
          }
        );

        // Update new tokens
        const newAccessToken = refreshResponse.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        
        // Update Authorization header
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API Calls
export const AuthAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (username: string, email: string, password: string) =>
    api.post("/auth/register", { username, email, password }),
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  },
};

export default api;