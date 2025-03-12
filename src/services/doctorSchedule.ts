import { axiosInstance } from '@/lib/axios';
import { DoctorSchedule } from '@/types/api';

export const doctorScheduleService = {
  getAllDoctorSchedules: async () => {
    const response = await axiosInstance.get<DoctorSchedule[]>('/api/doctorSchedule');
    return response.data;
  },

  getDoctorScheduleById: async (id: string) => {
    const response = await axiosInstance.get<DoctorSchedule>(`/api/doctorSchedule/${id}`);
    return response.data;
  },

  getDoctorScheduleByDoctorId: async (id: string) => {
    const response = await axiosInstance.get<DoctorSchedule>(`/api/doctorSchedule/doctorId/${id}`);
    return response.data;
  },

  createDoctorSchedule: async (doctorSchedule: DoctorSchedule) => {
    const response = await axiosInstance.post<DoctorSchedule>('/api/doctorSchedule', doctorSchedule);
    return response.data;
  },

  updateDoctorSchedule: async (id: string, doctorSchedule: DoctorSchedule) => {
    const response = await axiosInstance.put<DoctorSchedule>(`/api/doctorSchedule/${id}`, doctorSchedule);
    return response.data;
  },

  deleteDoctorSchedule: async (id: string) => {
    const response = await axiosInstance.delete(`/api/doctorSchedule/${id}`);
    return response.data;
  },
};
