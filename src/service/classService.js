import axios from "axios";
import BASE_API from "../api/baseurl";
import { getAccessToken } from "../utils/token";

/* ----------------------------------------
   Axios Instance
---------------------------------------- */
const api = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
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
   Class Services
---------------------------------------- */

/**
 * Create Class
 * POST /class
 */
export const createClass = async (payload) => {
  const res = await api.post("/school/class", payload);
  return res.data;
};

/**
 * Get Classes (List + Filters + Pagination)
 * GET /class
 *
 * params:
 *  - page
 *  - limit
 *  - search
 *  - section
 *  - is_active
 *  - startDate
 *  - endDate
 *  - includeAudit
 *  - includeDeleted
 *  - includeStudents
 *  - filters
 *  - order
 */
export const getClasses = async (params = {}) => {
  const res = await api.get("/school/class", { params });
  return res.data;
};

/**
 * Get Class by ID
 * GET /class/:id
 */
export const getClassById = async (id) => {
  if (!id) throw new Error("Class ID is required");
  const res = await api.get(`/school/class/${id}`);
  return res.data;
};

/**
 * Update Class (PUT – full update)
 * PUT /class/:id
 */
export const updateClass = async (id, payload) => {
  if (!id) throw new Error("Class ID is required");
  const res = await api.put(`/class/${id}`, payload);
  return res.data;
};

/**
 * Patch Class (PATCH – partial update)
 * PATCH /class/:id
 */
export const patchClass = async (id, payload) => {
  if (!id) throw new Error("Class ID is required");
  const res = await api.patch(`/class/${id}`, payload);
  return res.data;
};

/**
 * Soft Delete Class
 * DELETE /class/:id
 * (Super Admin only)
 */
export const deleteClass = async (id) => {
  if (!id) throw new Error("Class ID is required");
  const res = await api.delete(`/class/${id}`);
  return res.data;
};

/**
 * Restore Class
 * PATCH /class/:id/restore
 * (Super Admin only)
 */
export const restoreClass = async (id) => {
  if (!id) throw new Error("Class ID is required");
  const res = await api.patch(`/class/${id}/restore`);
  return res.data;
};

/* ----------------------------------------
   Export Default
---------------------------------------- */
export default {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  patchClass,
  deleteClass,
  restoreClass,
};
