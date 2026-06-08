import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (!req.cookies.get('inv_ok')) {
    return NextResponse.redirect(new URL('/no-invitado', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
