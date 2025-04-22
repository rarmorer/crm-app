import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Allow all authentication-related URLs to pass through
  if (req.nextUrl.pathname.startsWith('/api/auth') || 
      req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next();
  }
  
  const token = await getToken({ req });
  
  // Redirect unauthenticated users to the login page
  if (!token) {
    const loginUrl = new URL('/api/auth/signin', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add paths that should be protected
    "/accounts/:path*",
    "/call-log/:path*",
    // Exclude public assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};