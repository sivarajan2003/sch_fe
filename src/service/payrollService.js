import api from "../api/client";

export const getPayroll = () => api.get("/hr/payroll");
export const createPayroll = (data) => api.post("/hr/payroll", data);
export const paySalary = (id) => api.patch(`/hr/payroll/${id}/pay`);
export const deletePayroll = (id) => api.delete(`/hr/payroll/${id}`);

export default {
  getPayroll,
  createPayroll,
  paySalary,
  deletePayroll,
};