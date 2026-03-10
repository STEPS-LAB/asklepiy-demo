import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
import {locales, defaultLocale} from './src/i18n';

export {locales, defaultLocale};

export default getRequestConfig(async ({requestLocale}) => {
  // Start with the locale from the URL (via next-intl middleware)
  let resolvedLocale = await requestLocale;

  // Check cookie for user's saved preference
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;

  // Use cookie locale if it's valid, otherwise fall back to URL locale or default
  if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
    resolvedLocale = cookieLocale;
  } else if (!resolvedLocale || !locales.includes(resolvedLocale as typeof locales[number])) {
    resolvedLocale = defaultLocale;
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`./src/i18n/locales/${resolvedLocale}.json`)).default
  };
});
