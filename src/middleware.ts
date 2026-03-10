import { NextRequest, NextResponse } from 'next/server';
import {locales, defaultLocale} from '@/i18n';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get saved locale from cookie
  const savedLocale = request.cookies.get('locale')?.value;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname doesn't have a locale, redirect to the saved locale or default
  if (!pathnameHasLocale) {
    const locale = savedLocale && locales.includes(savedLocale as typeof locales[number]) 
      ? savedLocale 
      : defaultLocale;
    
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Create response and let it pass through
  const response = NextResponse.next();

  // Only set cookie if it's not already set (preserve user preference)
  if (!savedLocale) {
    const pathLocale = pathname.split('/')[1];
    if (locales.includes(pathLocale as typeof locales[number])) {
      response.cookies.set('locale', pathLocale, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
