import { NextRequest, NextResponse } from 'next/server';
import { BackendProjectService } from '@/lib/backend/services/project.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createProjectSchema, updateProjectSchema } from '@/lib/backend/schemas/portfolio.schema';

const projectService = new BackendProjectService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';
  const featured = url.searchParams.get('featured');
  const category = url.searchParams.get('category');

  let response;
  if (featured === 'true') {
    response = await projectService.findFeaturedByLanguage(lang, queryOptions);
  } else if (category) {
    response = await projectService.findByCategory(lang, category, queryOptions);
  } else {
    response = await projectService.findByLanguage(lang, queryOptions);
  }

  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newProject = await projectService.create(body);
  return NextResponse.json(newProject, { status: 201 });
}, { schema: createProjectSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedProject = await projectService.updateById(id, data);
  return NextResponse.json(updatedProject);
}, { schema: updateProjectSchema });

export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const { id } = body;
  const deletedProject = await projectService.deleteById(id);
  return NextResponse.json(deletedProject);
});
