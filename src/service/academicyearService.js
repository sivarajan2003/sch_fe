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
   Academic Year Services
---------------------------------------- */

/**
 * Create Academic Year
 * POST /academicyear
 */
export const createAcademicyear = async (payload) => {
  const res = await api.post("/school/academicyear", payload);
  return res.data;
};

/**
 * Get Academic Years (List + Filters)
 * GET /academicyear
 *
 * params:
 *  - page
 *  - limit
 *  - search
 *  - startDate
 *  - endDate
 *  - is_active
 *  - includeAudit
 *  - includeDeleted
 *  - filters
 *  - order
 */
export const getAcademicyears = async (params = {}) => {
  const res = await api.get("/school/academicyear", { params });
  return res.data;
};

/**
 * Get Academic Year by ID
 * GET /academicyear/:id
 */
export const getAcademicyearById = async (id) => {
  if (!id) throw new Error("Academicyear ID is required");
  const res = await api.get(`/school/academicyear/${id}`);
  return res.data;
};

/**
 * Update Academic Year (PUT)
 * PUT /academicyear/:id
 */
export const updateAcademicyear = async (id, payload) => {
  if (!id) throw new Error("Academicyear ID is required");
  const res = await api.put(`/school/academicyear/${id}`, payload);
  return res.data;
};

/**
 * Patch Academic Year (PATCH)
 * PATCH /academicyear/:id
 */
export const patchAcademicyear = async (id, payload) => {
  if (!id) throw new Error("Academicyear ID is required");
  const res = await api.patch(`/school/academicyear/${id}`, payload);
  return res.data;
};

/**
 * Soft Delete Academic Year
 * DELETE /academicyear/:id
 * (Super Admin only)
 */
export const deleteAcademicyear = async (id) => {
  if (!id) throw new Error("Academicyear ID is required");
  const res = await api.delete(`/school/academicyear/${id}`);
  return res.data;
};

/**
 * Restore Academic Year
 * PATCH /academicyear/:id/restore
 * (Super Admin only)
 */
export const restoreAcademicyear = async (id) => {
  if (!id) throw new Error("Academicyear ID is required");
  const res = await api.patch(`/school/academicyear/${id}/restore`);
  return res.data;
};

/* ----------------------------------------
   Export Default
---------------------------------------- */
export default {
  createAcademicyear,
  getAcademicyears,
  getAcademicyearById,
  updateAcademicyear,
  patchAcademicyear,
  deleteAcademicyear,
  restoreAcademicyear,
};
