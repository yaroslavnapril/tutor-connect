import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';

export const metadata: Metadata = {
  title: 'Tutor Connect',
  description: 'Платформа для учеников и репетиторов',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased bg-[#f5f3ef] text-[#1a1a1a]">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
