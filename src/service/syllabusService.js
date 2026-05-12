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

    const token =
      getAccessToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

/* ----------------------------------------
   SYLLABUS APIs
---------------------------------------- */

/**
 * GET SYLLABUS LIST
 */
export const getSyllabus =
  async (params = {}) => {

    const res =
      await api.get(
        "/syllabus",
        { params }
      );

    return res.data;
};

/**
 * CREATE SYLLABUS
 */
export const createSyllabus =
  async (payload) => {

    const res =
      await api.post(
        "/syllabus",
        payload
      );

    return res.data;
};

/**
 * DELETE SYLLABUS
 */
export const deleteSyllabus =
  async (id) => {

    const res =
      await api.delete(
        `/syllabus/${id}`
      );

    return res.data;
};

export default {
  getSyllabus,
  createSyllabus,
  deleteSyllabus,
};