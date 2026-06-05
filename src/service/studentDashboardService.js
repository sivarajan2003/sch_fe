//studentDashboardService.js
import api from "../api/client";

export const getStudentDashboard = (studentId) => {
  return api.get(
    `/studentattendance/dashboard/${studentId}`
  );
};