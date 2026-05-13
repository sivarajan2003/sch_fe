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
   LEAVE APIs
---------------------------------------- */

/**
 * GET ALL LEAVES
 * GET /leave
 */
export const getAllLeaves =
  async () => {
    const res =
      await api.get(
        "/leave"
      );

    return res.data;
  };

/**
 * CREATE LEAVE
 * POST /leave
 */
export const createLeave =
  async (
    payload
  ) => {
    const res =
      await api.post(
        "/leave",
        payload
      );

    return res.data;
  };

/**
 * UPDATE LEAVE
 * PUT /leave/:id
 */
export const updateLeave =
  async (
    id,
    payload
  ) => {
    const res =
      await api.put(
        `/leave/${id}`,
        payload
      );

    return res.data;
  };

/**
 * DELETE LEAVE
 * DELETE /leave/:id
 */
export const deleteLeave =
  async (id) => {
    const res =
      await api.delete(
        `/leave/${id}`
      );

    return res.data;
  };

/* ----------------------------------------
   EXPORTS
---------------------------------------- */

export default {
  getAllLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
};