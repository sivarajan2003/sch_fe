import api from "../api/client";

const getFees = () => api.get("/management/fees");

const getFeeById = (id) => api.get(`/management/fees/${id}`);

const createFee = (data) => api.post("/management/fees", data);

const updateFee = (id, data) => api.put(`/management/fees/${id}`, data);

const deleteFee = (id) => api.delete(`/management/fees/${id}`);

export default {
  getFees,
  getFeeById,
  createFee,
  updateFee,
  deleteFee,
};
