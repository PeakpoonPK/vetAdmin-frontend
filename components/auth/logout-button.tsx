"use client"

import { Button } from "@/components/ui/button"
import { authService } from "@/src/services/auth"

export function LogoutButton() {
  const handleLogout = () => {
    authService.logout()
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
