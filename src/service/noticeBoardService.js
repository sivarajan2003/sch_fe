// noticeBoardService.js

 import axios from "axios";

// const API =
// "http://localhost:4000/api/v1/psms/noticeboard";
import BASE_API from "../api/baseurl";

const API = `${BASE_API}/noticeboard`;
export const getNotices = () => {
  return axios.get(API);
};

export const createNotice = (data) => {
  return axios.post(API, data);
};

export const deleteNotice = (id) => {
  return axios.delete(`${API}/${id}`);
};