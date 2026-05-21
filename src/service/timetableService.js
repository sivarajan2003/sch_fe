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
   TIMETABLE APIs
---------------------------------------- */

// GET ALL
// GET ALL
export const getAllTimetables = async (params = {}) => {
  const res = await api.get(
    "/school/timetable",
    { params }
  );

  return res.data;
};

// GET BY ID
export const getTimetableById = async (id) => {
  const res = await api.get(
    `/school/timetable/${id}`
  );

  return res.data;
};

// CREATE
export const createTimetable = async (payload) => {
  const res = await api.post(
    "/school/timetable",
    payload
  );

  return res.data;
};

// UPDATE
export const updateTimetable = async (id, payload) => {
  const res = await api.put(
    `/school/timetable/${id}`,
    payload
  );

  return res.data;
};

// DELETE
export const deleteTimetable = async (id) => {
  const res = await api.delete(
    `/school/timetable/${id}`
  );

  return res.data;
};

export default {
  getAllTimetables,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
};