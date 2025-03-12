export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  specialty: string;
  schedules: DoctorSchedule[];
  appointments: Appointment[];
  createdAt: string;
  updatedAt: string;
}

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  dateOfBirth: string | null;
  appointments: Appointment[];
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctor: Doctor;
  patientId: string;
  patient: Patient;
  date: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}