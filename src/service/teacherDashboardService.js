//teacherDashboardService.js
import api from "../api/client";
import axios from "axios";

const API =
"http://localhost:5000/api/v1/psms";
export const getTodayClasses = async (teacherId) => {
  const res = await api.get(
    `/teacher-dashboard/today-class/${teacherId}`
  );

  return res.data;
};

export const getUpcomingEvents = async () => {
  const res = await api.get(
    "/teacher-dashboard/upcoming-events"
  );

  return res.data;
};
export const getTeacherAttendance =
async (teacherId) => {

  const res = await api.get(
    `/teacher-dashboard/teacher-attendance/${teacherId}`
  );

  return res.data;
};
export const getBestPerformers = () => {
  return api.get(
    "/teacher-dashboard/best-performers"
  );
};

export const getStudentProgress = () => {
  return api.get(
    "/teacher-dashboard/student-progress"
  );
};
export const getTeacherSyllabus = async (
 teacherId
) => {

 const res = await api.get(
  `/teacher-dashboard/syllabus/${teacherId}`
 );

 return res.data;
};
export const getStudentMarks =
() => {
  return axios.get(
   `${API}/teacher-dashboard/student-marks`
  );
};
export const getLeaveStatus =
() => {
  return axios.get(
   `${API}/teacher-dashboard/leave-status`
  );
};
export const getDashboardCards =
(teacherId)=>{

 return api.get(
  `/teacher-dashboard/cards/${teacherId}`
 );

};