'use client'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { categories, products, offers, socialLinks, getDiscountedProducts } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { translate } from '@/utils/translations'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [discountedProducts, setDiscountedProducts] = useState([])
  const { language } = useLanguage()

  useEffect(() => {
    // عرض أول 8 منتجات كمنتجات مميزة
    const allProducts = Object.values(products).flat()
    setFeaturedProducts(allProducts.slice(0, 8))
    
    // عرض المنتجات المخفضة
    setDiscountedProducts(getDiscountedProducts().slice(0, 6))
  }, [])

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>{translate('heroTitle', language)}</h1>
            <p>{translate('heroSubtitle', language)}</p>
            <div className="hero-buttons">
              <a href="/products" className="btn-primary">{translate('shopNow', language)}</a>
              <a href="/offers" className="btn-outline">{translate('currentOffers', language)}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Categories Section */}
        <section className="py-16">
          <h2 className="section-title">{translate('categoriesTitle', language)}</h2>
          <p className="section-subtitle">{translate('categoriesSubtitle', language)}</p>
          
          <div className="categories-grid">
            {categories.map(category => (
              <a key={category.id} href={`/categories/${category.id}`} className="category-card">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{language === 'ar' ? category.name_ar : category.name_en}</h3>
                <p>{language === 'ar' ? category.description_ar : category.description_en}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section className="py-16">
          <h2 className="section-title">{translate('popularProducts', language)}</h2>
          <p className="section-subtitle">{translate('popularProductsSubtitle', language)}</p>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/products" className="btn-primary">{translate('viewAllProducts', language)}</a>
          </div>
        </section>

        {/* Discounted Products */}
        {discountedProducts.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl mt-8">
            <div className="container">
              <h2 className="section-title">{translate('discountedProducts', language)}</h2>
              <p className="section-subtitle">{translate('discountedProductsSubtitle', language)}</p>
              
              <div className="products-grid">
                {discountedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <a href="/offers" className="btn-primary">{translate('viewAllOffers', language)}</a>
              </div>
            </div>
          </section>
        )}

        {/* Special Offers */}
        <section className="py-16">
          <h2 className="section-title">{translate('offersTitle', language)}</h2>
          <p className="section-subtitle">{translate('offersSubtitle', language)}</p>
          
          <div className="offers-grid">
            {offers.map(offer => (
              <div key={offer.id} className="offer-card">
                <div className="offer-image">
                  <img src={offer.image} alt={language === 'ar' ? offer.title_ar : offer.title_en} />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                    {offer.discount}
                  </div>
                </div>
                <div className="offer-content">
                  <h3>{language === 'ar' ? offer.title_ar : offer.title_en}</h3>
                  <p>{language === 'ar' ? offer.description_ar : offer.description_en}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">{translate('validUntil', language)}: {offer.valid_until}</span>
                    <a href={`/offers#${offer.id}`} className="btn-primary py-2 px-4 text-sm">
                      {translate('viewDetails', language)}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Preview */}
        <section className="py-16">
          <h2 className="section-title">{translate('contactTitle', language)}</h2>
          <p className="section-subtitle">{translate('contactSubtitle', language)}</p>
          
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-muted mb-4">nonabeauty.eg@gmail.com</p>
            <a href="/contact" className="btn-primary">{translate('contact', language)}</a>
          </div>
        </section>
      </div>
    </div>
  )
}