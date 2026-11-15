// All task API calls live here. Nothing else in the app talks to axios.
//
// Task shape: { _id, title, description, date: 'YYYY-MM-DD', startTime: 'HH:mm',
//   endTime: 'HH:mm' | '', priority: 'low'|'medium'|'high'|'', status: 'in_progress'|'completed' }

import axiosInstance from './axiosInstance.js';

export const taskService = {
  /** GET /tasks, optional { from, to } as YYYY-MM-DD */
  getAll: (params) => axiosInstance.get('/tasks', { params }),

  /** GET /tasks?search=keyword (matches title or description) */
  search: (search) => axiosInstance.get('/tasks', { params: { search } }),

  /** POST /tasks */
  create: (data) => axiosInstance.post('/tasks', data),

  /** PUT /tasks/:id */
  update: (id, data) => axiosInstance.put(`/tasks/${id}`, data),

  /** PATCH /tasks/:id/status */
  updateStatus: (id, status) => axiosInstance.patch(`/tasks/${id}/status`, { status }),

  /** DELETE /tasks/:id */
  remove: (id) => axiosInstance.delete(`/tasks/${id}`),
};
