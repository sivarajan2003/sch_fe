
//hostelservice.js
import api from "../api/client";

export const createHostel = (data) =>
  api.post("/hostel/hostelsetup", data);

export const getHostels = () =>
  api.get("/hostel/hostelsetup");

export const updateHostel = (id, data) =>
  api.put(`/hostel/hostelsetup/${id}`, data);

export const deleteHostel = (id) =>
  api.delete(`/hostel/hostelsetup/${id}`);