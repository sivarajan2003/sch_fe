import api from '../api/client';

// Generic
const createAttendance = async (payload) => {
  const res = await api.post('/attendance', payload);
  return res.data;
};

const getAttendance = async (params = {}) => {
  const res = await api.get('/attendance', { params });
  return res.data;
};

/**
 * Save teacher attendance for a date.
 * @param {string} attendance_date - "YYYY-MM-DD"
 * @param {Array}  records - [{ person_id, person_name, attendance_status, notes }]
 */
const saveTeacherAttendance = async (attendance_date, records) => {
  const res = await api.post('/attendance/teacher/save', { attendance_date, records });
  return res.data;
};

/**
 * Get teacher attendance map for a specific date.
 * Returns { [person_id]: { attendance_status, notes } }
 */
const getTeacherAttendanceByDate = async (date) => {
  const res = await api.get('/attendance/teacher', { params: { date } });
  return res.data;
};

/**
 * Get teacher attendance records for a date range.
 */
const getTeacherAttendanceRange = async (params = {}) => {
  const res = await api.get('/attendance/teacher/range', { params });
  return res.data;
};

// Legacy helpers
const getStudentAttendance = async () => getAttendance({ person_type: 'Student' });
const getStaffAttendance = async () => getAttendance({ person_type: 'Staff' });

export default {
  createAttendance,
  getAttendance,
  saveTeacherAttendance,
  getTeacherAttendanceByDate,
  getTeacherAttendanceRange,
  getStudentAttendance,
  getStaffAttendance,
};
