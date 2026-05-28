import axios from 'axios';

const API =
  'http://localhost:4000/api/v1/psms/hostel/complaintsmaintenance';

export const getComplaints = () =>
  axios.get(API);

export const createComplaint = (data) =>
  axios.post(API, data);

export const updateComplaint = (
  id,
  data
) =>
  axios.put(`${API}/${id}`, data);

export const deleteComplaint = (id) =>
  axios.delete(`${API}/${id}`);