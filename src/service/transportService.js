import api from "../api/client";

// === BUS FLLET LOGISTICS ===
export const getBuses = async () => {
  const res = await api.get("/management/transport/buses");
  return res.data;
};

export const createBus = async (data) => {
  const res = await api.post("/management/transport/buses", data);
  return res.data;
};

export const updateBus = async (id, data) => {
  const res = await api.put(`/management/transport/buses/${id}`, data);
  return res.data;
};

export const deleteBus = async (id) => {
  const res = await api.delete(`/management/transport/buses/${id}`);
  return res.data;
};

// === ROUTES LOGISTICS ===
export const getTransport = async () => {
  const res = await api.get("/management/transport/routes");
  return res.data;
};

export const createTransport = async (data) => {
  const res = await api.post("/management/transport/routes", data);
  return res.data;
};

export const updateTransport = async (id, data) => {
  const res = await api.put(`/management/transport/routes/${id}`, data);
  return res.data;
};

export const deleteTransport = async (id) => {
  const res = await api.delete(`/management/transport/routes/${id}`);
  return res.data;
};

// === STUDENT ASSIGNMENT PASSES ===
export const getAssignments = async () => {
  const res = await api.get("/management/transport/students");
  return res.data;
};

export const createAssignment = async (data) => {
  const res = await api.post("/management/transport/students", data);
  return res.data;
};

export const deleteAssignment = async (id) => {
  const res = await api.delete(`/management/transport/students/${id}`);
  return res.data;
};

export default {
  getBuses,
  createBus,
  updateBus,
  deleteBus,
  getTransport,
  createTransport,
  updateTransport,
  deleteTransport,
  getAssignments,
  createAssignment,
  deleteAssignment
};