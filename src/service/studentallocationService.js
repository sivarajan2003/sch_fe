import api from "../api/client";

export const getAllocations = () =>
  api.get("/hostel/studentallocation");

export const createAllocation = (
  data
) =>
  api.post(
    "/hostel/studentallocation",
    data
  );

export const updateAllocation = (
  id,
  data
) =>
  api.put(
    `/hostel/studentallocation/${id}`,
    data
  );

export const deleteAllocation = (
  id
) =>
  api.delete(
    `/hostel/studentallocation/${id}`
  );