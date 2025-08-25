import { NextResponse } from 'next/server';
import { BackendAuthService } from '@/lib/backend/services/auth.service';
import { apiHandler } from '@/lib/backend/api-handler';
import z from 'zod';

const authService = new BackendAuthService();

const changePasswordSchema = z.object({
  userId: z.string(),
  oldPassword: z.string().min(8, 'Old password must be at least 8 characters'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});


export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;



export const POST = apiHandler(async (request) => {
  const body = await request.json();
  await authService.changePassword(body.userId, body.oldPassword, body.newPassword);

  // Set JWT token in HTTP-only cookie
  const response = NextResponse.json(
    {
      statusCode: 200,
      message: 'Password changed successfully'
    }
  );

  return response;
}, { schema: changePasswordSchema });

