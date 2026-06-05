//studentExamService.js
import api from "../api/client";

export const getStudentExams = async (
  studentId
) => {
  const res = await api.get(
    `/studentexam/${studentId}`
  );

  return res.data;
};