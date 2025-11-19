'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Search, Package, CheckCircle, Clock, Truck, Home } from 'lucide-react'

const trackingSteps = [
  { status: 'pending', label: 'Order Placed', label_ar: 'تم الطلب', icon: Clock },
  { status: 'confirmed', label: 'Order Confirmed', label_ar: 'تم التأكيد', icon: CheckCircle },
  { status: 'shipped', label: 'Shipped', label_ar: 'قيد الشحن', icon: Truck },
  { status: 'delivered', label: 'Delivered', label_ar: 'تم التوصيل', icon: Home }
]

const sampleOrder = {
  id: 'NB123456789',
  status: 'shipped' as const,
  createdAt: '2024-01-15T10:30:00Z',
  estimatedDelivery: '2024-01-20T18:00:00Z',
  customer: {
    name: 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    phone: '+201234567890'
  },
  shippingAddress: {
    street: '123 Main Street',
    city: 'Cairo',
    country: 'Egypt'
  },
  items: [
    {
      id: '1',
      name: 'Sulfate-Free Shampoo 400ml',
      name_ar: 'شامبو خالي من الكبريتات 400 مل',
      quantity: 2,
      price: 170
    },
    {
      id: '2',
      name: 'Hair Conditioner 400ml',
      name_ar: 'بلسم شعر 400 مل',
      quantity: 1,
      price: 180
    }
  ],
  total: 520
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [trackingOrder, setTrackingOrder] = useState(sampleOrder)
  const [isSearching, setIsSearching] = useState(false)
  const { t, language } = useLanguage()

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setTrackingOrder(sampleOrder)
      setIsSearching(false)
    }, 1000)
  }

  const getStepStatus = (stepStatus: string) => {
    const orderStatusIndex = trackingSteps.findIndex(step => step.status === trackingOrder.status)
    const currentStepIndex = trackingSteps.findIndex(step => step.status === stepStatus)
    
    if (currentStepIndex < orderStatusIndex) return 'completed'
    if (currentStepIndex === orderStatusIndex) return 'current'
    return 'upcoming'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('orderTracking')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('orderTrackingSubtitle')}
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder={t('enterOrderNumber')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !orderNumber.trim()}
              className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t('searching')}
                </>
              ) : (
                <>
                  <Package className="h-4 w-4 mr-2" />
                  {t('trackOrder')}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingOrder && (
          <div className="max-w-4xl mx-auto">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('order')} #{trackingOrder.id}
                  </h2>
                  <p className="text-gray-600">
                    {t('placedOn')} {new Date(trackingOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    trackingOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    trackingOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    trackingOrder.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {t(trackingOrder.status)}
                  </span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
                <div className="relative flex justify-between">
                  {trackingSteps.map((step, index) => {
                    const status = getStepStatus(step.status)
                    const Icon = step.icon
                    
                    return (
                      <div key={step.status} className="flex flex-col items-center relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          status === 'completed' 
                            ? 'bg-pink-500 border-pink-500 text-white' 
                            : status === 'current'
                            ? 'bg-white border-pink-500 text-pink-500'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-2 text-center">
                          <div className={`text-sm font-medium ${
                            status === 'completed' || status === 'current'
                              ? 'text-pink-600'
                              : 'text-gray-500'
                          }`}>
                            {language === 'ar' ? step.label_ar : step.label}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{t('shippingInformation')}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">{t('customerName')}:</span>
                      <span className="ml-2 font-medium">{trackingOrder.customer.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('email')}:</span>
                      <span className="ml-2 font-medium">{trackingOrder.customer.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('phone')}:</span>
                      <span className="ml-2 font-medium">{trackingOrder.customer.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('shippingAddress')}:</span>
                      <span className="ml-2 font-medium">
                        {trackingOrder.shippingAddress.street}, {trackingOrder.shippingAddress.city}, {trackingOrder.shippingAddress.country}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('estimatedDelivery')}:</span>
                      <span className="ml-2 font-medium">
                        {new Date(trackingOrder.estimatedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{t('orderItems')}</h3>
                  <div className="space-y-4">
                    {trackingOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {language === 'ar' ? item.name_ar : item.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {t('quantity')}: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {item.price * item.quantity} LE
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.price} LE {t('each')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">{t('total')}</span>
                    <span className="text-lg font-bold text-pink-600">{trackingOrder.total} LE</span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{t('needHelp')}</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      {t('contactSupport')}
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      {t('viewFAQ')}
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      {t('returnPolicy')}
                    </button>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-pink-900 mb-2">{t('trackingTips')}</h3>
                  <ul className="text-pink-800 text-sm space-y-2">
                    <li>• {t('trackingTip1')}</li>
                    <li>• {t('trackingTip2')}</li>
                    <li>• {t('trackingTip3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
