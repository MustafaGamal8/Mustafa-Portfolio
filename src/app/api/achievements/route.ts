import { NextRequest, NextResponse } from 'next/server';
import { BackendAchievementService } from '@/lib/backend/services/achievement.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createAchievementSchema, updateAchievementSchema } from '@/lib/backend/schemas/portfolio-new.schema';

const achievementService = new BackendAchievementService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';

  const response = await achievementService.findByLanguage(lang, queryOptions);
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newAchievement = await achievementService.create(body);
  return NextResponse.json(newAchievement, { status: 201 });
}, { schema: createAchievementSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedAchievement = await achievementService.updateById(id, data);
  return NextResponse.json(updatedAchievement);
}, { schema: updateAchievementSchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedAchievement = await achievementService.deleteById(id);
  return NextResponse.json(deletedAchievement);
});
