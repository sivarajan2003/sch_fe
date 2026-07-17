// hostelfeemanagementService.js
import api from "../api/client";

export const getFees = () => api.get("/hostel/hostelfeemanagement");
export const createFee = (data) => api.post("/hostel/hostelfeemanagement", data);
export const updateFee = (id, data) => api.put(`/hostel/hostelfeemanagement/${id}`, data);
export const deleteFee = (id) => api.delete(`/hostel/hostelfeemanagement/${id}`);

export default { getFees, createFee, updateFee, deleteFee };
