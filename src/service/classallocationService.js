// classallocationService.js
import axios from 'axios';
import BASE_API from '../api/baseurl';
import { getAccessToken } from '../utils/token';

/* ----------------------------------------
   Axios Instance
---------------------------------------- */
const api = axios.create({
  baseURL: BASE_API,
  // Content-Type auto-handled (JSON / FormData)
});

/* ----------------------------------------
   Request Interceptor (Attach Access Token)
---------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ----------------------------------------
   Class Allocation APIs
   NOTE: routes are expected to be mounted at
         /classallocation (server-side)
---------------------------------------- */

/**
 * CREATE CLASS ALLOCATION
 * POST /classallocation/class-allocations
 * @param {Object} payload
 *  {
 *    class_id: 'uuid',
 *    admission_id: 'uuid',
 *    allocated_by: 'uuid',
 *    created_by: 'uuid' (optional),
 *    created_by_name: 'string' (optional),
 *    created_by_email: 'string' (optional)
 *  }
 */
export const createClassAllocation = async (payload) => {
  const res = await api.post('/admission/class-allocations', payload);
  return res.data;
};

/**
 * REALLOCATE CLASS
 * PATCH /classallocation/class-allocations/reallocate
 * @param {Object} payload
 *  {
 *    admission_id: 'uuid',
 *    new_class_id: 'uuid',
 *    updated_by: 'uuid' (optional),
 *    updated_by_name: 'string' (optional),
 *    updated_by_email: 'string' (optional)
 *  }
 */
export const reallocateClass = async (payload) => {
  const res = await api.patch('/admission/class-allocations/reallocate', payload);
  return res.data;
};

/**
 * DEACTIVATE CLASS ALLOCATION (soft)
 * PATCH /classallocation/class-allocations/:id/deactivate
 * @param {string} id
 * @param {Object} payload (optional)
 *  {
 *    deleted_by: 'uuid' (optional),
 *    deleted_by_name: 'string' (optional),
 *    deleted_by_email: 'string' (optional)
 *  }
 */
export const deactivateClassAllocation = async (id, payload = {}) => {
  const res = await api.patch(`/admission/class-allocations/${id}/deactivate`, payload);
  return res.data;
};

/**
 * GET ALLOCATION BY ADMISSION
 * GET /classallocation/class-allocations/admission/:admission_id
 * @param {string} admissionId
 */
export const getAllocationByAdmission = async (admissionId) => {
  const res = await api.get(`/admission/class-allocations/admission/${admissionId}`);
  return res.data;
};

/**
 * LIST / FILTER CLASS ALLOCATIONS
 * GET /classallocation/class-allocations
 * @param {Object} params
 *  Supported params: page, limit, filters (JSON/string), order (JSON/string)
 *  Example:
 *    { page: 1, limit: 10, filters: JSON.stringify({ is_active: true }), order: JSON.stringify([['createdAt','DESC']]) }
 */
export const getClassAllocations = async (params = {}) => {
  const res = await api.get('/admission/class-allocations', { params });
  return res.data;
};

/* ----------------------------------------
   EXPORTS
---------------------------------------- */
export default {
  createClassAllocation,
  reallocateClass,
  deactivateClassAllocation,
  getAllocationByAdmission,
  getClassAllocations,
};
