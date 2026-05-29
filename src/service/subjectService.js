import api from "../api/client";

// Backend mounts subject routes at /api/v1/psms/subject/subject
// (subject router index uses /subject prefix, then subject.routes.js uses /subject again)

export const getSubjects = async (params = {}) => {
  const res = await api.get("/subject/subject", { params });
  return res.data;
};

export const getSubjectById = async (id) => {
  const res = await api.get(`/subject/subject/${id}`);
  return res.data;
};

export const createSubject = async (payload) => {
  const res = await api.post("/subject/subject", payload);
  return res.data;
};

export const updateSubject = async (id, payload) => {
  const res = await api.put(`/subject/subject/${id}`, payload);
  return res.data;
};

export const deleteSubject = async (id) => {
  const res = await api.delete(`/subject/subject/${id}`);
  return res.data;
};

export default { getSubjects, getSubjectById, createSubject, updateSubject, deleteSubject };
