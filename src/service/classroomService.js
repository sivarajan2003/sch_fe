// classroomService.js
import axios from "axios";
import { getAccessToken } from "../utils/token";
import BASE_API from "../api/baseurl";

const API = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET
export const getClassrooms = async () => {
  const res = await API.get("/school/classroom");
  return res.data;
};

//CREATE
export const createClassroom = async (payload) => {
  console.log("CREATE CLASSROOM PAYLOAD 👉", payload);

  try {
    const res = await API.post("/school/classroom", payload);
    console.log("CREATE CLASSROOM RESPONSE 👉", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "CREATE CLASSROOM ERROR 👉",
      error.response?.data || error.message
    );
    throw error;
  }
};
