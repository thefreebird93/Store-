'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/types/product'
import { useProducts } from '@/hooks/useProducts'
import { useLanguage } from '@/contexts/LanguageContext'
import ProductCard from '@/components/ui/ProductCard'
import { Search, Filter, Grid, List } from 'lucide-react'

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false
  })
  
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  
  const { t } = useLanguage()
  const { getProducts, loading } = useProducts()

  useEffect(() => {
    loadSearchResults()
  }, [query, category, filters])

  const loadSearchResults = async () => {
    const searchFilters: any = {}
    
    if (query) searchFilters.search = query
    if (category) searchFilters.category = category
    if (filters.category) searchFilters.category = filters.category
    if (filters.minPrice) searchFilters.minPrice = parseFloat(filters.minPrice)
    if (filters.maxPrice) searchFilters.maxPrice = parseFloat(filters.maxPrice)
    if (filters.inStock) searchFilters.inStock = true

    const results = await getProducts(searchFilters)
    setProducts(results)
  }

  const categories = [
    { id: 'hair', name: t('hair') },
    { id: 'face', name: t('face') },
    { id: 'lips', name: t('lips') },
    { id: 'body', name: t('body') },
    { id: 'perfumes', name: t('perfumes') }
  ]

  const handleViewDetails = (product: Product) => {
    window.location.href = `/products/${product.id}`
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      inStock: false
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <Search className="h-5 w-5" />
            <span>{t('searchResults')}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            "{query || t('allProducts')}"
          </h1>
          <p className="text-gray-600">
            {products.length} {t('productsFound')}
            {category && ` ${t('inCategory')} "${t(category)}"`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  {t('filters')}
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  {t('clearAll')}
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">{t('category')}</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={filters.category === cat.id}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        className="text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">{t('priceRange')}</h4>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder={t('min')}
                      value={filters.minPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder={t('max')}
                      value={filters.maxPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">{t('inStockOnly')}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {products.length} {t('productsFound')}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('searching')}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('noResultsFound')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('tryDifferentKeywords')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearFilters}
                    className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600"
                  >
                    {t('clearFilters')}
                  </button>
                  <button
                    onClick={() => window.location.href = '/products'}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    {t('browseAllProducts')}
                  </button>
                </div>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}