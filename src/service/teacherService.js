import api from "../api/client";

/* ----------------------------------------
   Teacher Services
---------------------------------------- */

/**
 * Create Teacher
 * POST /teacher
 */
export const createTeacher = async (payload) => {
  const res = await api.post("/teacher", payload);
  return res.data;
};

/**
 * Get Teachers (List + Filters + Pagination)
 * GET /teacher
 *
 * params:
 *  - page
 *  - limit
 *  - search
 *  - startDate
 *  - endDate
 *  - is_master
 *  - includeAudit
 *  - includeDeleted
 *  - filters
 *  - order
 */
export const getTeachers = async (params = {}) => {
  const res = await api.get("/teacher", { params });
  return res.data;
};

/**
 * Get Teacher by ID
 * GET /teacher/:id
 */
export const getTeacherById = async (id) => {
  if (!id) throw new Error("Teacher ID is required");
  const res = await api.get(`/teacher/${id}`);
  return res.data;
};

/**
 * Update Teacher (PUT – full update)
 * PUT /teacher/:id
 */
export const updateTeacher = async (id, payload) => {
  if (!id) throw new Error("Teacher ID is required");
  const res = await api.put(`/teacher/${id}`, payload);
  return res.data;
};

/**
 * Soft Delete Teacher
 * DELETE /teacher/:id
 * (Super Admin only)
 */
export const deleteTeacher = async (id) => {
  if (!id) throw new Error("Teacher ID is required");
  const res = await api.delete(`/teacher/${id}`);
  return res.data;
};

/**
 * Restore Teacher
 * PATCH /teacher/:id/restore
 * (Super Admin only)
 */
export const restoreTeacher = async (id) => {
  if (!id) throw new Error("Teacher ID is required");
  const res = await api.patch(`/teacher/${id}/restore`);
  return res.data;
};

/* ----------------------------------------
   Export Default
---------------------------------------- */
export default {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  restoreTeacher,
};
