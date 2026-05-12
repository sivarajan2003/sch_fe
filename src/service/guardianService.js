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
   Request Interceptor
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
   Guardian APIs
---------------------------------------- */

// GET ALL
export const getGuardians = async () => {
  const res = await api.get("/guardian");
  return res.data;
};

// GET BY ID
export const getGuardianById = async (id) => {
  const res = await api.get(`/guardian/${id}`);
  return res.data;
};

// CREATE
export const createGuardian = async (data) => {
  const res = await api.post("/guardian", data);
  return res.data;
};

// UPDATE
export const updateGuardian = async (id, data) => {
  const res = await api.put(`/guardian/${id}`, data);
  return res.data;
};

// DELETE
export const deleteGuardian = async (id) => {
  const res = await api.delete(`/guardian/${id}`);
  return res.data;
};

export default {
  getGuardians,
  getGuardianById,
  createGuardian,
  updateGuardian,
  deleteGuardian,
};