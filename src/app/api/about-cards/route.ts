import { NextRequest, NextResponse } from 'next/server';
import { BackendAboutCardService } from '@/lib/backend/services/about-card.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createAboutCardSchema, updateAboutCardSchema } from '@/lib/backend/schemas/portfolio-new.schema';

const aboutCardService = new BackendAboutCardService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';

  const response = await aboutCardService.findByLanguage(lang, queryOptions);
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newAboutCard = await aboutCardService.create(body);
  return NextResponse.json(newAboutCard, { status: 201 });
}, { schema: createAboutCardSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedAboutCard = await aboutCardService.updateById(id, data);
  return NextResponse.json(updatedAboutCard);
}, { schema: updateAboutCardSchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedAboutCard = await aboutCardService.deleteById(id);
  return NextResponse.json(deletedAboutCard);
});
