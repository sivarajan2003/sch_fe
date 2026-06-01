//dashboardservice.js
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

const getDashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};

export default {
  getDashboardStats,
};