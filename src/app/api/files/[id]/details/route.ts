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

    // Get file details from database
    const file = await fileService.findByStringId(id);

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Return file details without base64 content for listing purposes
    const { base64, ...fileDetails } = file;

    return NextResponse.json(fileDetails);
  } catch (error) {
    console.error('File details retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve file details' },
      { status: 500 }
    );
  }
});
