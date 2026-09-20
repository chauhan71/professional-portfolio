import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Ritik Chauhan · Creative Developer',
  description:
    'I craft premium, animation-rich web experiences that feel tactile, intentional, and effortless — from initial concept to production-ready code.',
  openGraph: {
    title: 'Ritik Chauhan · Creative Developer',
    description:
      'Creative developer crafting immersive, animation-rich web experiences.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
