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
  title: 'Buchinventar — Beliebte Buchreihen & Autoren',
  description:
    'Entdecke über 2 Millionen Bücher – die beliebtesten Buchreihen und Autoren auf einen Blick.',
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
