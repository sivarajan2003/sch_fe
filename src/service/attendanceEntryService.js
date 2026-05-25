import api from "../api/client";

// GET
export const getAttendanceEntries = () =>
  api.get("/hostel/attendanceentry");

// CREATE
export const createAttendanceEntry = (data) =>
  api.post("/hostel/attendanceentry", data);

// UPDATE
export const updateAttendanceEntry = (id, data) =>
  api.put(`/hostel/attendanceentry/${id}`, data);

// DELETE
export const deleteAttendanceEntry = (id) =>
  api.delete(`/hostel/attendanceentry/${id}`);

export default {
  getAttendanceEntries,
  createAttendanceEntry,
  updateAttendanceEntry,
  deleteAttendanceEntry,
};