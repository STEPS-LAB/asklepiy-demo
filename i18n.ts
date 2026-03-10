import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
import {locales, defaultLocale} from './src/i18n';

export {locales, defaultLocale};

export default getRequestConfig(async ({locale}) => {
  // Get saved locale from cookie if the incoming locale is not valid
  let resolvedLocale = locale;
  
  if (!resolvedLocale || !locales.includes(resolvedLocale as typeof locales[number])) {
    // Try to get locale from cookie first
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
