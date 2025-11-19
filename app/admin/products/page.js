'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Package } from 'lucide-react'
import { getAllProducts, categories } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    const allProducts = getAllProducts()
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  useEffect(() => {
    let filtered = products

    // البحث
    if (searchTerm) {
      filtered = filtered.filter(product =>
        (language === 'ar' ? product.name_ar : product.name_en).toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // التصفية حسب الفئة
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // التصفية حسب الحالة
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'in_stock') {
        filtered = filtered.filter(product => product.in_stock)
      } else if (selectedStatus === 'out_of_stock') {
        filtered = filtered.filter(product => !product.in_stock)
      } else if (selectedStatus === 'on_sale') {
        filtered = filtered.filter(product => product.is_on_sale)
      }
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, selectedStatus, products, language])

  const handleDeleteProduct = (productId) => {
    if (window.confirm(translate('deleteProductConfirm', language))) {
      setProducts(prev => prev.filter(p => p.id !== productId))
      addNotification(translate('productDeleted', language), 'success')
    }
  }

  const handleToggleStock = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, in_stock: !p.in_stock } : p
    ))
    addNotification(translate('stockUpdated', language), 'success')
  }

  const handleToggleSale = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { 
        ...p, 
        is_on_sale: !p.is_on_sale,
        discount: !p.is_on_sale ? 20 : 0,
        price: !p.is_on_sale ? (parseInt(p.original_price) * 0.8).toString() : p.original_price
      } : p
    ))
    addNotification(translate('saleStatusUpdated', language), 'success')
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{translate('manageProducts', language)}</h1>
          <p className="text-muted">{translate('manageProductsDescription', language)}</p>
        </div>
        <a
          href="/admin/products/new"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          {translate('addProduct', language)}
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Package size={24} className="text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{products.length}</div>
              <div className="text-sm text-muted">{translate('totalProducts', language)}</div>
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
                {products.filter(p => p.in_stock).length}
              </div>
              <div className="text-sm text-muted">{translate('inStock', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Package size={24} className="text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {products.filter(p => !p.in_stock).length}
              </div>
              <div className="text-sm text-muted">{translate('outOfStock', language)}</div>
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
                {products.filter(p => p.is_on_sale).length}
              </div>
              <div className="text-sm text-muted">{translate('onSale', language)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('search', language)}
            </label>
            <div className="relative">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder={translate('searchProducts', language)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('category', language)}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">{translate('allCategories', language)}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {language === 'ar' ? category.name_ar : category.name_en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('status', language)}
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">{translate('allStatus', language)}</option>
              <option value="in_stock">{translate('inStock', language)}</option>
              <option value="out_of_stock">{translate('outOfStock', language)}</option>
              <option value="on_sale">{translate('onSale', language)}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('actions', language)}
            </label>
            <button className="w-full p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Filter size={16} />
              {translate('moreFilters', language)}
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{translate('product', language)}</th>
                <th>{translate('category', language)}</th>
                <th>{translate('price', language)}</th>
                <th>{translate('stock', language)}</th>
                <th>{translate('status', language)}</th>
                <th>{translate('actions', language)}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={language === 'ar' ? product.name_ar : product.name_en}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">
                          {language === 'ar' ? product.name_ar : product.name_en}
                        </div>
                        <div className="text-sm text-muted">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {translate(product.category, language)}
                    </span>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="font-bold text-primary">{product.price} LE</div>
                      {product.is_on_sale && (
                        <div className="text-xs text-muted line-through">
                          {product.original_price} LE
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStock(product.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.in_stock
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {product.in_stock ? translate('inStock', language) : translate('outOfStock', language)}
                    </button>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleToggleSale(product.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.is_on_sale
                            ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {product.is_on_sale ? `${product.discount}% OFF` : translate('regular', language)}
                      </button>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <span>⭐ {product.rating}</span>
                        <span>({product.review_count})</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/products/${product.id}`}
                        target="_blank"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title={translate('view', language)}
                      >
                        <Eye size={16} />
                      </a>
                      <a
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title={translate('edit', language)}
                      >
                        <Edit size={16} />
                      </a>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title={translate('delete', language)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              {translate('noProductsFound', language)}
            </h3>
            <p className="text-gray-400 mb-4">
              {translate('noProductsMatchFilters', language)}
            </p>
            <a
              href="/admin/products/new"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2"
            >
              <Plus size={20} />
              {translate('addFirstProduct', language)}
            </a>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center admin-card">
          <div className="text-sm text-muted">
            {translate('showing', language)} {filteredProducts.length} {translate('of', language)} {products.length} {translate('products', language)}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              {translate('previous', language)}
            </button>
            <button className="px-3 py-2 border border-primary bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              {translate('next', language)}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}