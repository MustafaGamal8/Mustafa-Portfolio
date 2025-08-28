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

    // Check if client wants JSON response (for API calls) or image response (for img src)
    const accept = request.headers.get('Accept');
    const isApiCall = accept?.includes('application/json');

    if (isApiCall) {
      // Return JSON for API calls
      return NextResponse.json({
        url: fileContent,
        success: true
      });
    } else {
      // Return actual image data for img src usage
      if (fileContent.startsWith('data:')) {
        // Extract base64 data and mime type
        const [mimeInfo, base64Data] = fileContent.split(',');
        const mimeType = mimeInfo.match(/data:([^;]+)/)?.[1] || 'image/png';

        // Convert base64 to buffer
        const buffer = Buffer.from(base64Data, 'base64');

        return new NextResponse(buffer, {
          headers: {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }

    return NextResponse.json({ error: 'Invalid file format' }, { status: 400 });
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
