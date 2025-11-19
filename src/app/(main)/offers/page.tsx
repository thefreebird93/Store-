'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Clock, Tag, ArrowRight } from 'lucide-react'

const offers = [
  {
    id: 1,
    title: 'Special Offer on Hair Products',
    title_ar: 'عرض خاص على منتجات الشعر',
    description: '20% discount on all hair care products for a limited time',
    description_ar: 'خصم 20% على جميع منتجات العناية بالشعر لمدة محدودة',
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=500',
    discount: 20,
    validUntil: '2024-02-15',
    category: 'hair'
  },
  {
    id: 2,
    title: 'Perfume Collection Offer',
    title_ar: 'عرض مجموعة العطور',
    description: 'Buy 2 perfumes and get the 3rd one free',
    description_ar: 'اشترِ عطرين واحصل على الثالث مجاناً',
    image: 'https://images.unsplash.com/photo-1588776814546-1d1a1f0c6b9a?w=500',
    discount: 33,
    validUntil: '2024-02-20',
    category: 'perfumes'
  },
  {
    id: 3,
    title: 'Skincare Bundle Deal',
    title_ar: 'عرض مجموعة العناية بالبشرة',
    description: 'Complete skincare set at special price including cleanser, toner and moisturizer',
    description_ar: 'مجموعة العناية بالبشرة الكاملة بسعر خاص تشمل الغسول والتونر والمرطب',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    discount: 25,
    validUntil: '2024-02-10',
    category: 'face'
  }
]

export default function OffersPage() {
  const [activeOffer, setActiveOffer] = useState(0)
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('offers')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('offersSubtitle')}
          </p>
        </div>

        {/* Main Offer Carousel */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="p-8 flex items-center justify-center">
                <img
                  src={offers[activeOffer].image}
                  alt={language === 'ar' ? offers[activeOffer].title_ar : offers[activeOffer].title}
                  className="rounded-lg shadow-2xl max-w-md w-full"
                />
              </div>

              {/* Content */}
              <div className="p-8 text-white flex flex-col justify-center">
                <div className="mb-4">
                  <span className="bg-white text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {offers[activeOffer].discount}% OFF
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  {language === 'ar' ? offers[activeOffer].title_ar : offers[activeOffer].title}
                </h2>

                <p className="text-pink-100 mb-6 text-lg">
                  {language === 'ar' ? offers[activeOffer].description_ar : offers[activeOffer].description}
                </p>

                <div className="flex items-center text-pink-200 mb-6">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>
                    {t('validUntil')}: {new Date(offers[activeOffer].validUntil).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/products?category=${offers[activeOffer].category}`}
                    className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                  >
                    {t('shopNow')}
                  </Link>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                    {t('viewDetails')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveOffer(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeOffer ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={offer.image}
                  alt={language === 'ar' ? offer.title_ar : offer.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {offer.discount}% OFF
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Tag className="h-4 w-4 mr-1" />
                  <span className="capitalize">{offer.category}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {language === 'ar' ? offer.title_ar : offer.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {language === 'ar' ? offer.description_ar : offer.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>

                  <Link
                    href={`/products?category=${offer.category}`}
                    className="flex items-center text-pink-600 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    {t('shopNow')}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Announcement */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">
            {t('specialAnnouncement')}
          </h2>
          <p className="text-yellow-700 mb-6">
            {t('specialAnnouncementDesc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              {t('browseAllProducts')}
            </Link>
            <Link
              href="/contact"
              className="border border-yellow-500 text-yellow-700 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-colors"
            >
              {t('contactForWholesale')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
