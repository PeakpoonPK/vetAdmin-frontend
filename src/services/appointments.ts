import { axiosInstance } from '@/lib/axios';
import { Appointment } from '@/types/api';

export const appointmentService = {
  
  getAllAppointments: async (params?: {
    status?: 'pending' | 'confirmed' | 'cancelled';
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await axiosInstance.get<Appointment[]>('/api/appointments', { params });
    return response.data;
  },

  getAppointmentById: async (id: string) => {
    const response = await axiosInstance.get<Appointment>(`/api/appointments/${id}`);
    return response.data;
  },

  getAppointmentByDoctorId: async (id: string) => {
    const response = await axiosInstance.get<Appointment>(`/api/appointments/doctorId/${id}`);
    return response.data;
  },

  updateAppointmentStatus: async (
    id: string,
    status: 'confirmed' | 'cancelled',
    notes?: string
  ) => {
    const response = await axiosInstance.patch<Appointment>(`/api/appointments/${id}/status`, {
      status,
      notes,
    });
    return response.data;
  },
};
