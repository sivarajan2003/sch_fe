// admissiondashboardService.js
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
   Admission Dashboard APIs
---------------------------------------- */

/**
 * DASHBOARD SUMMARY STATS
 * GET /admission/dashboard/stats
 *
 * Response:
 * {
 *   totalApplications,
 *   pendingDocuments,
 *   interviewsScheduled,
 *   enrolledStudents
 * }
 */
export const getDashboardStats = async () => {
  const res = await api.get("/admission/dashboard/stats");
  return res.data;
};

/**
 * ADMISSION FUNNEL
 * GET /admission/dashboard/funnel
 *
 * Response:
 * {
 *   Applied: number,
 *   Pending: number,
 *   Approved: number,
 *   "Interview Scheduled": number,
 *   Enrolled: number
 * }
 */
export const getAdmissionFunnel = async () => {
  const res = await api.get("/admission/dashboard/funnel");
  return res.data;
};

/**
 * CLASS CAPACITY
 * GET /admission/dashboard/class-capacity
 *
 * Response:
 * [
 *   {
 *     class_id,
 *     class_name,
 *     total,
 *     allocated,
 *     available,
 *     percent
 *   }
 * ]
 */
export const getClassCapacity = async () => {
  const res = await api.get("/admission/dashboard/class-capacity");
  return res.data;
};

/**
 * RECENT APPLICATIONS
 * GET /admission/dashboard/recent-applications
 *
 * @param {number} limit (optional)
 */
export const getRecentApplications = async (limit = 5) => {
  const res = await api.get("/admission/dashboard/recent-applications", {
    params: { limit },
  });
  return res.data;
};

/* ----------------------------------------
   EXPORTS
---------------------------------------- */
export default {
  getDashboardStats,
  getAdmissionFunnel,
  getClassCapacity,
  getRecentApplications,
};
