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
  // Check if user has a saved locale preference in cookies
  const savedLocale = request.cookies.get('locale')?.value;
  
  // If there's a saved locale and it's different from current URL, redirect
  if (savedLocale && locales.includes(savedLocale as typeof locales[number])) {
    const pathname = request.nextUrl.pathname;
    const pathLocale = pathname.split('/')[1];
    
    // If current path doesn't have locale or has different locale
    if (!locales.includes(pathLocale as typeof locales[number]) || pathLocale !== savedLocale) {
      const newPathname = pathname.replace(/^\/(ua|en)/, '');
      const url = request.nextUrl.clone();
      url.pathname = `/${savedLocale}${newPathname}`;
      return NextResponse.redirect(url);
    }
  }
  
  // Run the default intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
