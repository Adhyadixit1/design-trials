import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://carrolls-garage-heritage-store.shipiologistics.chatgpt.site'),
  title: "Carroll's Garage | Sumner, WA",
  description: "Garage-built goods inspired by nearly a century of honest work at Carroll's Garage in Sumner, Washington.",
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: "Carroll's Garage | Built in Sumner Since the 1930s",
    description: "Garage-built goods inspired by nearly a century of honest work.",
    type: 'website',
    url: 'https://carrolls-garage-heritage-store.shipiologistics.chatgpt.site',
    images: [{
      url: 'https://carrolls-garage-heritage-store.shipiologistics.chatgpt.site/og.png',
      width: 1200,
      height: 630,
      alt: "Carroll's Garage heritage storefront",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Carroll's Garage | Built in Sumner Since the 1930s",
    description: "Garage-built goods inspired by nearly a century of honest work.",
    images: ['https://carrolls-garage-heritage-store.shipiologistics.chatgpt.site/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
