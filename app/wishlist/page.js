'use client'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart()
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  const handleAddToCart = (product) => {
    addToCart(product)
    addNotification(translate('addedToCart', language), 'success')
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
    addNotification(translate('removedFromWishlist', language), 'success')
  }

  const handleAddAllToCart = () => {
    wishlistItems.forEach(product => addToCart(product))
    addNotification(
      `${wishlistItems.length} ${translate('itemsAddedToCart', language)}`,
      'success'
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-light py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-muted" />
            </div>
            <h1 className="text-3xl font-bold text-dark mb-4">{translate('emptyWishlist', language)}</h1>
            <p className="text-muted text-lg mb-8">{translate('emptyWishlistMessage', language)}</p>
            <a href="/products" className="btn-primary inline-flex items-center gap-2">
              {translate('startShopping', language)}
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-light py-8">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark">{translate('myWishlist', language)}</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted">
              {wishlistItems.length} {translate('items', language)}
            </span>
            <button
              onClick={handleAddAllToCart}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              {translate('addAllToCart', language)}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(product => {
            const isDiscounted = product.is_on_sale && product.discount > 0
            
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-custom overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={language === 'ar' ? product.name_ar : product.name_en}
                    className="w-full h-48 object-cover"
                  />
                  
                  {isDiscounted && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {product.discount}% OFF
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-3 left-3 bg-white bg-opacity-90 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-opacity-100 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {language === 'ar' ? product.name_ar : product.name_en}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-muted ml-2">({product.review_count})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    {isDiscounted ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{product.price} LE</span>
                        <span className="text-sm text-muted line-through">{product.original_price} LE</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-primary">{product.price} LE</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      {translate('addToCart', language)}
                    </button>
                    <a 
                      href={`/products/${product.id}`}
                      className="px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                    >
                      {translate('view', language)}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Wishlist Summary */}
        <div className="bg-white rounded-xl shadow-custom p-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-2">{wishlistItems.length}</div>
              <div className="text-muted">{translate('totalItems', language)}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">
                {wishlistItems.filter(p => p.is_on_sale).length}
              </div>
              <div className="text-muted">{translate('onSaleItems', language)}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">
                {Math.round(wishlistItems.reduce((acc, product) => acc + parseInt(product.discount), 0) / wishlistItems.length)}%
              </div>
              <div className="text-muted">{translate('averageDiscount', language)}</div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <a 
            href="/products" 
            className="btn-outline inline-flex items-center gap-2"
          >
            {translate('continueShopping', language)}
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}