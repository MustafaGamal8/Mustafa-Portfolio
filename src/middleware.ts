import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { handleAuth } from './lib/middleware/auth.middleware'
import { processQueryHeaders } from './lib/backend/query-processor'

// Config object to define which routes should use the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

export async function middleware(request: NextRequest) {
  try {
    // Handle authentication first
    const authResponse = await handleAuth(request)
    if (authResponse) {
      return authResponse
    }

    // Process query parameters if auth check passes
    const processedHeaders = processQueryHeaders(request)
    if (processedHeaders) {
      // Check for query processing errors
      const queryError = processedHeaders.get('x-query-error')
      if (queryError) {
        return new NextResponse(
          JSON.stringify({ error: queryError }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }

      return NextResponse.next({
        request: {
          headers: processedHeaders,
        },
      })
    }

    // If no processing was needed, continue with the original request
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // Return a proper error response instead of silently continuing
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
} 