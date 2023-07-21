import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sans = Open_Sans({ subsets: ['latin'] });

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "jin's Blog",
    template: "Jin's Blog | %s",
  },
  description: "Full Stack Engineer Jin's Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full max-w-screen-2xl mx-auto">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
