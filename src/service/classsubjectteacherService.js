// classsubjectteacherService.js
import api from "../api/client";

export const getClassSubjectTeachers = (params = {}) =>
  api.get("/school/classsubjectteacher", { params }).then((r) => r.data);

export const getClassSubjectTeacherById = (id) =>
  api.get(`/school/classsubjectteacher/${id}`).then((r) => r.data);

export const createClassSubjectTeacher = (data) =>
  api.post("/school/classsubjectteacher", data).then((r) => r.data);

export const updateClassSubjectTeacher = (id, data) =>
  api.put(`/school/classsubjectteacher/${id}`, data).then((r) => r.data);

export const deleteClassSubjectTeacher = (id) =>
  api.delete(`/school/classsubjectteacher/${id}`).then((r) => r.data);

export default {
  getClassSubjectTeachers,
  getClassSubjectTeacherById,
  createClassSubjectTeacher,
  updateClassSubjectTeacher,
  deleteClassSubjectTeacher,
};
