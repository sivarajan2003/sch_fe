//transportservice.js
import axios from "axios";

const API =
  "http://localhost:4000/api/v1/psms/transport";

const getTransport = () => {
  return axios.get(API);
};

const createTransport = (data) => {
  return axios.post(API, data);
};

const updateTransport = (id, data) => {
  return axios.put(
    `${API}/${id}`,
    data
  );
};

const deleteTransport = (id) => {
  return axios.delete(
    `${API}/${id}`
  );
};

export default {
  getTransport,
  createTransport,
  updateTransport,
  deleteTransport
};