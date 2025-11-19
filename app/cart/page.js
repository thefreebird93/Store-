'use client'
import { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import CouponInput from '@/components/CouponInput'
import { translate } from '@/utils/translations'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const { language } = useLanguage()
  const { addNotification } = useNotification()
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)

  const subtotal = cartItems.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal - discount + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      addNotification(translate('removedFromCart', language), 'success')
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
    addNotification(translate('removedFromCart', language), 'success')
  }

  const handleClearCart = () => {
    clearCart()
    addNotification(translate('cartCleared', language), 'success')
  }

  const handleApplyCoupon = (couponCode) => {
    // محاكاة تطبيق الكوبون
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(subtotal * 0.1)
      addNotification(translate('couponApplied', language), 'success')
      setCoupon(couponCode)
    } else {
      addNotification(translate('invalidCoupon', language), 'error')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-light py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-muted" />
            </div>
            <h1 className="text-3xl font-bold text-dark mb-4">{translate('emptyCart', language)}</h1>
            <p className="text-muted text-lg mb-8">{translate('emptyCartMessage', language)}</p>
            <a href="/products" className="btn-primary inline-flex items-center gap-2">
              {translate('continueShopping', language)}
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
        <h1 className="text-3xl font-bold text-dark mb-8">{translate('shoppingCart', language)}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {translate('cartItems', language)} ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <button 
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                {translate('clearCart', language)}
              </button>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-custom p-6">
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={language === 'ar' ? item.name_ar : item.name_en}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'ar' ? item.name_ar : item.name_en}
                    </h3>
                    <p className="text-primary font-bold text-lg mb-3">{item.price} LE</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">
                          {parseInt(item.price) * item.quantity} LE
                        </span>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-custom p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-6">{translate('orderSummary', language)}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted">{translate('subtotal', language)}</span>
                  <span>{subtotal} LE</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{translate('discount', language)}</span>
                    <span>-{discount} LE</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted">{translate('shipping', language)}</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">{translate('free', language)}</span>
                    ) : (
                      `${shipping} LE`
                    )}
                  </span>
                </div>

                {subtotal < 500 && (
                  <div className="text-sm text-muted bg-yellow-50 p-3 rounded-lg">
                    {translate('freeShippingMessage', language)} {500 - subtotal} LE
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{translate('total', language)}</span>
                    <span>{total} LE</span>
                  </div>
                </div>
              </div>

              {/* Coupon Input */}
              <CouponInput onApplyCoupon={handleApplyCoupon} />

              <button className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-colors mb-4">
                {translate('proceedToCheckout', language)}
              </button>
              
              <a 
                href="/products" 
                className="w-full border border-primary text-primary py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                {translate('continueShopping', language)}
              </a>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-xl shadow-custom p-6">
              <h4 className="font-semibold mb-4">{translate('secureCheckout', language)}</h4>
              <div className="space-y-3 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {translate('securePayment', language)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {translate('privacyProtected', language)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {translate('moneyBackGuarantee', language)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}