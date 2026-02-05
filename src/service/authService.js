import api from "../api/client";
import {
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/token";

/* ----------------------------------------
   Auth Services
---------------------------------------- */

export const login = async (payload) => {
  const res = await api.post("/adminuser/login", payload);

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
  const res = await api.post("/adminuser/refresh-token", {
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
  const res = await api.get("/adminuser/me");
  return res.data;
};

/**
 * Logout
 * POST /logout
 */
export const logout = async () => {
  await api.post("/adminuser/logout");
  clearTokens();
};

/**
 * Change Password
 * POST /change-password
 */
export const changePassword = async (payload) => {
  const res = await api.post("/adminuser/change-password", payload);
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
  const res = await api.get("/adminuser/", { params });
  return res.data;
};

/**
 * Create admin user
 * POST /
 */
export const createAdminUser = async (payload) => {
  const res = await api.post("/adminuser/", payload);
  return res.data;
};

/**
 * Get admin user by ID
 * GET /:id
 */
export const getAdminUserById = async (id) => {
  const res = await api.get(`/adminuser/${id}`);
  return res.data;
};

/**
 * Update admin user (PUT)
 * PUT /:id
 */
export const updateAdminUser = async (id, payload) => {
  const res = await api.put(`/adminuser/${id}`, payload);
  return res.data;
};

/**
 * Patch admin user (PATCH)
 * PATCH /:id
 */
export const patchAdminUser = async (id, payload) => {
  const res = await api.patch(`/adminuser/${id}`, payload);
  return res.data;
};

/**
 * Delete admin user
 * DELETE /:id
 */
export const deleteAdminUser = async (id) => {
  const res = await api.delete(`/adminuser/${id}`);
  return res.data;
};

/**
 * Restore admin user
 * POST /:id/restore
 */
export const restoreAdminUser = async (id) => {
  const res = await api.post(`/adminuser/${id}/restore`);
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


