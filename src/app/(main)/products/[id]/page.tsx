'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Product } from '@/types/product'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { useLanguage } from '@/contexts/LanguageContext'
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const params = useParams()
  const productId = params.id as string
  const { getProduct } = useProducts()
  const { addToCart } = useCart()
  const { t, language } = useLanguage()

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    const productData = await getProduct(productId)
    setProduct(productData)
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      // Show success notification
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // Implement wishlist logic
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    )
  }

  const displayName = language === 'ar' ? product.name_ar : product.name
  const displayDescription = language === 'ar' ? product.description_ar : product.description

  const images = [
    product.image_url,
    product.image_url, // In real app, these would be different images
    product.image_url,
    product.image_url,
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={images[selectedImage]}
                alt={displayName}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${displayName} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayName}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'fill-current' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.review_count} {t('reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-pink-600">
                  {product.price} LE
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.original_price} LE
                  </span>
                )}
                {product.original_price && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{displayDescription}</p>
            </div>

            {/* SKU & Availability */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 w-24">{t('sku')}:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-24">{t('availability')}:</span>
                <span className={`font-medium ${
                  product.in_stock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.in_stock ? t('inStock') : t('outOfStock')}
                </span>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {t('addToCart')}
                </button>

                <button
                  onClick={handleWishlist}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isWishlisted ? 'fill-current text-pink-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="h-5 w-5 text-gray-400" />
                <span>{t('freeShipping')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw className="h-5 w-5 text-gray-400" />
                <span>{t('easyReturns')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>{t('securePayment')}</span>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{t('share')}:</span>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('reviews')}</h2>
          {/* Add reviews component here */}
        </div>
      </div>
    </div>
  )
}