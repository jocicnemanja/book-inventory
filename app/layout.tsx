import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Lora } from 'next/font/google';
import { Toaster } from 'sonner';
import { WelcomeToast } from '@/components/welcome-toast';
import { cn } from '@/lib/utils';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://buchinventar.de';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      'Buchinventar — Bücher in der richtigen Reihenfolge | Buchreihen, Autoren & Empfehlungen',
    template: '%s | Buchinventar',
  },
  description:
    'Alle Bücher in der richtigen Reihenfolge lesen: Entdecke beliebte Buchreihen, Reihenfolge der Bücher nach Autor, Buchempfehlungen und Bestseller 2026. Über 2 Mio. Titel durchsuchen.',
  keywords: [
    'Bücher Reihenfolge',
    'Buchreihenfolge',
    'Buchreihe',
    'Reihenfolge der Bücher',
    'Buchempfehlung',
    'Bestseller Bücher 2026',
    'Bücher online finden',
    'Buchreihen',
    'Buch Bewertung',
    'neue Bücher 2026',
    'Fantasy Bücher Reihenfolge',
    'Krimi Reihenfolge',
    'Thriller Buchreihe',
    'Sci-Fi Bücher',
    'Bücher nach Autor',
    'beste Bücher',
    'Leseempfehlung',
    'Buchinventar',
  ],
  alternates: {
    canonical: BASE_URL,
    languages: { 'de-DE': BASE_URL },
  },
  openGraph: {
    title: 'Buchinventar — Bücher in der richtigen Reihenfolge',
    description:
      'Beliebte Buchreihen, Reihenfolge der Bücher nach Autor und aktuelle Buchempfehlungen. Über 2 Mio. Titel auf einen Blick.',
    url: BASE_URL,
    siteName: 'Buchinventar',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buchinventar — Bücher in der richtigen Reihenfolge',
    description:
      'Buchreihen, Bestseller & Empfehlungen für den deutschsprachigen Raum.',
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={cn(
          'bg-background font-sans antialiased',
          GeistSans.variable,
          lora.variable
        )}
      >
        {children}
        <Toaster closeButton />
        <WelcomeToast />
      </body>
    </html>
  );
}
