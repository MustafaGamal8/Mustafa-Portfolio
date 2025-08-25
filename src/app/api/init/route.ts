import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/lib/backend/api-handler';
import { BackendUsersService } from '@/lib/backend/services/users.service';

const userService = new BackendUsersService();

export const POST = apiHandler(async (request) => {
  
  await userService.createDefaultRootUser();

  return NextResponse.json({
    message: 'System initialized successfully',
  }, { status: 201 });
}, );
