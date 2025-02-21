import { NextResponse, type NextRequest } from 'next/server';
import { mockDB } from '@/lib/mock-db';
import { rateLimiter } from './middleware/rate-limit';

export async function middleware(request: NextRequest) {
  // Apply rate limiting
  const rateLimit = rateLimiter(request);
  if (rateLimit.status === 429) return rateLimit;

  const response = NextResponse.next();
  
  // Get auth token from cookie
  const token = request.cookies.get('mock_auth_token')?.value;
  const { user } = token ? await mockDB.getUser(token) : { user: null };

  // Protected routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Auth routes - redirect to dashboard if already authenticated
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};