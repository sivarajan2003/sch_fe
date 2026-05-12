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
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ----------------------------------------
   SUBJECT APIs
---------------------------------------- */

/**
 * GET SUBJECT LIST
 * GET /subject
 */
export const getSubjects = async (
  params = {}
) => {
  const res = await api.get(
    "/subject",
    {
      params,
    }
  );

  return res.data;
};

/**
 * GET SUBJECT BY ID
 * GET /subject/:id
 */
export const getSubjectById = async (
  id
) => {
  const res = await api.get(
    `/subject/${id}`
  );

  return res.data;
};

/**
 * CREATE SUBJECT
 * POST /subject
 */
export const createSubject = async (
  payload
) => {
  const res = await api.post(
    "/subject",
    payload
  );

  return res.data;
};

/**
 * UPDATE SUBJECT
 * PUT /subject/:id
 */
export const updateSubject = async (
  id,
  payload
) => {
  const res = await api.put(
    `/subject/${id}`,
    payload
  );

  return res.data;
};

/**
 * DELETE SUBJECT
 * DELETE /subject/:id
 */
export const deleteSubject = async (
  id
) => {
  const res = await api.delete(
    `/subject/${id}`
  );

  return res.data;
};

/* ----------------------------------------
   EXPORTS
---------------------------------------- */

export default {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};