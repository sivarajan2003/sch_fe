import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

// Create attendance
const createAttendance = async (payload) => {
  const response = await axios.post(API_URL, payload);
  return response.data;
};

// Get all attendance
const getAttendance = async (params = {}) => {
  const response = await axios.get(API_URL, {
    params,
  });

  return response.data;
};

// Student attendance
const getStudentAttendance = async () => {
  const response = await axios.get(API_URL, {
    params: {
      person_type: "Student",
    },
  });

  return response.data;
};

// Teacher attendance
const getTeacherAttendance = async () => {
  const response = await axios.get(API_URL, {
    params: {
      person_type: "Teacher",
    },
  });

  return response.data;
};

// Staff attendance
const getStaffAttendance = async () => {
  const response = await axios.get(API_URL, {
    params: {
      person_type: "Staff",
    },
  });

  return response.data;
};

export default {
  createAttendance,
  getAttendance,
  getStudentAttendance,
  getTeacherAttendance,
  getStaffAttendance,
};