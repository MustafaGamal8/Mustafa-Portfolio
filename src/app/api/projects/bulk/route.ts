import { NextRequest, NextResponse } from 'next/server';
import { BackendProjectService } from '@/lib/backend/services/project.service';
import { apiHandler } from '@/lib/backend/api-handler';
import {
  bulkCreateProjectsSchema,
  bulkUpdateProjectsSchema,
  bulkDeleteProjectsSchema
} from '@/lib/backend/schemas/portfolio.schema';

const projectService = new BackendProjectService();

// Bulk create projects
export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const result = await projectService.bulkCreate(body);
  return NextResponse.json(result, { status: 201 });
}, { schema: bulkCreateProjectsSchema });

// Bulk update projects
export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const result = await projectService.bulkUpdate(body);
  return NextResponse.json(result);
}, { schema: bulkUpdateProjectsSchema });

// Bulk delete projects
export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const result = await projectService.bulkDelete(body);
  return NextResponse.json(result);
}, { schema: bulkDeleteProjectsSchema });
