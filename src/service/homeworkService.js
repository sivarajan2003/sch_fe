// homeworkService.js
import api from "../api/client";

export const createHomework = (data) =>
  api.post("/homework", data).then((r) => r.data);

export const getStudentHomework = (studentId) =>
  api.get(`/homework/student/${studentId}`).then((r) => r.data);

export default {
  createHomework,
  getStudentHomework,
};
