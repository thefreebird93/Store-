'use client'
import { useState } from 'react'
import { Heart, ShoppingCart, BarChart3 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useComparison } from '@/context/ComparisonContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function ProductCard({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { addToCart } = useCart()
  const { language } = useLanguage()
  const { addToComparison, isInComparison } = useComparison()
  const { addNotification } = useNotification()

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    addNotification(
      isInWishlist 
        ? translate('removedFromWishlist', language)
        : translate('addedToWishlist', language),
      'success'
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    addNotification(translate('addedToCart', language), 'success')
  }

  const handleAddToComparison = () => {
    const added = addToComparison(product)
    if (added) {
      addNotification(translate('addedToComparison', language), 'success')
    } else {
      addNotification(translate('comparisonLimit', language), 'warning')
    }
  }

  // إنشاء نجوم التقييم
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 !== 0

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star">⭐</span>)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star">⭐</span>)
      } else {
        stars.push(<span key={i} className="star empty">⭐</span>)
      }
    }
    return stars
  }

  const isDiscounted = product.is_on_sale && product.discount > 0

  return (
    <div className="product-card">
      {/* زر قائمة الأمنيات */}
      <button 
        className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
        onClick={toggleWishlist}
      >
        <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
      </button>

      {/* زر المقارنة */}
      <button 
        className={`wishlist-btn ${isInComparison(product.id) ? 'active' : ''}`}
        style={{ top: '4rem' }}
        onClick={handleAddToComparison}
      >
        <BarChart3 size={20} fill={isInComparison(product.id) ? 'currentColor' : 'none'} />
      </button>

      {/* شارة الخصم */}
      {isDiscounted && (
        <div className="discount-badge">
          {product.discount}% OFF
        </div>
      )}
      
      <div className="product-image">
        <img src={product.image} alt={language === 'ar' ? product.name_ar : product.name_en} />
      </div>
      
      <div className="product-info">
        <h3>{language === 'ar' ? product.name_ar : product.name_en}</h3>
        
        <div className="rating">
          {renderStars()}
          <span className="review-count">({product.review_count})</span>
        </div>
        
        <div className="product-price">
          {isDiscounted ? (
            <div className="flex items-center gap-2">
              <span className="price-original">{product.original_price} LE</span>
              <span className="price-discount">{product.price} LE</span>
            </div>
          ) : (
            <span>{product.price} LE</span>
          )}
        </div>
        
        <div className="product-actions">
          <button className="add-to-cart" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
            {translate('addToCart', language)}
          </button>
          <a href={`/products/${product.id}`} className="view-details">
            {translate('viewDetails', language)}
          </a>
        </div>
      </div>
    </div>
  )
}