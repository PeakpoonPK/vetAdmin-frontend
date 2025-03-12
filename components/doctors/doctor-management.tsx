"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DoctorList } from "./doctor-list"
import { DoctorForm } from "components/doctors/doctor-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"

export function DoctorManagement() {
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [searchDate, setSearchDate] = useState<Date | undefined>()
  const [searchTime, setSearchTime] = useState<string>("any")

  // Add list of specialties
  const specialties = [
    "All",
    "Cardiology",
    "Dermatology",
  ]

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value)
  }

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM"
  ]

  return (
    <div className="space-y-6 bg-custom-white p-6 rounded-lg shadow-sm border border-custom-green-200">
      <div className="flex flex-col gap-6">
        {/* Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Search */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name-search">Search by name</Label>
            <Input
              id="name-search"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-custom-white border-custom-green-300 focus:border-custom-green-500"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="specialty-select">Specialty</Label>
            <Select
              value={selectedSpecialty}
              onValueChange={handleSpecialtyChange}
            >
              <SelectTrigger id="specialty-select" className="border-custom-green-300">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty.toLowerCase()}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-custom-green-300",
                    !searchDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {searchDate ? format(searchDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={searchDate}
                  onSelect={setSearchDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Time Filter */}
          {searchDate && <div className="flex flex-col gap-2">
            <Label>Time</Label>
            <Select
              value={searchTime}
              onValueChange={setSearchTime}
              disabled={!searchDate}
            >
              <SelectTrigger className="border-custom-green-300">
                <SelectValue placeholder="Select time">
                  {searchTime === "any" ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Any time
                    </div>
                  ) : searchTime}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Any time
                  </div>
                </SelectItem>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>}
        </div>

        Action Buttons
        {/* <div className="flex justify-end">
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-custom-green-500 text-white hover:bg-custom-green-600"
          >
            Add Doctor
          </Button>
        </div> */}
      </div>

      {/* Content */}
      {isCreating ? (
        <DoctorForm onClose={() => setIsCreating(false)} />
      ) : (
        <DoctorList
          searchQuery={searchQuery}
          selectedSpecialty={selectedSpecialty}
          searchDate={searchDate}
          searchTime={searchTime}
          setSearchTime={setSearchTime}
          onEdit={() => { }}
        />
      )}
    </div>
  )
}
