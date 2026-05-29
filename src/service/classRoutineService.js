import api from "../api/client";

// Class Routine uses the timetable backend
// GET /api/v1/psms/school/timetable

export const getRoutines = async (params = {}) => {
  const res = await api.get("/school/timetable", { params });
  return res.data;
};

export const createRoutine = async (payload) => {
  const res = await api.post("/school/timetable", payload);
  return res.data;
};

export const updateRoutine = async (id, payload) => {
  const res = await api.put(`/school/timetable/${id}`, payload);
  return res.data;
};

export const deleteRoutine = async (id) => {
  const res = await api.delete(`/school/timetable/${id}`);
  return res.data;
};

export default { getRoutines, createRoutine, updateRoutine, deleteRoutine };
