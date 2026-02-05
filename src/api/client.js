import axios from "axios";
import BASE_API from "./baseurl";
import {
    getAccessToken,
    getRefreshToken,
    setTokens,
    clearTokens,
} from "../utils/token";

const api = axios.create({
    baseURL: BASE_API,
    // Do not set Content-Type header to allow FormData to work by default
});

/* ----------------------------------------
   Request Interceptor (Attach Access Token)
---------------------------------------- */
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/* ----------------------------------------
   Response Interceptor (Refresh Token)
---------------------------------------- */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check for 401 (Unauthorized) or 403 (Forbidden) with specific message if needed
        // But typically token expiration returns 401. 
        // The user saw 403 "Invalid or expired token". Some backends use 403.
        // We should probably handle 403 as well if the message matches, 
        // but simply handling 401 is standard. 
        // If the backend returns 403 for expired token, we must handle it.
        // Let's assume for now we handle 401. If the user still gets 403, we might need to expand this.
        // UPDATE: User explicitly said "Status Code 403 Forbidden" and "message": "Invalid or expired token".
        // So we MUST handle 403 with this message.

        const isTokenError =
            error.response?.status === 401 ||
            (error.response?.status === 403 && error.response?.data?.message === "Invalid or expired token");

        if (
            isTokenError &&
            !originalRequest._retry &&
            getRefreshToken()
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    `${BASE_API}/adminusers/refresh-token`,
                    {
                        refreshToken: getRefreshToken(),
                    }
                );

                const { accessToken, refreshToken } = res.data.data;
                setTokens({ accessToken, refreshToken });

                api.defaults.headers.Authorization = `Bearer ${accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                processQueue(null, accessToken);

                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                clearTokens();
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
