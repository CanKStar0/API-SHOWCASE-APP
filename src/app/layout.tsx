import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'API Showcase | 200+ Ücretsiz API Koleksiyonu',
  description: 'Hava durumundan kripto paraya, oyunlardan uzaya kadar 37 kategoride en popüler ücretsiz API\'leri keşfedin.',
  keywords: ['API', 'ücretsiz API', 'geliştirici', 'web geliştirme', 'REST API'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
