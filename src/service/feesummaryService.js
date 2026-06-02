//feesummaryService.js
import client from "../api/client";

export const getFeeSummary = async () => {
  const res = await client.get("/dashboard/fee-summary");
  return res.data;
};