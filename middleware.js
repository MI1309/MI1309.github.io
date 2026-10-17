import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

function isValidToken(token) {
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return true;
  } catch {
    return false;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('mi_auth')?.value;

  if (pathname === '/admin/project' || pathname.startsWith('/admin/project/')) {
    if (!isValidToken(token)) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    if (isValidToken(token)) {
      const projectUrl = new URL('/admin/project', request.url);
      return NextResponse.redirect(projectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
