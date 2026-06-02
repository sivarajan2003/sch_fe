//upcomingeventservice.js
import axios from "axios";
import BASE_API from "../api/baseurl";
import { getAccessToken } from "../utils/token";

const api = axios.create({
  baseURL: BASE_API,
});

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

export const getUpcomingEvents = async () => {
  const res = await api.get(
    "/dashboard/upcoming-events"
  );

  return res.data;
};

export const createUpcomingEvent = async (
  payload
) => {
  const res = await api.post(
    "/dashboard/upcoming-events",
    payload
  );

  return res.data;
};

export default {
  getUpcomingEvents,
  createUpcomingEvent,
};