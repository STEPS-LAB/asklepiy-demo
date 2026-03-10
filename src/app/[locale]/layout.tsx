import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactQueryProvider, LocaleProvider, AuthProvider, UIProvider } from '@/contexts';
import { Header, Footer } from '@/components/layout';
import { AIAssistant } from '@/features/ai-assistant';
import '../../styles/globals.css';

export function generateStaticParams() {
  return [{ locale: 'ua' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: urlLocale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!['ua', 'en'].includes(urlLocale)) {
    notFound();
  }

  // Use getLocale which respects our i18n config (cookie > URL > default)
  const locale = await getLocale() as 'ua' | 'en';
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>
        <LocaleProvider initialLocale={locale}>
          <AuthProvider>
            <UIProvider>
              <div className="min-h-screen flex flex-col overflow-x-hidden">
                <Header />
                <main className="flex-1 pt-20 overflow-x-hidden">{children}</main>
                <Footer />
                <AIAssistant />
              </div>
            </UIProvider>
          </AuthProvider>
        </LocaleProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
