import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://asklepiy.com'),
  title: {
    default: 'Асклепій Клінік | Сучасна медицина в Україні',
    template: '%s | Асклепій Клінік',
  },
  description:
    'Провідний приватний медичний центр України з інноваційними підходами до лікування та діагностики. Сучасне обладнання та кваліфіковані лікарі.',
  keywords: [
    'медичний центр',
    'лікар',
    'медицина',
    'лікування',
    'діагностика',
    'Асклепій',
    'Житомир',
    'медичні послуги',
  ],
  authors: [{ name: 'Асклепій Клінік' }],
  creator: 'Асклепій Клінік',
  publisher: 'Асклепій Клінік',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://asklepiy.com',
    title: 'Асклепій Клінік | Сучасна медицина в Україні',
    description:
      'Провідний приватний медичний центр України з інноваційними підходами до лікування та діагностики.',
    siteName: 'Асклепій Клінік',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Асклепій Клінік',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Асклепій Клінік',
    description: 'Сучасна медицина з турботою про вас',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua" className="scroll-smooth antialiased" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
