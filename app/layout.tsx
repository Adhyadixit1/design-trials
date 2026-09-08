import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './shop/shop.css';
import './site/site.css';
import './site/home-sections.css';
import './site/mobile.css';
import './site/mobile-content.css';
import { CartProvider } from './shop/cart';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

const deploymentHost = process.env.VERCEL_ENV === 'production'
  ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  : process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000'),
  title: "Carroll's Garage | Auto Repair & Garage Goods in Sumner, WA",
  description: "Family-owned auto repair in Sumner, Washington, with ASE-certified technicians, digital inspections, diesel service, maintenance, and Carroll's Garage merchandise.",
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: "Carroll's Garage | Straight Answers. Solid Repairs.",
    description: "Family-owned auto repair and garage goods from Sumner, Washington.",
    type: 'website',
    url: '/',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: "Carroll's Garage heritage storefront",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Carroll's Garage | Straight Answers. Solid Repairs.",
    description: "Family-owned auto repair and garage goods from Sumner, Washington.",
    images: ['/og.png'],
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
