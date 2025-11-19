'use client'
import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'

export default function ProductCard({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false)

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
  }

  const addToCart = () => {
    // إضافة لمنطق السلة
    console.log('تم إضافة المنتج إلى السلة:', product)
  }

  return (
    <div className="product-card">
      <button 
        className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
        onClick={toggleWishlist}
      >
        <Heart size={20} />
      </button>
      
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={i < product.rating ? 'star filled' : 'star'}
            >
              ⭐
            </span>
          ))}
          <span className="review-count">({product.review_count})</span>
        </div>
        
        <div className="product-price">{product.price} LE</div>
        
        <div className="product-actions">
          <button className="add-to-cart" onClick={addToCart}>
            <ShoppingCart size={16} />
            أضف إلى السلة
          </button>
          <button className="view-details">
            تفاصيل
          </button>
        </div>
      </div>
    </div>
  )
}