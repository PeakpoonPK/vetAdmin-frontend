"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
import { Toaster, toast } from 'sonner'
import { Icons } from "@/components/icons"
import { authService } from "@/src/services/auth"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      console.log(values)
      const response = await authService.login(values.email, values.password)
      localStorage.setItem("token", response.token)
      toast.success('Logged in successfully')
      router.push("/dashboard")
    } catch (error) {

      toast.error('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base md:text-lg text-custom-green-800">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    disabled={isLoading}
                    className="h-12 text-base md:text-lg p-4 bg-custom-white border-custom-green-300 focus:border-custom-green-500 text-custom-green-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm md:text-base text-custom-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base md:text-lg text-custom-green-800">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="h-12 text-base md:text-lg p-4 bg-custom-white border-custom-green-300 focus:border-custom-green-500 text-custom-green-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm md:text-base text-custom-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 text-base md:text-lg bg-custom-green-500 hover:bg-custom-green-600 text-custom-white"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
            )}
            Sign In
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  )
}