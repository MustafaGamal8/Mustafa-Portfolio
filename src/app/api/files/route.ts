import { NextRequest, NextResponse } from 'next/server';
import { BackendFileService } from '@/lib/backend/services/file.service';
import { apiHandler } from '@/lib/backend/api-handler';

const fileService = new BackendFileService();

export const GET = apiHandler(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';

    // Build where clause for search
    const where = search
      ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { type: { contains: search, mode: 'insensitive' } }
        ]
      }
      : {};

    // Get files with pagination using findMany
    const result = await fileService.findMany({
      where,
      pagination: { page, limit },
      select: {
        id: true,
        name: true,
        url: true,
        path: true,
        type: true,
        size: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      files: result.data,
      total: result.meta.total,
      totalPages: result.meta.totalPages || Math.ceil(result.meta.total / limit),
      currentPage: result.meta.page || page,
      hasNextPage: result.meta.hasNextPage || false,
      hasPrevPage: result.meta.hasPrevPage || false
    });
  } catch (error) {
    console.error('Files listing error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
});

// Upload file (including logos)
export const POST = apiHandler(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const logoName = formData.get('logoName') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert File to UploadedFile format
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadedFile = {
      originalname: file.name,
      mimetype: file.type,
      size: file.size,
      buffer: buffer
    };

    let result;

    // If logoName is provided, use logo upload/update method
    if (logoName) {
      result = await fileService.uploadOrUpdateLogo(uploadedFile, logoName);
    } else {
      // Regular file upload
      result = await fileService.uploadFile(uploadedFile);
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
});
