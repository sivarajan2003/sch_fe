import api from "../api/client";

const getTeachers = async () => {

  const res = await api.get("/v1/psms/hr-teacher");

  console.log("Teacher API:", res.data);

  return res.data;
};

export {
  getTeachers
};

export default {
  getTeachers
};