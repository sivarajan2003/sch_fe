import api from "../api/client";

const getMembers = () => api.get("/management/library-member");

const getMemberById = (id) => api.get(`/management/library-member/${id}`);

const createMember = (data) => api.post("/management/library-member", data);

const updateMember = (id, data) =>
  api.put(`/management/library-member/${id}`, data);

const deleteMember = (id) => api.delete(`/management/library-member/${id}`);

export default {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
