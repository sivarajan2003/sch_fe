// settingsService.js
import api from "../api/client";

/**
 * GET /school/settings?category=academic
 * Returns { data: [...], map: { key: value } }
 */
export const getSettings = (category = null) => {
  const params = category ? { category } : {};
  return api.get("/school/settings", { params });
};

/**
 * PUT /school/settings — bulk upsert
 * payload: { academic_year: "2025-2026", notif_exam: "true", ... }
 */
export const updateSettings = (payload) =>
  api.put("/school/settings", payload);

/**
 * PUT /school/settings/:key — single key update
 */
export const setSetting = (key, value) =>
  api.put(`/school/settings/${key}`, { value });

export default { getSettings, updateSettings, setSetting };
