//holidayservice.js
import api from "../api/client";

const getHoliday = () => {
  return api.get("/holiday");
};

const createHoliday = (data) => {
  return api.post("/holiday", data);
};

const updateHoliday = (id, data) => {
  return api.put(`/holiday/${id}`, data);
};

const deleteHoliday = (id) => {
  return api.delete(`/holiday/${id}`);
};

export default {
  getHoliday,
  createHoliday,
  updateHoliday,
  deleteHoliday,
};