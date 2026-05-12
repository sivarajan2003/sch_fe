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

/**
 * GET ALL TIMETABLES
 * GET /timetable
 */
export const getAllTimetables = async (params = {}) => {
  const res = await api.get("/timetable", {
    params,
  });

  return res.data;
};

/**
 * GET TIMETABLE BY ID
 * GET /timetable/:id
 */
export const getTimetableById = async (id) => {
  const res = await api.get(`/timetable/${id}`);

  return res.data;
};

/**
 * CREATE TIMETABLE
 * POST /timetable
 */
export const createTimetable = async (payload) => {
  const res = await api.post(
    "/timetable",
    payload
  );

  return res.data;
};

/**
 * UPDATE TIMETABLE
 * PUT /timetable/:id
 */
export const updateTimetable = async (
  id,
  payload
) => {
  const res = await api.put(
    `/timetable/${id}`,
    payload
  );

  return res.data;
};

/**
 * DELETE TIMETABLE
 * DELETE /timetable/:id
 */
export const deleteTimetable = async (id) => {
  const res = await api.delete(
    `/timetable/${id}`
  );

  return res.data;
};

/* ----------------------------------------
   EXPORT
---------------------------------------- */

export default {
  getAllTimetables,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
};