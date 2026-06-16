//attendanceDashboardService.js
import axios from "axios";
// const API =
// "http://localhost:4000/api/v1/psms/attendance-dashboard";
import BASE_API from "../api/baseurl";

const API = `${BASE_API}/attendance-dashboard`;
export const getAttendanceStats = (
  type
) => {
  return axios.get(API, {
    params: { type },
  });
};