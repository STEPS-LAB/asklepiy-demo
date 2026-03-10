import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
import {locales, defaultLocale} from './src/i18n';

export {locales, defaultLocale};

export default getRequestConfig(async ({requestLocale}) => {
  // This typically comes from the URL or middleware
  let resolvedLocale = await requestLocale;

  // If no locale from URL, try to get from cookie
  if (!resolvedLocale || !locales.includes(resolvedLocale as typeof locales[number])) {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('locale')?.value;

    if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
      resolvedLocale = cookieLocale;
    } else {
      resolvedLocale = defaultLocale;
    }
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`./src/i18n/locales/${resolvedLocale}.json`)).default
  };
});
