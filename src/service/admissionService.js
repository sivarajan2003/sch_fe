import api from "../api/client";

/* ----------------------------------------
   Admission Services
---------------------------------------- */

/**
 * Create Admission
 * POST /admission/admissions
 * @param {FormData} payload
 */
export const createAdmission = async (payload) => {
    const res = await api.post("/admission/admissions", payload);
    return res.data;
};

/**
 * Get Admissions
 * GET /admission/admissions
 */
export const getAdmissions = async (params = {}) => {
    const res = await api.get("/admission/admissions", { params });
    return res.data;
};

/**
 * Get Admission Stats
 * GET /admission/stats
 */
export const getAdmissionStats = async (params = {}) => {
    const res = await api.get("/admission/stats", { params });
    return res.data;
};

// ------------------------
// GET ADMISSION BY ID
// ------------------------
export const getAdmissionById = async (id) => {
    const res = await api.get(`/admission/admissions/${id}`);
    return res.data;
};

// ------------------------
// UPDATE ADMISSION
// ------------------------
export const updateAdmission = async (id, data) => {
    const res = await api.put(`/admission/admissions/${id}`, data);
    return res.data;
};

// ------------------------
// DELETE ADMISSION
// ------------------------
export const deleteAdmission = async (id) => {
    const res = await api.delete(`/admission/admissions/${id}`);
    return res.data;
};

// ------------------------
// GET SEAT ALLOCATION
// ------------------------
export const getSeatAllocation = async () => {
    const res = await api.get("/admission/seat-allocation");
    return res.data;
};

export default {
    createAdmission,
    getAdmissions,
    getAdmissionStats,
    getAdmissionById,
    updateAdmission,
    deleteAdmission,
    getSeatAllocation
};
