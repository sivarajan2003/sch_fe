//studentTodoService.js
import api from "../api/client";

export const getStudentTodo = async (
  studentId
) => {
  const res = await api.get(
    `/studenttodo/student/${studentId}`
  );

  return res.data;
};