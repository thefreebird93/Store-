'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Percent, Calendar, Eye } from 'lucide-react'
import { offers as initialOffers, categories } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminOffers() {
  const [offers, setOffers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState(null)
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    discount: '',
    valid_until: '',
    category: '',
    image: ''
  })
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    setOffers(initialOffers)
  }, [])

  const filteredOffers = offers.filter(offer =>
    offer.title_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.title_en.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isOfferActive = (validUntil) => {
    return new Date(validUntil) > new Date()
  }

  const getDaysRemaining = (validUntil) => {
    const today = new Date()
    const validDate = new Date(validUntil)
    const diffTime = validDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingOffer) {
      // تعديل العرض
      setOffers(prev => prev.map(offer =>
        offer.id === editingOffer.id
          ? { ...offer, ...formData }
          : offer
      ))
      addNotification(translate('offerUpdated', language), 'success')
    } else {
      // إضافة عرض جديد
      const newOffer = {
        id: `offer_${Date.now()}`,
        ...formData
      }
      setOffers(prev => [...prev, newOffer])
      addNotification(translate('offerAdded', language), 'success')
    }
    
    handleCloseModal()
  }

  const handleEdit = (offer) => {
    setEditingOffer(offer)
    setFormData({
      title_ar: offer.title_ar,
      title_en: offer.title_en,
      description_ar: offer.description_ar,
      description_en: offer.description_en,
      discount: offer.discount,
      valid_until: offer.valid_until,
      category: offer.category,
      image: offer.image
    })
    setIsAddModalOpen(true)
  }

  const handleDelete = (offerId) => {
    if (window.confirm(translate('deleteOfferConfirm', language))) {
      setOffers(prev => prev.filter(offer => offer.id !== offerId))
      addNotification(translate('offerDeleted', language), 'success')
    }
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingOffer(null)
    setFormData({
      title_ar: '',
      title_en: '',
      description_ar: '',
      description_en: '',
      discount: '',
      valid_until: '',
      category: '',
      image: ''
    })
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{translate('manageOffers', language)}</h1>
          <p className="text-muted">{translate('manageOffersDescription', language)}</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          {translate('addOffer', language)}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Percent size={24} className="text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{offers.length}</div>
              <div className="text-sm text-muted">{translate('totalOffers', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Percent size={24} className="text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {offers.filter(offer => isOfferActive(offer.valid_until)).length}
              </div>
              <div className="text-sm text-muted">{translate('activeOffers', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Percent size={24} className="text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {offers.filter(offer => !isOfferActive(offer.valid_until)).length}
              </div>
              <div className="text-sm text-muted">{translate('expiredOffers', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Percent size={24} className="text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {Math.max(...offers.map(offer => parseInt(offer.discount))) || 0}%
              </div>
              <div className="text-sm text-muted">{translate('highestDiscount', language)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder={translate('searchOffers', language)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map(offer => {
          const isActive = isOfferActive(offer.valid_until)
          const daysRemaining = getDaysRemaining(offer.valid_until)
          
          return (
            <div key={offer.id} className="admin-card">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={language === 'ar' ? offer.title_ar : offer.title_en}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white font-bold ${
                  isActive ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {offer.discount}
                </div>
                {!isActive && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{translate('expired', language)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">
                  {language === 'ar' ? offer.title_ar : offer.title_en}
                </h3>
                
                <p className="text-muted text-sm line-clamp-2">
                  {language === 'ar' ? offer.description_ar : offer.description_en}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted">
                    <Calendar size={16} />
                    <span>{translate('validUntil', language)}: {offer.valid_until}</span>
                  </div>
                  {isActive && (
                    <span className="text-orange-600 font-medium">
                      {daysRemaining} {translate('daysLeft', language)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    {translate('category', language)}: {translate(offer.category, language)}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <a
                      href={`/offers#${offer.id}`}
                      target="_blank"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title={translate('view', language)}
                    >
                      <Eye size={16} />
                    </a>
                    <button
                      onClick={() => handleEdit(offer)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                      title={translate('edit', language)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title={translate('delete', language)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="text-center py-12 admin-card">
          <Percent size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            {searchTerm ? translate('noOffersFound', language) : translate('noOffers', language)}
          </h3>
          <p className="text-gray-400 mb-4">
            {searchTerm ? translate('noOffersMatchSearch', language) : translate('addFirstOffer', language)}
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2"
          >
            <Plus size={20} />
            {translate('addFirstOffer', language)}
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingOffer ? translate('editOffer', language) : translate('addOffer', language)}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('titleAr', language)} *
                    </label>
                    <input
                      type="text"
                      value={formData.title_ar}
                      onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('titleEn', language)} *
                    </label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('descriptionAr', language)}
                    </label>
                    <textarea
                      value={formData.description_ar}
                      onChange={(e) => setFormData(prev => ({ ...prev, description_ar: e.target.value }))}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('descriptionEn', language)}
                    </label>
                    <textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('discount', language)} *
                    </label>
                    <input
                      type="text"
                      value={formData.discount}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="20%"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('validUntil', language)} *
                    </label>
                    <input
                      type="date"
                      value={formData.valid_until}
                      onChange={(e) => setFormData(prev => ({ ...prev, valid_until: e.target.value }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('category', language)} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">{translate('selectCategory', language)}</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {language === 'ar' ? category.name_ar : category.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translate('imageURL', language)}
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {formData.image && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('imagePreview', language)}
                    </label>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
                  >
                    {editingOffer ? translate('update', language) : translate('create', language)}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {translate('cancel', language)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}