'use client';

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useLanguage } from '@/contexts/LanguageContext'
import ProductCard from '@/components/ui/ProductCard'
import { Heart, ShoppingBag } from 'lucide-react'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    // Load wishlist from localStorage or API
    const savedWishlist = localStorage.getItem('nonaBeautyWishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('nonaBeautyWishlist', JSON.stringify(updatedWishlist))
  }

  const handleViewDetails = (product: Product) => {
    window.location.href = `/products/${product.id}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('wishlist')}</h1>
          <p className="text-gray-600">{t('wishlistSubtitle')}</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-pink-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('emptyWishlist')}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {t('emptyWishlistSubtitle')}
            </p>
            <Link
              href="/products"
              className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors inline-flex items-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>{t('startShopping')}</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {wishlistItems.length} {t('itemsInWishlist')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('wishlistStats')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setWishlistItems([])
                    localStorage.removeItem('nonaBeautyWishlist')
                  }}
                  className="mt-4 sm:mt-0 text-red-600 hover:text-red-700 font-medium"
                >
                  {t('clearWishlist')}
                </button>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/products"
                className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                {t('continueShopping')}
              </Link>
              <button className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                {t('addAllToCart')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}