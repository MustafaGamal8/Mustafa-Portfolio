import { NextRequest, NextResponse } from 'next/server';
import { BackendAuthService } from '@/lib/backend/services/auth.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { z } from 'zod';

const authService = new BackendAuthService();

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const { action, ...data } = body;

  switch (action) {
    case 'register':
      const validatedRegisterData = registerSchema.parse(data);
      const newUser = await authService.register(validatedRegisterData);
      return NextResponse.json(newUser, { status: 201 });

    case 'login':
      const validatedLoginData = loginSchema.parse(data);
      const loginResult = await authService.login(validatedLoginData);
      return NextResponse.json(loginResult);

    case 'verify':
      const { token } = data;
      if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 });
      }
      const user = await authService.verifyToken(token);
      return NextResponse.json({ user });

    case 'change-password':
      const { userId, oldPassword, newPassword } = data;
      if (!userId || !oldPassword || !newPassword) {
        return NextResponse.json({
          error: 'userId, oldPassword, and newPassword are required'
        }, { status: 400 });
      }
      const result = await authService.changePassword(userId, oldPassword, newPassword);
      return NextResponse.json(result);

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
});

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  // Get all users (admin only)
  const users = await authService.getAllUsers(queryOptions);
  return NextResponse.json(users);
}, { processQuery: true });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const deletedUser = await authService.deleteUser(userId);
  return NextResponse.json(deletedUser);
});
