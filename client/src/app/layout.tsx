// GLOBAL CSS (tailwind)
import './globals.css';

// Fonts
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

//Metadata
import type { Metadata } from 'next';

import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Torre',
  description: 'Generated by..',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}