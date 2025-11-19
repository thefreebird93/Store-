'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import LanguageSwitcher from './LanguageSwitcher'
import CartSidebar from './CartSidebar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { t, language } = useLanguage()
  const { cartItems } = useCart()
  const { user, isAdmin } = useAuth()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              NB
            </div>
            <div>
              <h1 className="text-xl font-bold text-pink-500">Nona Beauty</h1>
              <p className="text-xs text-gray-500">{t('slogan')}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className={`flex ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'} space-x-6 rtl:space-x-reverse`}>
              <li><Link href="/" className="text-gray-700 hover:text-pink-500">{t('home')}</Link></li>
              <li><Link href="/categories" className="text-gray-700 hover:text-pink-500">{t('categories')}</Link></li>
              <li><Link href="/products" className="text-gray-700 hover:text-pink-500">{t('products')}</Link></li>
              <li><Link href="/blog" className="text-gray-700 hover:text-pink-500">{t('blog')}</Link></li>
              <li><Link href="/contact" className="text-gray-700 hover:text-pink-500">{t('contact')}</Link></li>
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User Actions */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {user ? (
                <>
                  <Link href="/wishlist" className="relative">
                    <HeartIcon className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      0
                    </span>
                  </Link>
                  
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative"
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  </button>

                  {isAdmin && (
                    <Link href="/admin/dashboard" className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm">
                      {t('adminPanel')}
                    </Link>
                  )}
                </>
              ) : (
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Link href="/auth/login" className="border border-pink-500 text-pink-500 px-3 py-1 rounded-lg text-sm">
                    {t('login')}
                  </Link>
                  <Link href="/auth/register" className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm">
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

// Icons (you can use Lucide React icons)
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)