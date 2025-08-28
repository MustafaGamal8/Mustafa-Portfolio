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
