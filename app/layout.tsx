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

export const metadata: Metadata = {
  title: {
    default: 'Buchinventar — Buchempfehlung & Bestseller Bücher 2026 | Beliebte Reihen & Autoren',
    template: '%s | Buchinventar',
  },
  description:
    'Buchempfehlung & Bestseller Bücher 2026: Entdecke über 2 Millionen Bücher, beliebte Buchreihen, Buchreihenfolge und Top-Autoren auf einen Blick.',
  keywords: [
    'Buchempfehlung',
    'Bestseller Bücher',
    'Bücher online',
    'Buchreihen',
    'Buchreihenfolge',
    'Buch Bewertung',
    'neue Bücher 2026',
    'Fantasy Bücher',
    'Sci-Fi Bücher',
    'Buchinventar',
  ],
  openGraph: {
    title: 'Buchinventar — Buchempfehlung & Bestseller Bücher 2026',
    description:
      'Entdecke über 2 Millionen Bücher — Buchreihen, Bewertungen und Top-Autoren.',
    siteName: 'Buchinventar',
    locale: 'de_DE',
    type: 'website',
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
