import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {locales, defaultLocale} from '@/i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  // Run the default intl middleware first
  const response = intlMiddleware(request);

  // Get the locale from the URL
  const pathname = request.nextUrl.pathname;
  const pathLocale = pathname.split('/')[1];
  
  // If the URL has a valid locale, save it to cookie for persistence
  if (locales.includes(pathLocale as typeof locales[number])) {
    response.cookies.set('locale', pathLocale, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
