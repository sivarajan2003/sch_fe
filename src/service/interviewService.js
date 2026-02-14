import axios from "axios";
import BASE_API from "../api/baseurl";
import { getAccessToken } from "../utils/token";

/* ----------------------------------------
   Axios Instance
---------------------------------------- */
const api = axios.create({
  baseURL: BASE_API,
});

/* ----------------------------------------
   Attach Access Token
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

/* ========================================
   INTERVIEW APIs
======================================== */

/**
 * CREATE INTERVIEW
 * POST /interviews
 */
export const createInterview = async (payload) => {
  const res = await api.post("/interviews", payload);
  return res.data;
};

/**
 * GET INTERVIEWS LIST
 * GET /interviews
 */
export const getInterviews = async (params = {}) => {
  const res = await api.get("/interviews", { params });
  return res.data;
};

/**
 * GET INTERVIEW BY ID
 * GET /interviews/:id
 */
export const getInterviewById = async (id) => {
  const res = await api.get(`/interviews/${id}`);
  return res.data;
};

/**
 * UPDATE INTERVIEW
 * PUT /interviews/:id
 */
export const updateInterview = async (id, data) => {
  const res = await api.put(`/interviews/${id}`, data);
  return res.data;
};

/**
 * UPDATE INTERVIEW STATUS
 * PATCH /interviews/:id/status
 */
export const updateInterviewStatus = async (id, payload) => {
  const res = await api.patch(`/interviews/${id}/status`, payload);
  return res.data;
};

/**
 * VERIFY DOCUMENTS
 * PATCH /interviews/:id/documents
 */
export const verifyInterviewDocuments = async (id, payload) => {
  const res = await api.patch(`/interviews/${id}/documents`, payload);
  return res.data;
};

/**
 * DELETE INTERVIEW
 * DELETE /interviews/:id
 */
export const deleteInterview = async (id) => {
  const res = await api.delete(`/interviews/${id}`);
  return res.data;
};

/**
 * RESTORE INTERVIEW
 * PATCH /interviews/:id/restore
 */
export const restoreInterview = async (id) => {
  const res = await api.patch(`/interviews/${id}/restore`);
  return res.data;
};

/* ----------------------------------------
   EXPORT
---------------------------------------- */
export default {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  updateInterviewStatus,
  verifyInterviewDocuments,
  deleteInterview,
  restoreInterview,
};
