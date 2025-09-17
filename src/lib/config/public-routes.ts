type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RouteConfig {
  methods?: HttpMethod[];
  description?: string;
  isDynamic?: boolean;
}

type PublicRoutesConfig = {
  [key: string]: RouteConfig;
};

export const PUBLIC_ROUTES: PublicRoutesConfig = {
  // Auth routes
  '/api/auth/login': {
    methods: ['POST'],
    description: 'User login endpoint'
  },

  '/api/init': {
    methods: ['POST'],
    description: 'Application initialization'
  },

  '/api/portfolio': {
    methods: ['POST'],
    description: 'Public portfolio'
  },

  // Personal info for embed widget
  '/api/personal-info': {
    methods: ['GET'],
    description: 'Public personal info access for embed widget'
  },

  // Logo access for embed widget
  '/api/files/logo': {
    methods: ['GET'],
    description: 'Public logo access for embed widget'
  },

  // File access route
  '/api/files/[id]': {
    methods: ['GET'],
    description: 'Public file access',
    isDynamic: true
  }
} as const;

export function isPublicRoute(path: string, method: HttpMethod = 'GET'): boolean {
  // Check if the path matches any public route pattern
  for (const [publicPath, config] of Object.entries(PUBLIC_ROUTES)) {
    const routePattern = config.isDynamic
      ? publicPath.replace(/\[.*?\]/g, '[^/]+')
      : publicPath;
    const regex = new RegExp(`^${routePattern}$`);

    if (regex.test(path)) {
      // If no methods specified, only GET is allowed
      const allowedMethods = config.methods || ['GET'];
      return allowedMethods.includes(method);
    }
  }
  return false;
} 