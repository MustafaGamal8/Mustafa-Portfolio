import { NextRequest, NextResponse } from 'next/server';
import { BackendFileService } from '@/lib/backend/services/file.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { z } from 'zod';

const fileService = new BackendFileService();

// Schema for updating logo by name
const updateLogoByNameSchema = z.object({
  name: z.string().min(1, 'Logo name is required'),
  base64: z.string().min(1, 'Base64 data is required')
});

// Get logo by name
export const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      { error: 'Logo name is required' },
      { status: 400 }
    );
  }

  const logo = await fileService.getFileByName(name);

  if (!logo) {
    return NextResponse.json(
      { error: 'Logo not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(logo);
});

// Update logo base64 by name
export const PUT = apiHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { name, base64 } = body;

  // Find logo by name
  const existingLogo = await fileService.getFileByName(name);

  if (!existingLogo) {
    return NextResponse.json(
      { error: 'Logo not found' },
      { status: 404 }
    );
  }

  // Update the base64 content
  const updatedLogo = await fileService.updateFileBase64(existingLogo.id, base64);

  return NextResponse.json(updatedLogo);
}, { schema: updateLogoByNameSchema });