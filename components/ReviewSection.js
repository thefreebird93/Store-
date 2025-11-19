'use client'
import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'سارة محمد',
      rating: 5,
      comment: 'منتج رائع جداً! الجودة ممتازة والتأثير فوري.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      userName: 'أحمد علي',
      rating: 4,
      comment: 'جيد جداً لكن السعر مرتفع قليلاً.',
      date: '2024-01-10',
      verified: true
    }
  ])
  
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  })
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    const review = {
      id: reviews.length + 1,
      userName: newReview.userName || translate('anonymous', language),
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    }
    
    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: '', userName: '' })
    setShowReviewForm(false)
    addNotification(translate('reviewSubmitted', language), 'success')
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-1">{averageRating.toFixed(1)}</div>
          <div className="flex items-center gap-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={16}
                className={i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <div className="text-sm text-muted mt-1">
            {reviews.length} {translate('reviews', language)}
          </div>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = reviews.filter(r => r.rating === rating).length
            const percentage = (count / reviews.length) * 100
            
            return (
              <div key={rating} className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm">{rating}</span>
                  <Star size={14} className="text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Review Button */}
      <button
        onClick={() => setShowReviewForm(true)}
        className="btn-primary"
      >
        {translate('writeReview', language)}
      </button>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">{translate('writeReview', language)}</h4>
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {translate('yourRating', language)}
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                    className="p-1"
                  >
                    <Star 
                      size={24}
                      className={rating <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                {translate('yourName', language)} (اختياري)
              </label>
              <input
                type="text"
                id="userName"
                value={newReview.userName}
                onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={translate('enterYourName', language)}
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                {translate('yourReview', language)} *
              </label>
              <textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={translate('writeYourReview', language)}
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                {translate('submitReview', language)}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {translate('cancel', language)}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{review.userName}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={14}
                          className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {translate('verifiedPurchase', language)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-sm text-muted">{review.date}</span>
            </div>
            
            <p className="text-muted leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}