import axios from 'axios';

const API =
'http://localhost:4000/api/v1/psms/hostel/hostelfeemanagement';

export const getFees = () =>
  axios.get(API);

export const createFee = (data) =>
  axios.post(API, data);

export const updateFee = (
  id,
  data
) =>
  axios.put(`${API}/${id}`, data);

export const deleteFee = (id) =>
  axios.delete(`${API}/${id}`);