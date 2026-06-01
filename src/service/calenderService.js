//calenderservice.js
import axios from "axios";
import BASE_API from "../api/baseurl";

export const getCalendarEvents = async () => {
  const res = await axios.get(
    `${BASE_API}/dashboard/calendar`
  );

  return res.data;
};