import { NextRequest, NextResponse } from 'next/server';
import { BackendContactInfoService } from '@/lib/backend/services/contact-info.service';
import { apiHandler } from '@/lib/backend/api-handler';

const contactInfoService = new BackendContactInfoService();

export const PUT = apiHandler(async (request, { params }) => {
  const { id } = params;
  const primaryContactInfo = await contactInfoService.setPrimary(id as string);
  return NextResponse.json(primaryContactInfo);
});
