import { NextRequest, NextResponse } from 'next/server';
import { BackendHeroContentService } from '@/lib/backend/services/hero-content.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createHeroContentSchema, updateHeroContentSchema } from '@/lib/backend/schemas/portfolio.schema';

const heroContentService = new BackendHeroContentService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';

  const response = await heroContentService.findByLanguage(lang, queryOptions);
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newHeroContent = await heroContentService.create(body);
  return NextResponse.json(newHeroContent, { status: 201 });
}, { schema: createHeroContentSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedHeroContent = await heroContentService.updateById(id, data);
  return NextResponse.json(updatedHeroContent);
}, { schema: updateHeroContentSchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedHeroContent = await heroContentService.deleteById(id);
  return NextResponse.json(deletedHeroContent);
});
