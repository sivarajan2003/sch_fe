import axios from "axios";
import BASE_API from "../api/baseurl";
import { getAccessToken } from "../utils/token";

/* ----------------------------------------
   Axios Instance
---------------------------------------- */
const api = axios.create({
  baseURL: BASE_API,
  // Content-Type auto-handled (JSON / FormData)
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
   Admission APIs
---------------------------------------- */

/**
 * CREATE ADMISSION
 * POST /admission/admissions
 * @param {FormData} payload
 */
export const createAdmission = async (payload) => {
  const res = await api.post("/admission/admissions", payload);
  return res.data;
};

/**
 * GET ADMISSIONS (LIST + FILTER)
 * GET /admission/admissions
 */
export const getAdmissions = async (params = {}) => {
  const res = await api.get("/admission/admissions", { params });
  return res.data;
};

/**
 * GET ADMISSION STATS
 * GET /admission/stats
 */
export const getAdmissionStats = async (params = {}) => {
  const res = await api.get("/admission/stats", { params });
  return res.data;
};

/**
 * GET ADMISSION BY ID
 * GET /admission/admissions/:id
 */
export const getAdmissionById = async (id) => {
  const res = await api.get(`/admission/admissions/${id}`);
  return res.data;
};

/**
 * UPDATE ADMISSION (GENERAL UPDATE)
 * PUT /admission/admissions/:id
 */
export const updateAdmission = async (id, data) => {
  const res = await api.put(`/admission/admissions/${id}`, data);
  return res.data;
};

/**
 * VERIFY ADMISSION DOCUMENTS ✅ (NEW)
 * PATCH /admission/admissions/:id/documents
 *
 * @param {string} id
 * @param {Object} payload
 *
 * payload example:
 * {
 *   birth_certificate_status: "Verified",
 *   birth_certificate_remarks: "Clear",
 *   tc_certificate_status: "Rejected",
 *   tc_certificate_remarks: "Missing seal"
 * }
 */
export const verifyAdmissionDocuments = async (id, payload) => {
  const res = await api.patch(
    `/admission/admissions/${id}/documents`,
    payload
  );
  return res.data;
};

/**
 * DELETE ADMISSION (SOFT DELETE)
 * DELETE /admission/admissions/:id
 */
export const deleteAdmission = async (id) => {
  const res = await api.delete(`/admission/admissions/${id}`);
  return res.data;
};

/**
 * GET SEAT ALLOCATION STATS
 * GET /admission/seat-allocation
 */
export const getSeatAllocation = async () => {
  const res = await api.get("/admission/seat-allocation");
  return res.data;
};

/* ----------------------------------------
   EXPORTS
---------------------------------------- */
export default {
  createAdmission,
  getAdmissions,
  getAdmissionStats,
  getAdmissionById,
  updateAdmission,
  verifyAdmissionDocuments, // 👈 NEW
  deleteAdmission,
  getSeatAllocation,
};
