"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentAppointments = [
  {
    id: "1",
    patient: "Sarah Johnson",
    doctor: "Dr. Michael Smith",
    time: "09:00 AM",
    status: "Completed",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: "2",
    patient: "James Wilson",
    doctor: "Dr. Emily Brown",
    time: "10:30 AM",
    status: "Scheduled",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  },
  {
    id: "3",
    patient: "Emma Davis",
    doctor: "Dr. Robert Taylor",
    time: "02:15 PM",
    status: "In Progress",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
]

export function RecentAppointments() {
  return (
    <div className="space-y-8">
      {recentAppointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={appointment.avatarUrl} alt="Avatar" />
            <AvatarFallback>
              {appointment.patient.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{appointment.patient}</p>
            <p className="text-sm text-muted-foreground">
              {appointment.doctor} - {appointment.time}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <span className={`
              px-2 py-1 rounded-full text-xs
              ${appointment.status === "Completed" ? "bg-green-100 text-green-800" : ""}
              ${appointment.status === "Scheduled" ? "bg-blue-100 text-blue-800" : ""}
              ${appointment.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : ""}
            `}>
              {appointment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}