//performanceService.js
import axios from "axios";
import BASE_API from "../api/baseurl";

export const getPerformance =
  async () => {
    const res = await axios.get(
      `${BASE_API}/dashboard/performance`
    );

    return res.data;
  };

export default {
  getPerformance,
};