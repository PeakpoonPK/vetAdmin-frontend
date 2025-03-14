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
    status: 'Confirmed' | 'Cancelled' | 'Deleted',
    notes?: string
  ) => {
    const response = await axiosInstance.patch<Appointment>(`/api/appointments/${id}/status`, {
      status,
      notes,
    });
    return response.data;
  },

  createAppointment: async (data: any) => {
    const response = await axiosInstance.post<any>('api/appointments', data);
    return response.data;
  },
};



