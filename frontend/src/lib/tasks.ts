import api from './api';
import { Task, TasksResponse, TaskFilters } from '@/types';

export const tasksApi = {
  getTasks: async (filters: TaskFilters = {}): Promise<TasksResponse> => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.priority) params.set('priority', filters.priority);
    if (filters.search) params.set('search', filters.search);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
    const { data } = await api.get(`/tasks?${params.toString()}`);
    return data;
  },

  getTask: async (id: string): Promise<Task> => {
    const { data } = await api.get(`/tasks/${id}`);
    return data.task;
  },

  createTask: async (payload: Partial<Task>): Promise<Task> => {
    const { data } = await api.post('/tasks', payload);
    return data.task;
  },

  updateTask: async (id: string, payload: Partial<Task>): Promise<Task> => {
    const { data } = await api.patch(`/tasks/${id}`, payload);
    return data.task;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  toggleTask: async (id: string): Promise<Task> => {
    const { data } = await api.patch(`/tasks/${id}/toggle`);
    return data.task;
  },
};
