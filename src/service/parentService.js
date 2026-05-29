import api from "../api/client";

export const getParents = async (params = {}) => {
  const res = await api.get("/parent", { params });
  return res.data;
};

export const getParentById = async (id) => {
  const res = await api.get(`/parent/${id}`);
  return res.data;
};

export const createParent = async (payload) => {
  const res = await api.post("/parent", payload);
  return res.data;
};

export const updateParent = async (id, payload) => {
  const res = await api.put(`/parent/${id}`, payload);
  return res.data;
};

export const deleteParent = async (id) => {
  const res = await api.delete(`/parent/${id}`);
  return res.data;
};

export const restoreParent = async (id) => {
  const res = await api.patch(`/parent/${id}/restore`);
  return res.data;
};

export default { getParents, getParentById, createParent, updateParent, deleteParent, restoreParent };
