import { axiosInstance } from '@/lib/axios';
import { LoginResponse } from '@/types/api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post<LoginResponse>('/api/users/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/api/users/check');
      return response.data;
    } catch (error) {
      return null;
    }
  },
};
