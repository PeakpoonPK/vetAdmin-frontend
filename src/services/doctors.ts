import { axiosInstance } from '@/lib/axios';
import { Doctor } from '@/types/api';

export const doctorService = {
  getAllDoctors: async (params?: { search?: string; specialty?: string }) => {
    const response = await axiosInstance.get<Doctor[]>('/api/doctors', { params });
    return response.data;
  },

  getDoctorById: async (id: string) => {
    const response = await axiosInstance.get<Doctor>(`/api/doctors/${id}`);
    return response.data;
  },

  createDoctor: async (doctorData: Omit<Doctor, 'id'>) => {
    const response = await axiosInstance.post<Doctor>('/api/doctors', doctorData);
    return response.data;
  },

  updateDoctor: async (id: string, doctorData: Partial<Doctor>) => {
    const response = await axiosInstance.put<Doctor>(`/api/doctors/${id}`, doctorData);
    return response.data;
  },

  deleteDoctor: async (id: string) => {
    await axiosInstance.delete(`/api/doctors/${id}`);
  },
};
