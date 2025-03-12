import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // For demonstration, we'll just check if the path starts with /dashboard
  // In a real application, you would verify the authentication token
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Add your authentication logic here
    // For now, we'll just let all requests through
    return NextResponse.next()
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: '/dashboard/:path*',
}