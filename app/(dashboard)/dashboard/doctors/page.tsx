import { DoctorManagement } from "@/components/doctors/doctor-management"

export const metadata = {
  title: "Doctor Management",
  description: "Manage doctor information and schedules",
}

export default function DoctorsPage() {
  return (
    <div className="container mx-auto py-8 bg-custom-white p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-custom-green-800">Doctor Management</h1>
        </div>
        <DoctorManagement />
      </div>
    </div>
  )
}
