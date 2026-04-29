//hrService.js
import api from "../api/client";

export const getHR = async () => {
  const res = await api.get("/hr");
  return res.data;
};

export const createHR = async (payload) => {
  const res = await api.post("/hr", payload);
  return res.data;
};

export const selectHR = async (id) => {
  const res = await api.patch(`/hr/${id}/select`);
  return res.data;
};
export const deleteHR = async (id) => {
  const res = await api.delete(`/hr/${id}`);
  return res.data;
};
export const updateHR = async (id, payload) => {
  const res = await api.put(`/hr/${id}`, payload);
  return res.data;
};



export default {
  getHR,
  createHR,
  selectHR,
   updateHR,
  deleteHR
};