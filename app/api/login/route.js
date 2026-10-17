import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const hash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    if (!hash || !jwtSecret) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const ok = await bcrypt.compare(password, hash);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: '1h' });
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: 'mi_auth',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 3600,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
