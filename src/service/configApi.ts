import axios from "axios";

// ✅ Backend API Base URL
const API_BASE_URL = "http://localhost:8000";

// ✅ Create Axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" }
});

// ✅ Request Interceptor: Attach Access Token
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Auto Refresh Token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log("Access token expired. Attempting to refresh...");
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) {
                    throw new Error("No refresh token found");
                }

                const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
                    refresh_token: refreshToken,
                });

                // ✅ Update new tokens
                localStorage.setItem("access_token", refreshResponse.data.access_token);
                error.config.headers["Authorization"] = `Bearer ${refreshResponse.data.access_token}`;

                // ✅ Retry original request
                return api(error.config);
            } catch (refreshError) {
                console.error("Refresh token failed. Logging out...");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// ✅ Auth API Calls
export const AuthAPI = {
    login: (email: string, password: string) => api.post("/auth/login", { email, password }),
    register: (username: string, email: string, password: string) => api.post("/auth/register", { username, email, password }),
    logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
    },
};

export default api;
