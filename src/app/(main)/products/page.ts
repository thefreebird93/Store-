'use client';

'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/types/product'
import { useProducts } from '@/hooks/useProducts'
import { useLanguage } from '@/contexts/LanguageContext'
import ProductCard from '@/components/ui/ProductCard'
import { Filter, Grid, List } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const { t } = useLanguage()
  const { getProducts, loading } = useProducts()

  useEffect(() => {
    loadProducts()
  }, [category, sortBy])

  const loadProducts = async () => {
    const filters: any = {}
    if (category) filters.category = category
    if (sortBy) {
      // Add sorting logic based on sortBy
    }
    
    const productsData = await getProducts(filters)
    setProducts(productsData)
  }

  const categories = [
    { id: 'hair', name: t('hair'), count: products.filter(p => p.category === 'hair').length },
    { id: 'face', name: t('face'), count: products.filter(p => p.category === 'face').length },
    { id: 'lips', name: t('lips'), count: products.filter(p => p.category === 'lips').length },
    { id: 'body', name: t('body'), count: products.filter(p => p.category === 'body').length },
    { id: 'perfumes', name: t('perfumes'), count: products.filter(p => p.category === 'perfumes').length },
  ]

  const handleViewDetails = (product: Product) => {
    window.location.href = `/products/${product.id}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('products')}</h1>
          <p className="text-gray-600">{t('productsSubtitle')}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                {t('categories')}
              </h3>
              
              <div className="space-y-2">
                <a
                  href="/products"
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    !category
                      ? 'bg-pink-50 text-pink-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('allCategories')} ({products.length})
                </a>
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      category === cat.id
                        ? 'bg-pink-50 text-pink-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </a>
                ))}
              </div>

              {/* Price Filter */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">{t('priceRange')}</h4>
                <div className="space-y-2">
                  {/* Add price range slider here */}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
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

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="newest">{t('sortNewest')}</option>
                    <option value="price-low">{t('sortPriceLow')}</option>
                    <option value="price-high">{t('sortPriceHigh')}</option>
                    <option value="name">{t('sortName')}</option>
                    <option value="popular">{t('sortPopular')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('noProductsFound')}
                </h3>
                <p className="text-gray-600">{t('tryDifferentFilters')}</p>
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