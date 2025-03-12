import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login - Medical Admin Dashboard",
  description: "Login to access the medical admin dashboard",
}

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-custom-white">
      <div className="relative hidden h-full flex-col bg-custom-green-100 p-10 lg:flex">
        <div className="absolute inset-0 bg-custom-green-800" />
        <div className="relative z-20 flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold text-white">VetAdmin</h1>
        </div>
      </div>
      <div className="lg:p-8 p-4 md:p-6 bg-custom-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px] lg:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-6xl font-semibold tracking-tight text-custom-green-800">
              Welcome
            </h1>
            <p className="text-sm md:text-base lg:text-xl text-custom-green-600">
              Enter your credentials to access the dashboard
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}