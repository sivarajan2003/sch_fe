//studentFacultyService.js
import axios from "axios";

export const getStudentFaculties = (
  studentId
) => {
  return axios.get(
    `http://localhost:4000/api/v1/student/${studentId}/faculties`
  );
};