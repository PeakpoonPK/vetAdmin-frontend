"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Doctor } from "@/types/api"
import _ from 'lodash'

interface DoctorSlotsDialogProps {
  doctor: Doctor
  availableSlots: { date: string; time: string[] }[]
  slotDoctor: any[]
  selectedDate: Date | undefined
  onViewSlots: (doctor: Doctor) => void
  setSelectedDate: (date: Date | undefined) => void
}

export function DoctorSlotsDialog({
  doctor,
  availableSlots,
  slotDoctor,
  selectedDate,
  onViewSlots,
  setSelectedDate
}: DoctorSlotsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-custom-green-300 hover:bg-custom-green-50"
          onClick={() => onViewSlots(doctor)}
        >
          View Slots
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[720px] sm:max-h-[600px]">
        <DialogHeader className="w-full flex items-center justify-center">
          <DialogTitle className="text-custom-green-800">
            Available Slots for Dr. {doctor.firstName} {doctor.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 w-full">
          <div className="flex space-y-4 gap-10">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            {selectedDate && (
              <div className="mt-10 bg-gray-100 p-4 rounded-md w-full flex flex-col gap-4 items-center">
                <h3 className="font-medium text-custom-green-700">
                  Available Times for {selectedDate.toLocaleDateString()}:
                </h3>
                <div className="mt-2 overflow-y-auto" style={{ maxHeight: '280px' }}>
                  <Table>
                    <TableHeader className="bg-custom-green-50">
                      <TableRow>
                        <TableHead className="text-custom-green-800">Time</TableHead>
                        <TableHead className="text-custom-green-800">Status</TableHead>
                        <TableHead className="text-custom-green-800">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!_.isEmpty(availableSlots.filter((s) => new Date(s.date).toLocaleDateString() === selectedDate.toLocaleDateString())) ? (
                        availableSlots
                          .filter(slot => slot.date === selectedDate.toLocaleDateString())
                          .flatMap(slot => slot.time)
                          .map((time) => {
                            const isUnavailable = slotDoctor.some(slot =>
                              new Date(slot.date).toLocaleDateString() === selectedDate.toLocaleDateString() &&
                              new Date(slot.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) === time
                            );
                            return (
                              <TableRow key={time}>
                                <TableCell className="font-medium">{time}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isUnavailable ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                    {isUnavailable ? 'Unavailable' : 'Available'}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-custom-green-300 hover:bg-custom-green-50"
                                    disabled={isUnavailable}
                                  >
                                    Book
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center">
                            No available slots for the selected date.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
