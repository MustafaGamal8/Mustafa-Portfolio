import { NextResponse } from 'next/server';
import { apiHandler } from '@/lib/backend/api-handler';



export const POST = apiHandler(async () => {
  const response = NextResponse.json({
    statusCode: 200,
    message: 'Logged out successfully'
  });

  // Clear the auth token cookie
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0 // Expire immediately
  });

  return response;
}); 