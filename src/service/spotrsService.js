import api from "../api/client";

const getSports = () => api.get("/management/sports");

const createSports = (data) => api.post("/management/sports", data);

const updateSports = (id, data) => api.put(`/management/sports/${id}`, data);

const deleteSports = (id) => api.delete(`/management/sports/${id}`);

export default {
  getSports,
  createSports,
  updateSports,
  deleteSports,
};
