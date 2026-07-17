// complaintsmaintenanceService.js
import api from "../api/client";

export const getComplaints = () => api.get("/hostel/complaintsmaintenance");
export const createComplaint = (data) => api.post("/hostel/complaintsmaintenance", data);
export const updateComplaint = (id, data) => api.put(`/hostel/complaintsmaintenance/${id}`, data);
export const deleteComplaint = (id) => api.delete(`/hostel/complaintsmaintenance/${id}`);

export default { getComplaints, createComplaint, updateComplaint, deleteComplaint };
