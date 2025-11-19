'use client'
import { useState } from 'react'
import { ShoppingCart, Heart, Search, Menu, X, Globe, Moon, Sun } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import { translate } from '@/utils/translations'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { cartItems, wishlistItems } = useCart()
  const { language, switchLanguage } = useLanguage()
  const { isDark, toggleTheme } = useTheme()

  const navLinks = [
    { name: 'home', href: '/', active: true },
    { name: 'categories', href: '/categories' },
    { name: 'products', href: '/products' },
    { name: 'offers', href: '/offers' },
    { name: 'contact', href: '/contact' },
  ]

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ar', name: 'Arabic', native: 'العربية' }
  ]

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* الشعار */}
          <div className="logo">
            <div className="logo-icon">NB</div>
            <div className="logo-text">
              <h1>Nona Beauty</h1>
              <p>{language === 'ar' ? 'جمالك شغفنا' : 'Your Beauty Passion'}</p>
            </div>
          </div>

          {/* زر القائمة للموبايل */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* روابط التنقل */}
          <nav className={`nav-links ${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white shadow-lg p-4' : 'hidden md:flex'}`}>
            {navLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                className={link.active ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {translate(link.name, language)}
              </a>
            ))}
          </nav>

          {/* أزرار المستخدم */}
          <div className="header-actions">
            {/* زر البحث */}
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>

            {/* زر تبديل الثيم */}
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleTheme}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* زر تبديل اللغة */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                <Globe size={20} />
                <span className="hidden sm:block">
                  {language === 'ar' ? 'العربية' : 'English'}
                </span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 min-w-32 z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`w-full text-right px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
                        language === lang.code ? 'bg-primary text-white hover:bg-primary' : ''
                      }`}
                      onClick={() => {
                        switchLanguage(lang.code)
                        setIsLanguageMenuOpen(false)
                      }}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="header-icons">
              <div className="wishlist-icon cursor-pointer">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="wishlist-count">{wishlistItems.length}</span>
                )}
              </div>
              <a href="/cart" className="cart-icon cursor-pointer">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="cart-count">{cartItemsCount}</span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* نافذة البحث */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder={translate('search', language)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <div className="text-center text-muted">
              {translate('searchResults', language)}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}