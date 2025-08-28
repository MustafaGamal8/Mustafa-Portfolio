import { NextRequest, NextResponse } from 'next/server';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { z } from 'zod';
import { IQueryOptions } from '@/interfaces/query.interface';
import { processQueryOptions } from './query-processor';

type ApiHandler = (req: NextRequest, params?: any, queryOptions?: IQueryOptions) => Promise<NextResponse>;

interface ApiHandlerOptions {
  schema?: z.ZodSchema;
  processQuery?: boolean;
}

function getPrismaErrorMessage(code: string, meta?: Record<string, any>): { status: number; message: string } {
  switch (code) {
    case 'P2000':
      return {
        status: 400,
        message: 'The provided value for the column is too long'
      };
    case 'P2002':
      return {
        status: 409,
        message: `A record with this ${meta?.target?.[0] || 'field'} already exists`
      };
    case 'P2003':
      return {
        status: 400,
        message: 'Foreign key constraint failed'
      };
    case 'P2025':
      return {
        status: 404,
        message: 'Record not found'
      };
    case 'P2014':
      return {
        status: 409,
        message: 'The change you are trying to make would violate the required relation'
      };
    case 'P2016':
      return {
        status: 400,
        message: 'Query interpretation error'
      };
    default:
      return {
        status: 400,
        message: 'Database error'
      };
  }
}

export function apiHandler(handler: ApiHandler, options: ApiHandlerOptions = {}): ApiHandler {
  return async (req: NextRequest, context: { params: Promise<Record<string, string>> }) => {
    try {
      // Process query options if enabled
      const queryOptions = options.processQuery ? processQueryOptions(req) : undefined;

      // Await the params object
      const params = await context.params;

      // Add userId from x-user-id header if present
      const userId = req.headers.get('x-user-id');
      if (userId) params.userId = userId;



      // Validate request body if schema is provided and method is POST or PUT
      if (options.schema && (req.method === 'POST' || req.method === 'PUT')) {
        const body = await req.json();
        const validatedData = await options.schema.parseAsync(body);
        // Create new request with validated data
        const newRequest = new NextRequest(req.url, {
          headers: req.headers,
          method: req.method,
          body: JSON.stringify(validatedData)
        });
        return await handler(newRequest, params, queryOptions);
      }

      return await handler(req, params, queryOptions);
    } catch (error) {
      let status = 500;
      let message = 'Internal server error';
      let detail = null;

      if (error instanceof z.ZodError) {
        status = 400;
        message = 'Validation failed';
        detail = {
          type: 'ValidationError',
          errors: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        };
      }
      else if (error instanceof ApiError) {
        const errorResponse = error.toJSON();
        status = error.statusCode;
        message = errorResponse.error.message;
        detail = errorResponse.error.details;
      }
      else if (error instanceof PrismaClientValidationError) {
        status = 400;
        message = 'Invalid data provided';

        const errorLines = error.message.split('\n').map(line => line.trim()).filter(Boolean);
        detail = {
          type: 'ValidationError',
          error: errorLines[0] || 'Validation error occurred',
          detailsUrl: errorLines
        };
      }
      else if (error instanceof PrismaClientKnownRequestError) {
        const { status: errorStatus, message: errorMessage } = getPrismaErrorMessage(error.code, error.meta);
        status = errorStatus;
        message = errorMessage;
        detail = {
          code: error.code,
          target: error.meta?.target || null,
          error: error.message
        };
      }
      else if (error instanceof Error) {
        message = 'An unexpected error occurred';
        detail = {
          type: error.constructor.name,
          error: error.message
        };
      }

      const responseBody: any = {
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: req.url
      };

      if (detail && Object.keys(detail).length > 0) {
        responseBody.detail = detail;
      }

      return NextResponse.json(responseBody, { status });
    }
  };
} 