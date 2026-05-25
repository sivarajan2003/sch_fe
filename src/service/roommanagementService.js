import api from '../api/client';

export const getRooms = () =>
  api.get('/hostel/roommanagement');

export const createRoom = (data) =>
  api.post('/hostel/roommanagement', data);

export const updateRoom = (id, data) =>
  api.put(
    `/hostel/roommanagement/${id}`,
    data
  );

export const deleteRoom = (id) =>
  api.delete(
    `/hostel/roommanagement/${id}`
  );

export default {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};