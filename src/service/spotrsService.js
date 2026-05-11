import axios from "axios";

const API =
  "http://localhost:5000/management/sports";

const getSports = () => {
  return axios.get(API);
};

const createSports = (data) => {
  return axios.post(API, data);
};

const updateSports = (id, data) => {
  return axios.put(
    `${API}/${id}`,
    data
  );
};

const deleteSports = (id) => {
  return axios.delete(
    `${API}/${id}`
  );
};

export default {
  getSports,
  createSports,
  updateSports,
  deleteSports,
};