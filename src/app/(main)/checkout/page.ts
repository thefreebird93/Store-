'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/hooks/useToast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { CreditCard, Truck, Wallet, Shield } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  
  const { cartItems, total, clearCart } = useCart()
  const { user } = useAuth()
  const { t } = useLanguage()
  const { success, error } = useToast()
  const router = useRouter()

  const [shippingData, setShippingData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    country: 'Egypt',
    notes: ''
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const shippingMethods = [
    {
      id: 'standard',
      name: t('standardShipping'),
      description: t('standardShippingDesc'),
      cost: 25,
      duration: '3-5 days'
    },
    {
      id: 'express',
      name: t('expressShipping'),
      description: t('expressShippingDesc'),
      cost: 50,
      duration: '1-2 days'
    },
    {
      id: 'free',
      name: t('freeShipping'),
      description: t('freeShippingDesc'),
      cost: 0,
      duration: '5-7 days'
    }
  ]

  const paymentMethods = [
    {
      id: 'cash',
      name: t('cashOnDelivery'),
      description: t('cashOnDeliveryDesc'),
      icon: Wallet
    },
    {
      id: 'card',
      name: t('creditCard'),
      description: t('creditCardDesc'),
      icon: CreditCard
    }
  ]

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create order
      const orderData = {
        shipping: shippingData,
        payment: paymentMethod,
        items: cartItems,
        total: total + (shippingMethods.find(s => s.id === shippingMethod)?.cost || 0)
      }

      // In real app, send to API
      console.log('Order data:', orderData)

      success(t('orderPlacedSuccess'))
      clearCart()
      router.push('/order-tracking')
    } catch (err) {
      error(t('orderFailed'))
    } finally {
      setLoading(false)
    }
  }

  const selectedShipping = shippingMethods.find(s => s.id === shippingMethod)
  const finalTotal = total + (selectedShipping?.cost || 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('cartEmpty')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('addItemsToCheckout')}
          </p>
          <Button onClick={() => router.push('/products')}>
            {t('continueShopping')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-24 h-1 mx-4 ${
                    step > stepNumber ? 'bg-pink-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{t('shipping')}</span>
            <span>{t('payment')}</span>
            <span>{t('confirmation')}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t('shippingInformation')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label={t('fullName')}
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                    <Input
                      label={t('email')}
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => setShippingData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    <Input
                      label={t('phone')}
                      type="tel"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                    <Input
                      label={t('city')}
                      value={shippingData.city}
                      onChange={(e) => setShippingData(prev => ({ ...prev, city: e.target.value }))}
                      required
                    />
                  </div>
                  <Textarea
                    label={t('address')}
                    value={shippingData.address}
                    onChange={(e) => setShippingData(prev => ({ ...prev, address: e.target.value }))}
                    required
                    className="mt-6"
                  />
                  <Textarea
                    label={t('orderNotes')}
                    value={shippingData.notes}
                    onChange={(e) => setShippingData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder={t('orderNotesPlaceholder')}
                    className="mt-4"
                  />
                </div>

                {/* Shipping Method */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t('shippingMethod')}
                  </h2>
                  <RadioGroup
                    options={shippingMethods.map(method => ({
                      value: method.id,
                      label: (
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                            <div className="text-sm text-gray-500">{method.duration}</div>
                          </div>
                          <div className="font-bold">
                            {method.cost === 0 ? t('free') : `${method.cost} LE`}
                          </div>
                        </div>
                      )
                    }))}
                    value={shippingMethod}
                    onChange={setShippingMethod}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t('continueToPayment')}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t('paymentMethod')}
                  </h2>
                  <RadioGroup
                    options={paymentMethods.map(method => {
                      const Icon = method.icon
                      return {
                        value: method.id,
                        label: (
                          <div className="flex items-center space-x-3">
                            <Icon className="h-6 w-6 text-gray-400" />
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                            </div>
                          </div>
                        )
                      }
                    })}
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                  />

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label={t('cardNumber')}
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                        />
                        <Input
                          label={t('nameOnCard')}
                          placeholder={t('enterCardName')}
                          value={paymentData.nameOnCard}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, nameOnCard: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label={t('expiryDate')}
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        {t('secureCheckout')}
                      </h3>
                      <p className="text-blue-800 text-sm">
                        {t('secureCheckoutDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    {t('backToShipping')}
                  </Button>
                  <Button
                    type="submit"
                    loading={loading}
                    className="flex-1"
                  >
                    {t('placeOrder')}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('orderSummary')}
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.quantity} × {item.price} LE
                      </p>
                    </div>
                    <div className="font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} LE
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('subtotal')}</span>
                  <span className="text-gray-900">{total.toFixed(2)} LE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('shipping')}</span>
                  <span className="text-gray-900">
                    {selectedShipping?.cost === 0 ? t('free') : `${selectedShipping?.cost} LE`}
                  </span>
                </div>
                {selectedShipping && (
                  <div className="text-xs text-gray-500">
                    {selectedShipping.name} ({selectedShipping.duration})
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                  <span>{t('total')}</span>
                  <span>{finalTotal.toFixed(2)} LE</span>
                </div>
              </div>
            </div>

            {/* Security Badges */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div>
                  <Truck className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                  <div>{t('fastShipping')}</div>
                </div>
                <div>
                  <Shield className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                  <div>{t('securePayment')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}