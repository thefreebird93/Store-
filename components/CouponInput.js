'use client'
import { useState } from 'react'
import { Tag } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translate } from '@/utils/translations'

export default function CouponInput({ onApplyCoupon }) {
  const [couponCode, setCouponCode] = useState('')
  const [isApplied, setIsApplied] = useState(false)
  const { language } = useLanguage()

  const handleApply = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim())
      setIsApplied(true)
    }
  }

  const handleRemove = () => {
    setCouponCode('')
    setIsApplied(false)
    onApplyCoupon('')
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {translate('couponCode', language)}
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder={translate('enterCouponCode', language)}
            disabled={isApplied}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        {isApplied ? (
          <button
            onClick={handleRemove}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {translate('remove', language)}
          </button>
        ) : (
          <button
            onClick={handleApply}
            disabled={!couponCode.trim()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {translate('apply', language)}
          </button>
        )}
      </div>
      
      {/* Coupon Tips */}
      <div className="mt-3 text-sm text-muted">
        <p>{translate('couponTips', language)}: WELCOME10</p>
      </div>
    </div>
  )
}