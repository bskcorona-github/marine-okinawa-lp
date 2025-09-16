import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans_JP, Inter, Yusei_Magic } from 'next/font/google';

const noto = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-noto' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const yusei = Yusei_Magic({ weight: '400', subsets: ['latin'], variable: '--font-yusei' });

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: '沖縄のマリンスポーツ・マリンレジャー｜沖縄 海遊び',
  description: '沖縄でフライボード・パラセーリング・バナナボート・ジェットスキー。はじめてでも安心、少人数で丁寧に。税込/1名。',
  openGraph: {
    title: '沖縄のマリンスポーツ・マリンレジャー｜沖縄 海遊び',
    description: '沖縄の海遊び体験。少人数・写真無料・税込/1名。',
    url: '/',
    siteName: '沖縄 海遊び',
    images: [{ url: '/images/hero.webp' }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '沖縄のマリンスポーツ・マリンレジャー｜沖縄 海遊び',
    description: '沖縄の海遊び体験。少人数・写真無料・税込/1名。',
    images: ['/images/hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${noto.variable} ${inter.variable} ${yusei.variable}`}>
      <body className="bg-foam text-deepsea antialiased">{children}</body>
    </html>
  );
}


