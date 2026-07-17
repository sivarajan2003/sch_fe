// studentFacultyService.js
import api from "../api/client";

export const getStudentFaculties = (studentId) =>
  api.get(`/student/${studentId}/faculties`);

export default { getStudentFaculties };
