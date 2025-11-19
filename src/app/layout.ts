import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/Providers'
import { ClientLayout } from '@/components/layout/ClientLayout'

const inter = Inter({ 
  subsets: ['latin', 'arabic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Nona Beauty - Premium Cosmetics',
    template: '%s | Nona Beauty'
  },
  description: 'Discover premium cosmetics and beauty products at Nona Beauty. Shop the best skincare, haircare, and makeup products.',
  keywords: ['cosmetics', 'beauty', 'skincare', 'makeup', 'haircare', 'egypt'],
  authors: [{ name: 'Nona Beauty' }],
  creator: 'Nona Beauty',
  publisher: 'Nona Beauty',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nona-beauty.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ar-EG': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nona-beauty.vercel.app',
    siteName: 'Nona Beauty',
    title: 'Nona Beauty - Premium Cosmetics',
    description: 'Discover premium cosmetics and beauty products at Nona Beauty.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nona Beauty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nona Beauty - Premium Cosmetics',
    description: 'Discover premium cosmetics and beauty products at Nona Beauty.',
    images: ['/og-image.jpg'],
    creator: '@nonabeauty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}