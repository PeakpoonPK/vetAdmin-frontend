'use client';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { appointmentService } from "@/src/services/appointments"

interface Appointment {
  id: string;
  petName: string;
  ownerName: string;
  doctorName: string;
  room: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState({
    petName: '',
    doctorName: '',
    room: '',
    date: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, [search]);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentService.getAllAppointments()
      setAppointments(response);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateStatus = async (id: string, status: "Confirmed" | "Cancelled" | "Deleted", notes?: string) => {
    try {
      const response = await appointmentService.updateAppointmentStatus(id, status, notes)
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatus(id, e.target.value as "Confirmed" | "Cancelled" | "Deleted");
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Appointment Management</h1>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
            Pet Name
          </label>
          <Input
            id="petName"
            name="petName"
            placeholder="Search by Pet Name"
            value={search.petName}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">
            Doctor Name
          </label>
          <Input
            id="doctorName"
            name="doctorName"
            placeholder="Search by Doctor Name"
            value={search.doctorName}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="room" className="block text-sm font-medium text-gray-700">
            Room
          </label>
          <Input
            id="room"
            name="room"
            placeholder="Search by Room"
            value={search.room}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <Input
            id="date"
            name="date"
            type="date"
            placeholder="Search by Date"
            value={search.date}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Table className="bg-white shadow-md rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-left p-4">Pet Name</TableHead>
            <TableHead className="text-left p-4">Owner</TableHead>
            <TableHead className="text-left p-4">Doctor</TableHead>
            <TableHead className="text-left p-4">Room</TableHead>
            <TableHead className="text-left p-4">Date</TableHead>
            <TableHead className="text-left p-4">Time</TableHead>
            <TableHead className="text-left p-4">Status</TableHead>
            <TableHead className="text-left p-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment, index) => {
            const { date, time } = formatDateTime(appointment.date);
            return (
              <TableRow key={appointment.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <TableCell className="p-4">{appointment.Patient.name}</TableCell>
                <TableCell className="p-4">{appointment.Patient.ownerName}</TableCell>
                <TableCell className="p-4">{appointment.Doctor.firstName + ' ' + appointment.Doctor.lastName}</TableCell>
                <TableCell className="p-4">{appointment.Doctor.specialty}</TableCell>
                <TableCell className="p-4">{date}</TableCell>
                <TableCell className="p-4">{time}</TableCell>
                <TableCell className="p-4">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e)}
                    className={
                      appointment.status === 'Confirmed'
                        ? 'border rounded p-1 bg-green-100 text-green-800'
                        : appointment.status === 'Cancelled'
                          ? 'border rounded p-1 bg-red-100 text-red-800'
                          : 'border rounded p-1 bg-yellow-100 text-yellow-800'
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
