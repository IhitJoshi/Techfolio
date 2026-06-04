import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginPage = nextUrl.pathname === '/admin/login';
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');

  // Allow API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Admin routes protection
  if (isAdminRoute) {
    // If on login page and logged in, redirect to dashboard
    if (isLoginPage && isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
    }

    // If trying to access protected admin route without auth, redirect to login
    if (!isLoginPage && !isLoggedIn) {
      const loginUrl = new URL('/admin/login', nextUrl);
      loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'],
};
