
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('chef_session');
  
  // Protect all /manage routes
  if (request.nextUrl.pathname.startsWith('/manage')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect mutation API routes
  if (request.nextUrl.pathname.startsWith('/api/recipes')) {
    const isMutation = ['POST', 'PUT', 'DELETE'].includes(request.method);
    if (isMutation && !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/manage/:path*', '/api/recipes/:path*'],
};