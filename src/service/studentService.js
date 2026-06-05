//studentservice.js
import api from "../api/client";

export const getStudents = async (params = {}) => {
  const res = await api.get("/student", { params });
  return res.data;
};

export const getStudentById = async (id) => {
  const res = await api.get(`/student/${id}`);
  return res.data;
};

export const createStudent = async (payload) => {
  const res = await api.post("/student", payload);
  return res.data;
};

export const updateStudent = async (id, payload) => {
  const res = await api.put(`/student/${id}`, payload);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await api.delete(`/student/${id}`);
  return res.data;
};

export const restoreStudent = async (id) => {
  const res = await api.patch(`/student/${id}/restore`);
  return res.data;
};

export default { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, restoreStudent };
