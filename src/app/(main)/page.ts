'use client';

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useLanguage } from '@/contexts/LanguageContext'
import ProductCard from '@/components/ui/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const { t } = useLanguage()
  const { getProducts } = useProducts()

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      const products = await getProducts({ limit: 8 })
      setFeaturedProducts(products)
    }
    loadFeaturedProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('shopNow')}
            </Link>
            <Link
              href="/offers"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              {t('currentOffers')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('popularProducts')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('popularProductsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(product) => {
                  // Navigate to product details
                  window.location.href = `/products/${product.id}`
                }}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              {t('viewAllProducts')}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('categories')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('categoriesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'hair', icon: '💇', name: t('hair'), description: t('hairDescription') },
              { id: 'face', icon: '✨', name: t('face'), description: t('faceDescription') },
              { id: 'lips', icon: '💋', name: t('lips'), description: t('lipsDescription') },
              { id: 'body', icon: '🛁', name: t('body'), description: t('bodyDescription') },
              { id: 'perfumes', icon: '🌸', name: t('perfumes'), description: t('perfumesDescription') },
            ].map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}