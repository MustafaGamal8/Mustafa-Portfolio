import { NextRequest, NextResponse } from 'next/server';
import { BackendSkillCategoryService } from '@/lib/backend/services/skill-category.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createSkillCategorySchema, updateSkillCategorySchema } from '@/lib/backend/schemas/portfolio.schema';

const skillCategoryService = new BackendSkillCategoryService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';

  const response = await skillCategoryService.findByLanguage(lang, queryOptions);
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newSkillCategory = await skillCategoryService.create(body);
  return NextResponse.json(newSkillCategory, { status: 201 });
}, { schema: createSkillCategorySchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedSkillCategory = await skillCategoryService.updateById(id, data);
  return NextResponse.json(updatedSkillCategory);
}, { schema: updateSkillCategorySchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedSkillCategory = await skillCategoryService.deleteById(id);
  return NextResponse.json(deletedSkillCategory);
});
