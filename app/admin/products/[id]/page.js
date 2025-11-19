'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Save, ArrowLeft, Upload, Trash2 } from 'lucide-react'
import { getAllProducts, categories } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function EditProduct() {
  const [product, setProduct] = useState(null)
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    price: '',
    original_price: '',
    discount: '0',
    category: '',
    in_stock: true,
    is_on_sale: false,
    tags: [],
    image: ''
  })
  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    if (params.id !== 'new') {
      const products = getAllProducts()
      const foundProduct = products.find(p => p.id === params.id)
      if (foundProduct) {
        setProduct(foundProduct)
        setFormData({
          name_ar: foundProduct.name_ar,
          name_en: foundProduct.name_en,
          description_ar: foundProduct.description_ar,
          description_en: foundProduct.description_en,
          price: foundProduct.price,
          original_price: foundProduct.original_price,
          discount: foundProduct.discount || '0',
          category: foundProduct.category,
          in_stock: foundProduct.in_stock,
          is_on_sale: foundProduct.is_on_sale || false,
          tags: foundProduct.tags || [],
          image: foundProduct.image
        })
      }
    }
  }, [params.id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // محاكاة حفظ المنتج
    setTimeout(() => {
      addNotification(
        params.id === 'new' 
          ? translate('productCreated', language)
          : translate('productUpdated', language),
        'success'
      )
      router.push('/admin/products')
      setIsLoading(false)
    }, 1500)
  }

  const calculateDiscountedPrice = () => {
    if (formData.is_on_sale && formData.discount > 0) {
      const original = parseInt(formData.original_price || formData.price)
      const discount = parseInt(formData.discount)
      return (original - (original * discount / 100)).toString()
    }
    return formData.price
  }

  if (params.id !== 'new' && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-muted">{translate('loading', language)}</p>
        </div>
      </div>
    )
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/admin/products"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </a>
          <div>
            <h1 className="text-3xl font-bold text-dark">
              {params.id === 'new' ? translate('addProduct', language) : translate('editProduct', language)}
            </h1>
            <p className="text-muted">
              {params.id === 'new' 
                ? translate('addNewProductDescription', language)
                : translate('editProductDescription', language)
              }
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* النموذج الرئيسي */}
        <div className="lg:col-span-2 space-y-6">
          {/* المعلومات الأساسية */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold mb-4">{translate('basicInformation', language)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('nameAr', language)} *
                </label>
                <input
                  type="text"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder={translate('enterProductNameAr', language)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('nameEn', language)} *
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder={translate('enterProductNameEn', language)}
                />
              </div>
            </div>
          </div>

          {/* الوصف */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold mb-4">{translate('description', language)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('descriptionAr', language)}
                </label>
                <textarea
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder={translate('enterDescriptionAr', language)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('descriptionEn', language)}
                </label>
                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder={translate('enterDescriptionEn', language)}
                />
              </div>
            </div>
          </div>

          {/* السعر والعروض */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold mb-4">{translate('pricing', language)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('originalPrice', language)} *
                </label>
                <input
                  type="number"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_on_sale"
                      checked={formData.is_on_sale}
                      onChange={handleChange}
                      className="rounded"
                    />
                    {translate('onSale', language)}
                  </div>
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  disabled={!formData.is_on_sale}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50"
                  placeholder="0%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('salePrice', language)}
                </label>
                <input
                  type="text"
                  value={calculateDiscountedPrice()}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* الفئة والوسوم */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold mb-4">{translate('categorization', language)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('category', language)} *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">{translate('selectCategory', language)}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {language === 'ar' ? category.name_ar : category.name_en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('tags', language)}
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={translate('addTag', language)}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                    >
                      {translate('add', language)}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الشريط الجانبي */}
        <div className="space-y-6">
          {/* الحفظ والنشر */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold mb-4">{translate('actions', language)}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleChange}
                  className="rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  {translate('inStock', language)}
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {translate('saving', language)}...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {params.id === 'new' ? translate('createProduct', language) : translate('updateProduct', language)}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* صورة المنتج */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold mb-4">{translate('productImage', language)}</h3>
            <div className="space-y-4">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Product"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  {translate('uploadImage', language)}
                </p>
                <button
                  type="button"
                  className="text-primary text-sm font-medium hover:text-secondary"
                >
                  {translate('chooseFile', language)}
                </button>
              </div>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold mb-4">{translate('productInfo', language)}</h3>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex justify-between">
                <span>{translate('created', language)}</span>
                <span>{product?.created_at || translate('justNow', language)}</span>
              </div>
              <div className="flex justify-between">
                <span>{translate('lastUpdated', language)}</span>
                <span>{product?.updated_at || translate('justNow', language)}</span>
              </div>
              <div className="flex justify-between">
                <span>{translate('status', language)}</span>
                <span className={formData.in_stock ? 'text-green-600' : 'text-red-600'}>
                  {formData.in_stock ? translate('active', language) : translate('inactive', language)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}