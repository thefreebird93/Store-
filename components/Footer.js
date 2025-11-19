'use client'
import { socialLinks } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import { translate } from '@/utils/translations'

export default function Footer() {
  const { language } = useLanguage()
  const { isDark } = useTheme()

  const footerLinks = {
    quick: [
      { name: 'home', href: '/' },
      { name: 'categories', href: '/categories' },
      { name: 'products', href: '/products' },
      { name: 'offers', href: '/offers' },
      { name: 'contact', href: '/contact' },
    ],
    categories: [
      { name: 'hair', href: '/categories/hair' },
      { name: 'face', href: '/categories/face' },
      { name: 'lips', href: '/categories/lips' },
      { name: 'body', href: '/categories/body' },
      { name: 'perfumes', href: '/categories/perfumes' },
    ],
    services: [
      { name: 'wishlist', href: '/wishlist' },
      { name: 'cart', href: '/cart' },
      { name: 'trackOrder', href: '/track-order' },
      { name: 'returns', href: '/returns' },
    ]
  }

  return (
    <footer dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-dark text-white">
      <div className="container">
        <div className="footer-content">
          {/* معلومات المتجر */}
          <div className="footer-column">
            <h3>Nona Beauty</h3>
            <p className="text-gray-400">{translate('footerDescription', language)}</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-400">nonabeauty.eg@gmail.com</p>
              <p className="text-gray-400">+201094004720</p>
              <p className="text-gray-400">Cairo, Egypt</p>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="footer-column">
            <h3>{translate('quickLinks', language)}</h3>
            <ul className="footer-links">
              {footerLinks.quick.map(link => (
                <li key={link.name}>
                  <a href={link.href}>{translate(link.name, language)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* فئات المنتجات */}
          <div className="footer-column">
            <h3>{translate('productCategories', language)}</h3>
            <ul className="footer-links">
              {footerLinks.categories.map(link => (
                <li key={link.name}>
                  <a href={link.href}>{translate(link.name, language)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* خدمة العملاء */}
          <div className="footer-column">
            <h3>{translate('customerService', language)}</h3>
            <ul className="footer-links">
              {footerLinks.services.map(link => (
                <li key={link.name}>
                  <a href={link.href}>{translate(link.name, language)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* وسائل التواصل */}
          <div className="footer-column">
            <h3>{translate('socialMedia', language)}</h3>
            <div className="social-links">
              {socialLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title={link.name}
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">{translate('workingHours', language)}</h4>
              <p className="text-gray-400">9:00 AM - 10:00 PM</p>
              <p className="text-gray-400">{translate('everyday', language)}</p>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>Nona Beauty © 2024 — {translate('allRightsReserved', language)}</p>
        </div>
      </div>
    </footer>
  )
}