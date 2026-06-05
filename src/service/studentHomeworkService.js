//studentHomeworkService.js
import api from "../api/client";

export const getStudentHomework = async (
  studentId
) => {
  const res = await api.get(
    `/homework/student/${studentId}`
  );

  return res.data;
};