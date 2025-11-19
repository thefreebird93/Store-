'use client'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { getDiscountedProducts, offers } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { translate } from '@/utils/translations'

export default function OffersPage() {
  const [discountedProducts, setDiscountedProducts] = useState([])
  const { language } = useLanguage()

  useEffect(() => {
    setDiscountedProducts(getDiscountedProducts())
  }, [])

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-light py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{translate('offers', language)}</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {translate('offersPageSubtitle', language)}
          </p>
        </div>

        {/* Special Offers Banner */}
        <section className="mb-16">
          <h2 className="section-title">{translate('specialOffers', language)}</h2>
          <div className="offers-grid">
            {offers.map(offer => (
              <div key={offer.id} id={offer.id} className="offer-card">
                <div className="offer-image">
                  <img src={offer.image} alt={language === 'ar' ? offer.title_ar : offer.title_en} />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg">
                    {offer.discount}
                  </div>
                </div>
                <div className="offer-content">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {language === 'ar' ? offer.title_ar : offer.title_en}
                  </h3>
                  <p className="text-muted mb-4 leading-relaxed">
                    {language === 'ar' ? offer.description_ar : offer.description_en}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted bg-gray-100 px-3 py-1 rounded-full">
                      {translate('validUntil', language)}: {offer.valid_until}
                    </span>
                    <a 
                      href={`/categories/${offer.category}`}
                      className="btn-primary py-2 px-4 text-sm"
                    >
                      {translate('shopNow', language)}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discounted Products */}
        <section>
          <h2 className="section-title">{translate('allDiscountedProducts', language)}</h2>
          <p className="section-subtitle">{translate('discountedProductsSubtitle', language)}</p>
          
          {discountedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold text-muted mb-2">
                {translate('noOffersAvailable', language)}
              </h3>
              <p className="text-muted">{translate('checkBackLater', language)}</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {discountedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Offer Stats */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center mt-12">
                <h3 className="text-2xl font-bold mb-4">{translate('offerStatsTitle', language)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold">{discountedProducts.length}</div>
                    <div>{translate('discountedProducts', language)}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {Math.max(...discountedProducts.map(p => p.discount))}%
                    </div>
                    <div>{translate('maximumDiscount', language)}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {Math.round(discountedProducts.reduce((acc, product) => acc + parseInt(product.discount), 0) / discountedProducts.length)}%
                    </div>
                    <div>{translate('averageDiscount', language)}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Limited Time Offer Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-2xl">⏰</span>
            <h4 className="text-lg font-semibold text-yellow-800">
              {translate('limitedTimeOffer', language)}
            </h4>
          </div>
          <p className="text-yellow-700">
            {translate('offersExpireSoon', language)}
          </p>
        </div>
      </div>
    </div>
  )
}