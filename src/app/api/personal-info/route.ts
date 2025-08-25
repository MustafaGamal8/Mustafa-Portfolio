import { NextRequest, NextResponse } from 'next/server';
import { BackendPersonalInfoService } from '@/lib/backend/services/personal-info.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createPersonalInfoSchema, updatePersonalInfoSchema } from '@/lib/backend/schemas/portfolio-new.schema';

const personalInfoService = new BackendPersonalInfoService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';

  const response = await personalInfoService.findByLanguage(lang, queryOptions);
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newPersonalInfo = await personalInfoService.create(body);
  return NextResponse.json(newPersonalInfo, { status: 201 });
}, { schema: createPersonalInfoSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedPersonalInfo = await personalInfoService.updateById(id, data);
  return NextResponse.json(updatedPersonalInfo);
}, { schema: updatePersonalInfoSchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedPersonalInfo = await personalInfoService.deleteById(id);
  return NextResponse.json(deletedPersonalInfo);
});
