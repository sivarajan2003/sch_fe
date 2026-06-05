import api from "../api/client";

export const getStudentFees = async (studentId) => {
  const res = await api.get(
    `/studentfees/student/${studentId}`
  );

  return res.data;
};