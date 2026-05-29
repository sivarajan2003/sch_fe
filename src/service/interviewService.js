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
 * POST /admission/interviews
 */
export const createInterview = async (payload) => {
  const res = await api.post("/admission/interviews", payload);
  return res.data;
};

/**
 * GET INTERVIEWS LIST
 * GET /admission/interviews
 */
export const getInterviews = async (params = {}) => {
  const res = await api.get("/admission/interviews", { params });
  return res.data;
};

/**
 * GET INTERVIEW BY ID
 * GET /admission/interviews/:id
 */
export const getInterviewById = async (id) => {
  const res = await api.get(`/admission/interviews/${id}`);
  return res.data;
};

/**
 * UPDATE INTERVIEW
 * PUT /admission/interviews/:id
 */
export const updateInterview = async (id, data) => {
  const res = await api.put(`/admission/interviews/${id}`, data);
  return res.data;
};

/**
 * UPDATE INTERVIEW STATUS
 * PATCH /admission/interviews/:id/status
 */
export const updateInterviewStatus = async (id, payload) => {
  const res = await api.patch(`/admission/interviews/${id}/status`, payload);
  return res.data;
};

/**
 * VERIFY DOCUMENTS
 * PATCH /admission/interviews/:id/documents
 */
export const verifyInterviewDocuments = async (id, payload) => {
  const res = await api.patch(`/admission/interviews/${id}/documents`, payload);
  return res.data;
};

/**
 * DELETE INTERVIEW
 * DELETE /admission/interviews/:id
 */
export const deleteInterview = async (id) => {
  const res = await api.delete(`/admission/interviews/${id}`);
  return res.data;
};

/**
 * RESTORE INTERVIEW
 * PATCH /admission/interviews/:id/restore
 */
export const restoreInterview = async (id) => {
  const res = await api.patch(`/admission/interviews/${id}/restore`);
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
