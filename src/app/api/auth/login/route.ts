import { NextResponse } from 'next/server';
import { BackendAuthService } from '@/lib/backend/services/auth.service';
import { apiHandler } from '@/lib/backend/api-handler';
import z from 'zod';

const authService = new BackendAuthService();

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginRequest = z.infer<typeof loginSchema>;



export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const result = await authService.login(body);

  // Set JWT token in HTTP-only cookie
  const response = NextResponse.json(
    {
      statusCode: 200,
      message: 'Login successful',
      data: result.user
    }
  );

   response.cookies.set({
    name: 'user',
    value: result.user,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: body.rememberMe ? 7 * 24 * 60 * 60 : undefined
  });
  response.cookies.set({
    name: 'token',
    value: result.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: body.rememberMe ? 7 * 24 * 60 * 60 : undefined
  });

  return response;


}, { schema: loginSchema });
