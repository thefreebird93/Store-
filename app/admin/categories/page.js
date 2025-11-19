'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Package, Eye } from 'lucide-react'
import { categories as initialCategories, getAllProducts } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    icon: '📦'
  })
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    setCategories(initialCategories)
  }, [])

  const filteredCategories = categories.filter(category =>
    category.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryStats = (categoryId) => {
    const products = getAllProducts()
    const categoryProducts = products.filter(p => p.category === categoryId)
    return {
      totalProducts: categoryProducts.length,
      inStock: categoryProducts.filter(p => p.in_stock).length,
      onSale: categoryProducts.filter(p => p.is_on_sale).length
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingCategory) {
      // تعديل الفئة
      setCategories(prev => prev.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      ))
      addNotification(translate('categoryUpdated', language), 'success')
    } else {
      // إضافة فئة جديدة
      const newCategory = {
        id: `category_${Date.now()}`,
        ...formData
      }
      setCategories(prev => [...prev, newCategory])
      addNotification(translate('categoryAdded', language), 'success')
    }
    
    handleCloseModal()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name_ar: category.name_ar,
      name_en: category.name_en,
      description_ar: category.description_ar,
      description_en: category.description_en,
      icon: category.icon
    })
    setIsAddModalOpen(true)
  }

  const handleDelete = (categoryId) => {
    if (window.confirm(translate('deleteCategoryConfirm', language))) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
      addNotification(translate('categoryDeleted', language), 'success')
    }
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingCategory(null)
    setFormData({
      name_ar: '',
      name_en: '',
      description_ar: '',
      description_en: '',
      icon: '📦'
    })
  }

  const popularIcons = ['💇', '✨', '💋', '🛁', '🌸', '📦', '🎁', '⭐', '🔥', '💎']

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{translate('manageCategories', language)}</h1>
          <p className="text-muted">{translate('manageCategoriesDescription', language)}</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          {translate('addCategory', language)}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Package size={24} className="text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{categories.length}</div>
              <div className="text-sm text-muted">{translate('totalCategories', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Package size={24} className="text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {getAllProducts().length}
              </div>
              <div className="text-sm text-muted">{translate('totalProducts', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Package size={24} className="text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {Math.max(...categories.map(cat => getCategoryStats(cat.id).totalProducts))}
              </div>
              <div className="text-sm text-muted">{translate('mostProducts', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Package size={24} className="text-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {categories.filter(cat => getCategoryStats(cat.id).totalProducts === 0).length}
              </div>
              <div className="text-sm text-muted">{translate('emptyCategories', language)}</div>
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
                placeholder={translate('searchCategories', language)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(category => {
          const stats = getCategoryStats(category.id)
          
          return (
            <div key={category.id} className="admin-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {language === 'ar' ? category.name_ar : category.name_en}
                    </h3>
                    <p className="text-sm text-muted">
                      {stats.totalProducts} {translate('products', language)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title={translate('edit', language)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title={translate('delete', language)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-muted text-sm mb-4 line-clamp-2">
                {language === 'ar' ? category.description_ar : category.description_en}
              </p>

              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-600">{stats.totalProducts}</div>
                  <div className="text-xs text-blue-500">{translate('total', language)}</div>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-600">{stats.inStock}</div>
                  <div className="text-xs text-green-500">{translate('inStock', language)}</div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <div className="font-bold text-purple-600">{stats.onSale}</div>
                  <div className="text-xs text-purple-500">{translate('onSale', language)}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`/categories/${category.id}`}
                  target="_blank"
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Eye size={16} />
                  {translate('view', language)}
                </a>
                <a
                  href={`/admin/products?category=${category.id}`}
                  className="flex-1 border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center text-sm"
                >
                  {translate('manage', language)}
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12 admin-card">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            {searchTerm ? translate('noCategoriesFound', language) : translate('noCategories', language)}
          </h3>
          <p className="text-gray-400 mb-4">
            {searchTerm ? translate('noCategoriesMatchSearch', language) : translate('addFirstCategory', language)}
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2"
          >
            <Plus size={20} />
            {translate('addFirstCategory', language)}
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingCategory ? translate('editCategory', language) : translate('addCategory', language)}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translate('nameAr', language)} *
                  </label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_ar: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translate('nameEn', language)} *
                  </label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translate('icon', language)}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      maxLength="2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {popularIcons.map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon }))}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                            formData.icon === icon ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
                  >
                    {editingCategory ? translate('update', language) : translate('create', language)}
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