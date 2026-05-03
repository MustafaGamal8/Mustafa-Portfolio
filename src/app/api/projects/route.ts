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

  // If array -> treat as bulk create without schema validation
  if (Array.isArray(body)) {
    // Detect bilingual entries with AR/EN and expand into per-language create payloads
    const flattened: any[] = [];

    for (const entry of body) {
      if (entry.EN || entry.AR) {
        const baseFields = { ...entry };
        delete (baseFields as any).EN;
        delete (baseFields as any).AR;

        if (entry.EN) {
          flattened.push({ ...baseFields, ...entry.EN, lang: 'EN' });
        }
        if (entry.AR) {
          flattened.push({ ...baseFields, ...entry.AR, lang: 'AR' });
        }
      } else {
        // assume already in single-language create shape
        flattened.push(entry);
      }
    }

    // Validate each item against createProjectSchema to surface helpful errors
    try {
      const validated = await Promise.all(flattened.map((p) => createProjectSchema.parseAsync(p)));
      const result = await projectService.bulkCreate(validated as any[]);
      return NextResponse.json(result, { status: 201 });
    } catch (err) {
      // Let apiHandler format Zod errors
      throw err;
    }
  }

  // Single object -> validate against schema then create
  const validated = await createProjectSchema.parseAsync(body);
  const newProject = await projectService.create(validated as any);
  return NextResponse.json(newProject, { status: 201 });
});

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
