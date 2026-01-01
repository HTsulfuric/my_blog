import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'counter_auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /tools/counter but allow /tools/counter/login
  if (pathname.startsWith('/tools/counter') && !pathname.startsWith('/tools/counter/login')) {
    const authCookie = request.cookies.get(COOKIE_NAME);

    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/tools/counter/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/tools/counter/:path*',
};
