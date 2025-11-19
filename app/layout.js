import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { NotificationProvider } from '@/context/NotificationContext'
import { ComparisonProvider } from '@/context/ComparisonContext'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nona Beauty - Cosmetics Store',
  description: 'Nona Beauty - Complete store for cosmetics, skin and hair care',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <NotificationProvider>
              <ComparisonProvider>
                <CartProvider>
                  <Header />
                  <main className="min-h-screen">{children}</main>
                  <Footer />
                </CartProvider>
              </ComparisonProvider>
            </NotificationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}