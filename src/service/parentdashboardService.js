// src/service/parentdashboardService.js
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
   Parent Dashboard API
---------------------------------------- */

/**
 * PARENT DASHBOARD
 * GET /dashboard
 *
 * Response:
 * [
 *   {
 *     admission_id,
 *     student_name,
 *     applicationStatus,
 *     documentVerification,
 *     interview: {
 *       status,
 *       date,
 *       time
 *     }
 *   }
 * ]
 */
export const getParentDashboard = async () => {
  const res = await api.get("/parent/dashboard");
  return res.data;
};

/* ----------------------------------------
   EXPORT
---------------------------------------- */
export default {
  getParentDashboard,
};
