'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { CATEGORIES } from '@/lib/constants'

export default function CategoriesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('categories')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('categoriesSubtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(CATEGORIES).map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 text-center">
                {/* Icon */}
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                  {t(category.id)}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t(`${category.id}Description`)}
                </p>

                {/* CTA */}
                <div className="inline-flex items-center text-pink-600 font-semibold group-hover:translate-x-2 transition-transform">
                  {t('exploreProducts')}
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('whyChooseNonaBeauty')}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {t('whyChooseDescription')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🌿',
                  title: t('naturalIngredients'),
                  description: t('naturalIngredientsDesc')
                },
                {
                  icon: '💎',
                  title: t('premiumQuality'),
                  description: t('premiumQualityDesc')
                },
                {
                  icon: '🚚',
                  title: t('fastShipping'),
                  description: t('fastShippingDesc')
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
