// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let response = NextResponse.next()
  
  if (!request.cookies.has('theme')) {
    response.cookies.set('theme', 'light', { path: '/' })
  }
  
  return response
}
