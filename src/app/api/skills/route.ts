import { NextRequest, NextResponse } from 'next/server';
import { BackendSkillService } from '@/lib/backend/services/skill.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createSkillSchema, updateSkillSchema } from '@/lib/backend/schemas/portfolio.schema';

const skillService = new BackendSkillService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  // Get public skills for portfolio display
  const response = await skillService.getPublicSkills();
  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newSkill = await skillService.create(body);
  return NextResponse.json(newSkill, { status: 201 });
}, { schema: createSkillSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedSkill = await skillService.update(id, data);
  return NextResponse.json(updatedSkill);
}, { schema: updateSkillSchema });
