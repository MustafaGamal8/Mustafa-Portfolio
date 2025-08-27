import { NextRequest, NextResponse } from 'next/server';
import { BackendFileService } from '@/lib/backend/services/file.service';
import { apiHandler } from '@/lib/backend/api-handler';

const fileService = new BackendFileService();

export const POST = apiHandler(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to buffer for our service
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedFile = {
      originalname: file.name,
      buffer: buffer,
      mimetype: file.type,
      size: file.size
    };

    const result = await fileService.uploadFile(uploadedFile);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
});
