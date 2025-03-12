"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doctor } from "@/types/api"
import { doctorService } from "@/src/services/doctors"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required").optional(),
  specialty: z.string().min(2, "Specialty is required"),
  schedules: z.array(z.object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")
  }))
})

interface DoctorFormProps {
  doctor?: Doctor;
  onClose: () => void;
  onSuccess: () => void;
}

export function DoctorForm({ doctor, onClose, onSuccess }: DoctorFormProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: doctor || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialty: "",
      schedules: []
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if (doctor) {
        await doctorService.updateDoctor(doctor.id, values)
        toast.success("Doctor updated successfully")
      } else {
        await doctorService.createDoctor(values)
        toast.success("Doctor created successfully")
      }
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(doctor ? "Failed to update doctor" : "Failed to create doctor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-custom-green-200">
      <CardHeader>
        <CardTitle className="text-custom-green-800">
          {doctor ? "Edit Doctor" : "Add New Doctor"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields here - similar to login form but with doctor fields */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-custom-green-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-custom-green-500 text-white hover:bg-custom-green-600"
              >
                {doctor ? "Update" : "Create"} Doctor
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
