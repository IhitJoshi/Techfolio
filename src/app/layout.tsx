import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Source_Serif_4, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SessionProvider } from '@/components/providers/session-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Techfolio | Personal Tech Journal',
  description:
    'A premium personal tech journal. Thoughts on code, systems, and the art of building.',
  keywords: ['tech blog', 'programming', 'software engineering', 'personal blog'],
  authors: [{ name: 'Ihit Joshi' }],
  openGraph: {
    title: 'Techfolio | Personal Tech Journal',
    description:
      'A premium personal tech journal. Thoughts on code, systems, and the art of building.',
    type: 'website',
    siteName: 'Techfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techfolio | Personal Tech Journal',
    description: 'Thoughts on code, systems, and the art of building.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif4.variable} ${dmSerifDisplay.variable} antialiased bg-white text-black font-sans`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}