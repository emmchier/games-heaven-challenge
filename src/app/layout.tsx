import type { Metadata } from 'next';
import './globals.css';
import { fontFamily } from '@/config/fonts';
import { Navbar } from './components';

export const metadata: Metadata = {
  title: 'Gaming Haven Z',
  description:
    "We're an animation production company based in Buenos Aires. We create and produce animations and VFX for various formats and screens. Contact us to bring your ideas to life!",
  keywords:
    'gaming, games, heaven, igdb, saved games, last added, newest, oldest, search games, collect game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontFamily.className} antialiased`}>
        <Navbar />
        <main className="pt-[144px]">{children}</main>
      </body>
    </html>
  );
}
