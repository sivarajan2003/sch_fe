import client from "../api/client";

/* ================= CREATE FEES PAYMENT ================= */
export const createFeesPayment = async (payload) => {
  const res = await client.post("/school/fees-payment", payload);
  return res.data;
};

/* ================= GET FEES PAYMENTS ================= */
export const getFeesPayments = async (params = {}) => {
  const res = await client.get("/school/fees-payment", { params });
  return res.data;
};
