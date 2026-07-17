// studentPerformanceService.js
import api from "../api/client";

export const getStudentPerformance = (studentId) =>
  api.get(`/student-performance/${studentId}`);

export default { getStudentPerformance };
