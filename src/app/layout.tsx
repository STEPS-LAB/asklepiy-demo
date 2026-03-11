import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '../styles/globals.css';

// Optimize fonts with display swap and preload
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://asklepiy.com'),
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
    title: 'Асклепій',
    description:
      'Провідний приватний медичний центр України з інноваційними підходами до лікування та діагностики.',
    siteName: 'Асклепій',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Асклепій',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Асклепій',
    description: 'Сучасна медицина з турботою про вас',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua" className="scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
