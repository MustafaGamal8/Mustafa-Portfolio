import { NextRequest, NextResponse } from 'next/server';
import { BackendProjectService } from '@/lib/backend/services/project.service';
import { apiHandler } from '@/lib/backend/api-handler';

const projectService = new BackendProjectService();

export const PUT = apiHandler(async (request, { params }) => {
  const { id } = params;
  const toggledProject = await projectService.toggleFeatured(id as string);
  return NextResponse.json(toggledProject);
});
