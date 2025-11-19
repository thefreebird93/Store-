'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Heart, ShoppingCart, Star, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import ReviewSection from '@/components/ReviewSection'
import { getAllProducts } from '@/utils/constants'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeTab, setActiveTab] = useState('description')
  const params = useParams()
  const { addToCart } = useCart()
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    const products = getAllProducts()
    const foundProduct = products.find(p => p.id === params.id)
    setProduct(foundProduct)
    
    if (foundProduct) {
      setSelectedImage(foundProduct.image)
      // الحصول على منتجات ذات صلة
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [params.id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    addNotification(
      `${translate('addedToCart', language)} (${quantity})`,
      'success'
    )
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-muted">{translate('loading', language)}</p>
        </div>
      </div>
    )
  }

  const isDiscounted = product.is_on_sale && product.discount > 0

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-light py-8">
      <div className="container">
        {/* Breadcrumb */}
<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
  <a href="/" className="hover:text-primary">
    {translate('home', language)}
  </a>
  <span>›</span>
  <a href="/products" className="hover:text-primary">
    {translate('products', language)}
  </a>
  <span>›</span>
  <a href={`/categories/${product.category}`} className="hover:text-primary">
    {translate(product.category, language)}
  </a>  {/* ← هنا التصحيح */}
  <span>›</span>
  <span className="text-dark">{language === 'ar' ? product.name_ar : product.name_en}</span>
</nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-custom p-4">
              <img 
                src={selectedImage} 
                alt={language === 'ar' ? product.name_ar : product.name_en}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {isDiscounted && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-full inline-block">
                {product.discount}% {translate('off', language)}
              </div>
            )}
            
            <h1 className="text-3xl font-bold text-dark">
              {language === 'ar' ? product.name_ar : product.name_en}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-muted">({product.review_count} {translate('reviews', language)})</span>
              <span className="text-green-600 font-medium">• {translate('inStock', language)}</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {isDiscounted ? (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">{product.price} LE</span>
                  <span className="text-xl text-muted line-through">{product.original_price} LE</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    {translate('save', language)} {parseInt(product.original_price) - parseInt(product.price)} LE
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary">{product.price} LE</span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted text-lg leading-relaxed">
              {language === 'ar' ? product.description_ar : product.description_en}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">{translate('quantity', language)}:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={decrementQuantity}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {translate('addToCart', language)}
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck size={24} className="text-primary" />
                <div>
                  <div className="font-medium">{translate('freeShipping', language)}</div>
                  <div className="text-sm text-muted">{translate('shippingInfo', language)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-primary" />
                <div>
                  <div className="font-medium">{translate('warranty', language)}</div>
                  <div className="text-sm text-muted">{translate('warrantyInfo', language)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={24} className="text-primary" />
                <div>
                  <div className="font-medium">{translate('easyReturns', language)}</div>
                  <div className="text-sm text-muted">{translate('returnsInfo', language)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-custom mb-16">
          <div className="border-b">
            <nav className="flex gap-8 px-6">
              {[
                { id: 'description', label: 'description' },
                { id: 'reviews', label: 'reviews' },
                { id: 'specifications', label: 'specifications' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted hover:text-dark'
                  }`}
                >
                  {translate(tab.label, language)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-muted text-lg leading-relaxed">
                  {language === 'ar' ? product.description_ar : product.description_en}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">{translate('keyFeatures', language)}</h4>
                    <ul className="space-y-2 text-muted">
                      {product.tags.map((tag, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{translate('productDetails', language)}</h4>
                    <div className="space-y-2 text-muted">
                      <div className="flex justify-between">
                        <span>{translate('sku', language)}</span>
                        <span>{product.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{translate('category', language)}</span>
                        <span>{translate(product.category, language)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{translate('availability', language)}</span>
                        <span className="text-green-600">{translate('inStock', language)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection productId={product.id} />
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">{translate('productSpecs', language)}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted">{translate('brand', language)}</span>
                        <span>Nona Beauty</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted">{translate('weight', language)}</span>
                        <span>300g</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted">{translate('origin', language)}</span>
                        <span>Egypt</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">{translate('ingredients', language)}</h4>
                    <p className="text-muted">
                      {translate('naturalIngredients', language)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="section-title text-left">{translate('relatedProducts', language)}</h2>
            <div className="products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
