//studentExamResultService.js
import api from "../api/client";

export const getStudentExamResult =
  async (studentId) => {
    const res = await api.get(
      `/studentexamresult/${studentId}`
    );

    return res.data;
  };