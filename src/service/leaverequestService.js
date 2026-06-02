//leaverequestservice.js
import axios from "axios";
import BASE_API from "../api/baseurl";
import { getAccessToken } from "../utils/token";

const api = axios.create({
  baseURL: BASE_API,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= GET LEAVES ================= */

export const getLeaves = async () => {
  const res = await api.get(
    "/leave-requests"
  );
  return res.data;
};

/* ================= APPROVE ================= */

export const approveLeave = async (id) => {
  const res = await api.patch(
    `/leave/leave-requests/${id}/approve`
  );

  return res.data;
};

/* ================= REJECT ================= */

export const rejectLeave = async (id) => {
  const res = await api.patch(
    `/leave/leave-requests/${id}/reject`
  );

  return res.data;
};

export default {
  getLeaves,
  approveLeave,
  rejectLeave,
};