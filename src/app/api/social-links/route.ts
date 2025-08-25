import { NextRequest, NextResponse } from 'next/server';
import { BackendSocialLinkService } from '@/lib/backend/services/social-link.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createSocialLinkSchema, updateSocialLinkSchema } from '@/lib/backend/schemas/portfolio-new.schema';

const socialLinkService = new BackendSocialLinkService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';

  const response = await socialLinkService.findByLanguage(lang, queryOptions);
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newSocialLink = await socialLinkService.create(body);
  return NextResponse.json(newSocialLink, { status: 201 });
}, { schema: createSocialLinkSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedSocialLink = await socialLinkService.updateById(id, data);
  return NextResponse.json(updatedSocialLink);
}, { schema: updateSocialLinkSchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedSocialLink = await socialLinkService.deleteById(id);
  return NextResponse.json(deletedSocialLink);
});
