import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';

export const metadata: Metadata = {
  title: 'Tutor Connect',
  description: 'Платформа для учеников и репетиторов с комиссией 10%',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased bg-[#f5f3ef] text-[#1a1a1a]">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
