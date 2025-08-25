import { NextRequest, NextResponse } from 'next/server';
import { BackendContactInfoService } from '@/lib/backend/services/contact-info.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createContactInfoSchema, updateContactInfoSchema } from '@/lib/backend/schemas/portfolio-new.schema';

const contactInfoService = new BackendContactInfoService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';
  const primary = url.searchParams.get('primary');

  let response;
  if (primary === 'true') {
    response = await contactInfoService.findPrimaryByLanguage(lang);
  } else {
    response = await contactInfoService.findByLanguage(lang, queryOptions);
  }

  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newContactInfo = await contactInfoService.create(body);
  return NextResponse.json(newContactInfo, { status: 201 });
}, { schema: createContactInfoSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedContactInfo = await contactInfoService.updateById(id, data);
  return NextResponse.json(updatedContactInfo);
}, { schema: updateContactInfoSchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedContactInfo = await contactInfoService.deleteById(id);
  return NextResponse.json(deletedContactInfo);
});
