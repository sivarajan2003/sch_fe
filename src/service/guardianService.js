import api from "../api/client";

export const getGuardians = async (params = {}) => {
  const res = await api.get("/guardian", { params });
  return res.data;
};

export const getGuardianById = async (id) => {
  const res = await api.get(`/guardian/${id}`);
  return res.data;
};

export const createGuardian = async (data) => {
  const res = await api.post("/guardian", data);
  return res.data;
};

export const updateGuardian = async (id, data) => {
  const res = await api.put(`/guardian/${id}`, data);
  return res.data;
};

export const deleteGuardian = async (id) => {
  const res = await api.delete(`/guardian/${id}`);
  return res.data;
};

export default { getGuardians, getGuardianById, createGuardian, updateGuardian, deleteGuardian };
