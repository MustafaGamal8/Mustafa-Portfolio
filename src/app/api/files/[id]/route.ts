import { NextRequest, NextResponse } from 'next/server';
import { BackendFileService } from '@/lib/backend/services/file.service';
import { apiHandler } from '@/lib/backend/api-handler';

const fileService = new BackendFileService();

export const GET = apiHandler(async (request: NextRequest, params?: any) => {
  try {
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    const fileContent = await fileService.getFileContent(id);

    if (!fileContent) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Return the base64 data URL directly
    return NextResponse.json({
      url: fileContent,
      success: true
    });
  } catch (error) {
    console.error('File retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve file' },
      { status: 500 }
    );
  }
});

export const DELETE = apiHandler(async (request: NextRequest, params?: any) => {
  try {
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    const result = await fileService.deleteFile(id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('File deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
});
