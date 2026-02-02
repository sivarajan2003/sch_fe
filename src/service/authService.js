import axios from "axios";
import BASE_API from "../api/baseurl";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/token";

/* ----------------------------------------
   Axios Instance
---------------------------------------- */
const api = axios.create({
  baseURL: `${BASE_API}/adminuser`,
  headers: {
    "Content-Type": "application/json",
  },
});

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

    if (
      error.response?.status === 401 &&
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

/* ----------------------------------------
   Auth Services
---------------------------------------- */


export const login = async (payload) => {
  const res = await api.post("/login", payload);

  // ✅ Your backend response is FLAT
  const { accessToken, refreshToken, user } = res.data;

  if (!accessToken) {
    throw new Error("Access token missing in login response");
  }

  // store tokens
  setTokens({ accessToken, refreshToken });

  // return normalized result
  return {
    accessToken,
    refreshToken,
    user,
    raw: res.data,
  };
};

/**
 * Refresh Token
 * POST /refresh-token
 */
export const refreshToken = async () => {
  const res = await api.post("/refresh-token", {
    refreshToken: getRefreshToken(),
  });
  setTokens(res.data.data);
  return res.data;
};

/**
 * Get Logged-in User
 * GET /me
 */
export const getMe = async () => {
  const res = await api.get("/me");
  return res.data;
};

/**
 * Logout
 * POST /logout
 */
export const logout = async () => {
  await api.post("/logout");
  clearTokens();
};

/**
 * Change Password
 * POST /change-password
 */
export const changePassword = async (payload) => {
  const res = await api.post("/change-password", payload);
  return res.data;
};

/* ----------------------------------------
   Admin User Management (Super Admin)
---------------------------------------- */

/**
 * Get all admin users
 * GET /
 */
export const getAdminUsers = async (params = {}) => {
  const res = await api.get("/", { params });
  return res.data;
};

/**
 * Create admin user
 * POST /
 */
export const createAdminUser = async (payload) => {
  const res = await api.post("/", payload);
  return res.data;
};

/**
 * Get admin user by ID
 * GET /:id
 */
export const getAdminUserById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

/**
 * Update admin user (PUT)
 * PUT /:id
 */
export const updateAdminUser = async (id, payload) => {
  const res = await api.put(`/${id}`, payload);
  return res.data;
};

/**
 * Patch admin user (PATCH)
 * PATCH /:id
 */
export const patchAdminUser = async (id, payload) => {
  const res = await api.patch(`/${id}`, payload);
  return res.data;
};

/**
 * Delete admin user
 * DELETE /:id
 */
export const deleteAdminUser = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

/**
 * Restore admin user
 * POST /:id/restore
 */
export const restoreAdminUser = async (id) => {
  const res = await api.post(`/${id}/restore`);
  return res.data;
};

export default {
  login,
  refreshToken,
  getMe,
  logout,
  changePassword,
  getAdminUsers,
  createAdminUser,
  getAdminUserById,
  updateAdminUser,
  patchAdminUser,
  deleteAdminUser,
  restoreAdminUser,
};

