export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availableSlots: TimeSlot[];
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}
