"use client"

import { useEffect, useState } from "react"
import { Doctor } from "@/types/api"
import { doctorService } from "@/src/services/doctors"
import { doctorScheduleService } from "@/src/services/doctorSchedule"
import { appointmentService } from "@/src/services/appointments"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import _ from 'lodash';
import { DoctorSlotsDialog } from "./doctor-slots-dialog"
import { set } from "date-fns"

interface DoctorListProps {
  searchQuery: string;
  selectedSpecialty: string;
  searchDate?: Date;
  searchTime?: string;
  onEdit: (doctor: Doctor) => void;
  setSearchTime: (time: string) => void;
}

export function DoctorList({ searchQuery, selectedSpecialty, searchDate, searchTime, onEdit, setSearchTime }: DoctorListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState<{ date: string, time: string[] }[]>([]);
  const [slotDoctor, setSlotDoctor] = useState<any[]>([]);
  const [allAppoinment, setAllAppoinment] = useState<any[]>([]);
  const [getAllDoctorSchedules, setGetAllDoctorSchedules] = useState<any[]>([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      loadDoctors();
    } else {
      const filteredDoctors = doctors.filter(doctor =>
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDoctors(filteredDoctors);
    }
  }, [searchQuery])

  useEffect(() => {
    if (!selectedSpecialty || selectedSpecialty === "all") {
      loadDoctors();
    } else {
      loadDoctors();
      const specialtyFilteredDoctors = doctors.filter(doctor =>
        doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
      setDoctors(specialtyFilteredDoctors);
    }
  }, [selectedSpecialty]);

  useEffect(() => {
    if (searchDate && searchTime) {
      if (searchTime === 'any') {

      } else { }

    }
  }, [searchDate, searchTime]);


  useEffect(() => {
    loadAllAppoinment();
    setSearchTime('any');
  }, [
    searchDate
  ])

  const loadDoctors = async () => {
    try {
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
    } catch (error) {
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const loadAllAppoinment = async () => {
    try {
      const data = await appointmentService.getAllAppointments();
      const doctorSchedule = await doctorScheduleService.getAllDoctorSchedules();
      setAllAppoinment(data);
      setGetAllDoctorSchedules(doctorSchedule)
    } catch (error) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAvailableSlots = async (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    const data = await appointmentService.getAppointmentByDoctorId(doctor.id);
    const doctorSchedules = await doctorScheduleService.getDoctorScheduleByDoctorId(doctor.id);

    const slots = doctorSchedules.map(schedule => {
      const startHour = new Date(schedule.start).getHours();
      const endHour = new Date(schedule.end).getHours();
      const times = Array.from({ length: endHour - startHour }, (_, i) => {
        const hour = startHour + i;
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const formattedHour = displayHour < 10 ? `0${displayHour}` : displayHour;
        return `${formattedHour}:00 ${period}`;
      });
      return { date: new Date(schedule.day).toLocaleDateString(), time: times };
    });

    setSlotDoctor(data);
    setAvailableSlots(slots);
  };

  const handleDelete = async (id: string) => {
    try {
      await doctorService.deleteDoctor(id);
      toast.success("Doctor deleted successfully");
      loadDoctors();
    } catch (error) {
      toast.error("Failed to delete doctor");
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const nameMatch = `${doctor.firstName} ${doctor.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const specialtyMatch = !selectedSpecialty ||
      selectedSpecialty === "all" ||
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();

    // Filter by availability
    let availabilityMatch = true;
    if (searchDate || (searchTime && searchTime !== "any")) {
      availabilityMatch = availableSlots.some(slot => {
        const slotDate = new Date(slot.date);
        const dateMatch = !searchDate || slotDate.toDateString() === searchDate.toDateString();
        const timeMatch = !searchTime || searchTime === "any" || slot.time.includes(searchTime);
        return dateMatch && timeMatch;
      });
    }

    return nameMatch && specialtyMatch && availabilityMatch;
  });

  return (
    <div className="rounded-md border border-custom-green-200">
      <Table>
        <TableHeader className="bg-custom-green-50">
          <TableRow>
            <TableHead className="text-custom-green-800">Name</TableHead>
            <TableHead className="text-custom-green-800">Specialty</TableHead>
            <TableHead className="text-custom-green-800">Email</TableHead>
            <TableHead className="text-custom-green-800">Phone</TableHead>
            <TableHead className="text-custom-green-800">Available Slots</TableHead>
            <TableHead className="text-right text-custom-green-800">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDoctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>
                <DoctorSlotsDialog
                  doctor={doctor}
                  availableSlots={availableSlots}
                  slotDoctor={slotDoctor}
                  selectedDate={selectedDate}
                  onViewSlots={handleViewAvailableSlots}
                  setSelectedDate={setSelectedDate}
                />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onEdit(doctor)}
                  className="border-custom-green-300 hover:bg-custom-green-50"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(doctor.id)}
                  className="border-custom-red-300 hover:bg-custom-red-50 text-custom-red-500"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
