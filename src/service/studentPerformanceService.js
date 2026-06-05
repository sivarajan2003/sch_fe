import axios from "axios";

export const getStudentPerformance = (studentId) => {
  return axios.get(
    `http://localhost:4000/api/v1/psms/student-performance/${studentId}`
  );
};