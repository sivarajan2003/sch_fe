import api from "../api/client";

// Backend: subject router index mounts syllabus at /syllabus
// Full path: /api/v1/psms/syllabus

export const getSyllabus = async (params = {}) => {
  const res = await api.get("/syllabus", { params });
  return res.data;
};

export const createSyllabus = async (payload) => {
  const res = await api.post("/syllabus", payload);
  return res.data;
};

export const deleteSyllabus = async (id) => {
  const res = await api.delete(`/syllabus/${id}`);
  return res.data;
};

export default { getSyllabus, createSyllabus, deleteSyllabus };
