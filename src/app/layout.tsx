import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KIBI - Cinematic Digital Solutions',
  description: 'We build digital experiences that make businesses work better. Turning ideas into practical digital products.',
  keywords: ['Digital Products', 'Web Development', 'Business Systems', 'SaaS', 'Design Systems'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} ${inter.variable} font-sans antialiased bg-[#030305] text-gray-200 selection:bg-purple-900/50 selection:text-white`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
