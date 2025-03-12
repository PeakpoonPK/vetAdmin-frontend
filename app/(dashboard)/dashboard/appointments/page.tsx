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
      const response = await axios.get('/api/appointments', {
        params: search,
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/appointments/${id}`, { status });
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pet Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.petName}</TableCell>
              <TableCell>{appointment.ownerName}</TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.room}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    appointment.status === 'confirmed'
                      ? 'success'
                      : appointment.status === 'cancelled'
                        ? 'destructive'
                        : 'default'
                  }
                >
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell>
                {appointment.status === 'pending' && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      className="mr-2"
                      onClick={() => updateStatus(appointment.id, 'confirmed')}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => updateStatus(appointment.id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
