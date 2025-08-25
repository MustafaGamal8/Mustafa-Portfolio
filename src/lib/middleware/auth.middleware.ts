import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { isPublicRoute } from '@/lib/config/public-routes';

export async function handleAuth(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const method = request.method;
  const isApiRoute = path.startsWith('/api');
  const isPublicPath = isPublicRoute(path, method as any);
  const isProtectedRoute = !isPublicPath && (path.startsWith('/dashboard') || isApiRoute);

  // Check for JWT token in cookies
  const jwtToken = request.cookies.get('token');

  // Check for access token in headers (for API routes)
  const accessToken = request.headers.get('x-access-token') ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  try {
    // If it's a protected route and no tokens exist
    if (isProtectedRoute && !jwtToken && !accessToken) {
      if (isApiRoute) {
        // Return JSON response for API routes
        return new NextResponse(
          JSON.stringify({
            error: 'Unauthorized',
            message: 'Authentication required'
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      // Redirect to login for non-API routes
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    // Validate JWT token if it exists
    if (jwtToken && !isPublicPath) {
      try {
        // Verify the JWT token using your JWT secret
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(jwtToken.value, secret);

        // If it's the login page and token is valid, redirect to dashboard
        if (path === '/auth/login') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch (error) {
        // If JWT token is invalid
        if (isApiRoute) {
          // Return JSON response for API routes
          return new NextResponse(
            JSON.stringify({
              error: 'Unauthorized',
              message: 'Invalid or expired JWT token'
            }),
            {
              status: 401,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
        // Clear token and redirect to login for non-API routes
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        response.cookies.delete('token');
        return response;
      }
    }

    // For access token validation, we'll let the API routes handle it
    // since Prisma is not available in Edge Runtime
    if (accessToken && isApiRoute) {
      // Add access token to headers for API routes to validate
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-access-token', accessToken);

      // Create a new request with the updated headers
      const modifiedRequest = new NextRequest(request, {
        headers: requestHeaders,
      });

      return NextResponse.next({
        request: modifiedRequest,
      });
    }

    return null; // Continue with the request
  } catch (error) {
    console.error('Auth middleware error:', error);
    if (isApiRoute) {
      // Return JSON response for API routes
      return new NextResponse(
        JSON.stringify({
          error: 'Internal Server Error',
          message: 'Authentication failed'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    // Redirect to login with error message for non-API routes
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('error', 'Authentication failed');
    return NextResponse.redirect(loginUrl);
  }
} 