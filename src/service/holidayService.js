import api from "./api";

interface HolidayPayload {
  title: string;
  from_date: string;
  to_date: string;
  description: string;
}

const getHoliday = () => {
  return api.get("/holiday");
};

const createHoliday = (
  data: HolidayPayload
) => {
  return api.post(
    "/holiday",
    data
  );
};

const updateHoliday = (
  id: string,
  data: HolidayPayload
) => {
  return api.put(
    `/holiday/${id}`,
    data
  );
};

const deleteHoliday = (
  id: string
) => {
  return api.delete(
    `/holiday/${id}`
  );
};

export default {
  getHoliday,
  createHoliday,
  updateHoliday,
  deleteHoliday
};