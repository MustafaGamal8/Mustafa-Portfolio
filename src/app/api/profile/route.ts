import { NextRequest, NextResponse } from 'next/server';
import { BackendProfileService } from '@/lib/backend/services/profile.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createProfileSchema, updateProfileSchema } from '@/lib/backend/schemas/portfolio.schema';

const profileService = new BackendProfileService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  // Get public profile for portfolio display
  const response = await profileService.findProfile(queryOptions);
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newProfile = await profileService.create(body);
  return NextResponse.json(newProfile, { status: 201 });
}, { schema: createProfileSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedProfile = await profileService.update(id, data);
  return NextResponse.json(updatedProfile);
}, { schema: updateProfileSchema });
