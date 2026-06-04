// feecollectionService.js

import client from "../api/client";

/* ================= GET FEE COLLECTION ================= */
export const getFeeCollection = async () => {
  const res = await client.get("/fee-collection");
  return res.data;
};