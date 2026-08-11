import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except _next internals, static files, API routes, and
    // /admin (outside the [locale] tree — no i18n, plain passcode-gated route)
    '/((?!_next|_vercel|api|admin|.*\\..*).*)',
  ],
};
