//studentSyllabusService.js
import api from "../api/client";

export const getStudentSyllabus = async (
  studentId
) => {
  const res = await api.get(
    `/studentsyllabus/student/${studentId}`
  );

  return res.data;
};