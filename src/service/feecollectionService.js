// feecollectionService.js

import client from "../api/client";

/* ================= GET FEE COLLECTION ================= */
export const getFeeCollection = async () => {
  const res = await client.get("/dashboard/fee-collection");
  return res.data;
};