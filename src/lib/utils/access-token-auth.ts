import { NextRequest } from 'next/server';

export interface TokenInfo {
  userId: string;
  email: string;
  role: string;
}

export function getTokenInfo(req: NextRequest): TokenInfo | null {
  // For now, return a mock token info
  // In a real implementation, you would verify JWT tokens here
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  // Mock implementation - replace with actual JWT verification
  return {
    userId: 'user_1',
    email: 'admin@example.com',
    role: 'ADMIN'
  };
}
