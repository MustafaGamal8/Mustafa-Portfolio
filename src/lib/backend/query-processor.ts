import { NextRequest } from 'next/server';
import { IQueryOptions } from '@/interfaces/query.interface';
import { processPagination } from '../middleware/pagination';
import { processQueryFilters } from '../middleware/query-filter';
import { processSort } from '../middleware/sort';
import { processFieldSelection } from '../middleware/field-selection';
import { processNestedRelations } from '../middleware/nested-relations';

/**
 * Converts processed headers into Prisma query options.
 * This is used in the API handler to convert the headers set by processQueryHeaders
 * into a format that can be used with Prisma queries.
 * 
 * @param req - The NextRequest object containing processed headers
 * @returns IQueryOptions object ready to be used with Prisma
 */
export function processQueryOptions(req: NextRequest): IQueryOptions {
  const filters = req.headers.get('x-processed-filters');
  const pagination = req.headers.get('x-pagination');
  const sort = req.headers.get('x-sort');
  const fields = req.headers.get('x-field-selection');
  const include = req.headers.get('x-nested-relations');
  const metaParam = req.nextUrl.searchParams.get('meta');

  return {
    meta: metaParam === null ? undefined : metaParam === 'true',
    pagination: pagination ? JSON.parse(pagination) : { page: 1, limit: 10 },
    include: include ? JSON.parse(include) : {},
    where: filters ? JSON.parse(filters) : {},
    orderBy: sort ? JSON.parse(sort) : {},
    select: fields ? JSON.parse(fields) : undefined
  };
}

/**
 * Processes raw query parameters from the URL and stores them in request headers.
 * This is used in the middleware to validate and format query parameters before
 * they reach the API handler.
 * 
 * The processed headers are then used by processQueryOptions to create Prisma query options.
 * 
 * @param req - The NextRequest object containing raw query parameters
 * @returns Headers object with processed query parameters or null if processing is not needed
 */
export function processQueryHeaders(req: NextRequest): Headers | null {
  // Process both GET and POST requests
  if (!['GET'].includes(req.method)) {
    return null;
  }

  const requestHeaders = new Headers(req.headers);
  const searchParams = new URL(req.url).searchParams;

  try {
    // Apply query filters
    const filters = processQueryFilters(searchParams);
    if (filters) {
      if (!isValidJSON(filters)) {
        throw new Error('Invalid filter parameters');
      }
      requestHeaders.set('x-processed-filters', JSON.stringify(filters));
    }

    // Apply pagination
    const pagination = processPagination(searchParams);
    if (pagination) {
      if (!isValidPagination(pagination)) {
        throw new Error('Invalid pagination parameters');
      }
      requestHeaders.set('x-pagination', JSON.stringify(pagination));
    }

    // Apply sorting
    const sort = processSort(searchParams);
    if (sort) {
      if (!isValidSort(sort)) {
        throw new Error('Invalid sort parameters');
      }
      requestHeaders.set('x-sort', JSON.stringify(sort));
    }

    // Apply field selection
    const fields = processFieldSelection(searchParams);
    if (fields) {
      if (!isValidFieldSelection(fields)) {
        throw new Error('Invalid field selection parameters');
      }
      requestHeaders.set('x-field-selection', JSON.stringify(fields));
    }

    // Apply nested relations
    const include = processNestedRelations(searchParams);
    if (include) {
      if (!isValidNestedRelations(include)) {
        throw new Error('Invalid nested relations parameters');
      }
      requestHeaders.set('x-nested-relations', JSON.stringify(include));
    }

    return requestHeaders;
  } catch (error) {
    console.error('Query processing error:', error);
    requestHeaders.set('x-query-error', error instanceof Error ? error.message : 'Unknown error');
    return requestHeaders;
  }
}

// Validation helper functions
function isValidJSON(data: any): boolean {
  try {
    JSON.stringify(data);
    return true;
  } catch {
    return false;
  }
}

function isValidPagination(pagination: any): boolean {
  return (
    typeof pagination === 'object' &&
    typeof pagination.page === 'number' &&
    typeof pagination.limit === 'number' &&
    pagination.page > 0 &&
    pagination.limit > 0
  );
}

function isValidSort(sort: any): boolean {
  // Accepts either an array of objects or a single object
  if (Array.isArray(sort)) {
    return sort.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        Object.values(item).every(
          (value) => value === 'asc' || value === 'desc'
        )
    );
  }
  if (typeof sort === 'object' && sort !== null) {
    return Object.values(sort).every(
      (value) => value === 'asc' || value === 'desc'
    );
  }
  return false;
}

function isValidFieldSelection(fields: any): boolean {
  if (typeof fields !== 'object' || fields === null) {
    return false;
  }

  // Helper function to validate nested objects
  function validateFieldObject(obj: any): boolean {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    return Object.entries(obj).every(([key, value]) => {
      if (typeof value === 'boolean') {
        return value === true;
      }
      if (typeof value === 'object') {
        return validateFieldObject(value);
      }
      return false;
    });
  }

  return validateFieldObject(fields);
}

function isValidNestedRelations(include: any): boolean {
  if (typeof include !== 'object' || include === null) {
    return false;
  }

  // Helper function to validate nested objects
  function validateIncludeObject(obj: any): boolean {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    return Object.entries(obj).every(([key, value]) => {
      if (value === null) return false;
      if (typeof value === 'boolean') {
        return value === true;
      }
      if (typeof value === 'object' && 'include' in value) {
        return validateIncludeObject(value.include);
      }
      return false;
    });
  }

  return validateIncludeObject(include);
} 