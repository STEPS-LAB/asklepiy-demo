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
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!['ua', 'en'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>
        <LocaleProvider initialLocale={locale as 'ua' | 'en'}>
          <AuthProvider>
            <UIProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 pt-20">{children}</main>
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
