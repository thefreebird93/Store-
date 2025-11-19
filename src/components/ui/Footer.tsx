'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nona Beauty</h3>
            <p className="text-gray-300 mb-4">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">{t('home')}</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-white">{t('categories')}</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">{t('products')}</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white">{t('blog')}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('productCategories')}</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=hair" className="text-gray-300 hover:text-white">{t('hair')}</Link></li>
              <li><Link href="/products?category=face" className="text-gray-300 hover:text-white">{t('face')}</Link></li>
              <li><Link href="/products?category=lips" className="text-gray-300 hover:text-white">{t('lips')}</Link></li>
              <li><Link href="/products?category=body" className="text-gray-300 hover:text-white">{t('body')}</Link></li>
              <li><Link href="/products?category=perfumes" className="text-gray-300 hover:text-white">{t('perfumes')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@nonabeauty.com</p>
              <p>Phone: +20 109 400 4720</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Nona Beauty. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}