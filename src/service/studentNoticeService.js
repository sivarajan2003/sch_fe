//studentNoticeService.js
import axios from "axios";

export const getStudentNotices = (
  studentId
) => {
  return axios.get(
    "/api/student-notices"
  );
};