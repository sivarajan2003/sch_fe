import api from "../api/client";

/* HR Services */

export const getHR = async () => {
  const res = await api.get("/api/v1/psms/hr");
  return res.data;
};

export const createHR = async (payload) => {
  const res = await api.post("/api/v1/psms/hr", payload);
  return res.data;
};

export const selectHR = async (id) => {
  const res = await api.patch(`/api/v1/psms/hr/${id}/select`);
  return res.data;
};
export default {
  createHR,
  getHR,
  selectHR,
};