"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  Calendar,
  UserCircle,
  Settings,
  LayoutDashboard,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { authService } from "@/src/services/auth"

const routes = [
  // {
  //   label: 'Dashboard',
  //   icon: LayoutDashboard,
  //   href: '/dashboard',
  // },
  {
    label: 'Doctors',
    icon: UserCircle,
    href: '/dashboard/doctors',
  },
  // {
  //   label: 'Doctors Schedule',
  //   icon: Users,
  //   href: '/dashboard/schedule',
  // },
  {
    label: 'Appointments',
    icon: Calendar,
    href: '/dashboard/appointments',
  },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/dashboard/settings',
  // },
]

export function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    authService.logout()
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-custom-green-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-4xl font-bold">VetAdmin</h1>
        </Link>
        <div className="space-y-1 gap-4 flex flex-col">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={
                cn(
                  "w-full justify-start",
                  pathname === route.href ? "bg-white/50" : "hover:bg-white/10"
                )}
              asChild
            >
              <Link href={route.href} className="text-xl">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start hover:bg-white/10 text-lg">
          <LogOut className="h-6 w-6 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}