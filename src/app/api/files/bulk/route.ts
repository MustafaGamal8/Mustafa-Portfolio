import { NextRequest, NextResponse } from 'next/server';
import { BackendFileService } from '@/lib/backend/services/file.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { z } from 'zod';

const fileService = new BackendFileService();

// Bulk delete files schema
const bulkDeleteFilesSchema = z.object({
  ids: z.array(z.string().min(1, 'File ID is required'))
});

// Update file URL schema  
const updateFileUrlSchema = z.object({
  id: z.string().min(1, 'File ID is required'),
  baseUrl: z.string().url('Valid base URL is required')
});

// Bulk delete files
export const DELETE = apiHandler(async (request) => {
  const body = await request.json();
  const result = await fileService.bulkDeleteFiles(body.ids);
  return NextResponse.json(result);
}, { schema: bulkDeleteFilesSchema });

// Update file base URL
export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, baseUrl } = body;
  const result = await fileService.updateFileBaseUrl(id, baseUrl);
  return NextResponse.json(result);
}, { schema: updateFileUrlSchema });
