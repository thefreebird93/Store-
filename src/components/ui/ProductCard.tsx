'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { useCart } from '@/hooks/useCart'
import { useLanguage } from '@/contexts/LanguageContext'
import { Heart, ShoppingCart, Eye } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()
  const { t, language } = useLanguage()

  const handleAddToCart = () => {
    addToCart(product)
    // Show success notification
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // Implement wishlist logic
  }

  const displayName = language === 'ar' ? product.name_ar : product.name
  const displayDescription = language === 'ar' ? product.description_ar : product.description

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image_url}
          alt={displayName}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleWishlist}
          className={`absolute top-3 left-3 p-2 rounded-full ${
            isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          <Heart className="h-4 w-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        {product.original_price && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Sale
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{displayName}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{displayDescription}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-2">
            ({product.review_count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-pink-600 font-bold text-lg">
              {product.price} LE
            </span>
            {product.original_price && (
              <span className="text-gray-400 line-through text-sm">
                {product.original_price} LE
              </span>
            )}
          </div>
          <span className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
            {product.in_stock ? t('inStock') : t('outOfStock')}
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{t('addToCart')}</span>
          </button>
          <button
            onClick={() => onViewDetails(product)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}