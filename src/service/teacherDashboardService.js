// teacherDashboardService.js
import api from "../api/client";

export const getTodayClasses = (teacherId) =>
  api.get(`/teacher-dashboard/today-class/${teacherId}`).then(r => r.data);

export const getUpcomingEvents = () =>
  api.get("/teacher-dashboard/upcoming-events").then(r => r.data);

export const getTeacherAttendance = (teacherId) =>
  api.get(`/teacher-dashboard/teacher-attendance/${teacherId}`).then(r => r.data);

export const getBestPerformers = () =>
  api.get("/teacher-dashboard/best-performers");

export const getStudentProgress = () =>
  api.get("/teacher-dashboard/student-progress");

export const getTeacherSyllabus = (teacherId) =>
  api.get(`/teacher-dashboard/syllabus/${teacherId}`).then(r => r.data);

export const getStudentMarks = () =>
  api.get("/teacher-dashboard/student-marks");

export const getLeaveStatus = () =>
  api.get("/teacher-dashboard/leave-status");

export const getDashboardCards = (teacherId) =>
  api.get(`/teacher-dashboard/cards/${teacherId}`);

export default {
  getTodayClasses,
  getUpcomingEvents,
  getTeacherAttendance,
  getBestPerformers,
  getStudentProgress,
  getTeacherSyllabus,
  getStudentMarks,
  getLeaveStatus,
  getDashboardCards,
};
