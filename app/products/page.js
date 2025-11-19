'use client'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import Search from '@/components/Search'
import Filter from '@/components/Filter'
import { getAllProducts, categories } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { translate } from '@/utils/translations'

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const { language } = useLanguage()

  useEffect(() => {
    const products = getAllProducts()
    setAllProducts(products)
    setFilteredProducts(products)
  }, [])

  useEffect(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price) - parseInt(b.price)
        case 'price-high':
          return parseInt(b.price) - parseInt(a.price)
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return (language === 'ar' ? a.name_ar : a.name_en).localeCompare(language === 'ar' ? b.name_ar : b.name_en)
      }
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, sortBy, allProducts, language])

  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(allProducts)
      return
    }

    const filtered = allProducts.filter(product =>
      (language === 'ar' ? product.name_ar : product.name_en).toLowerCase().includes(query.toLowerCase()) ||
      (language === 'ar' ? product.description_ar : product.description_en).toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )

    setFilteredProducts(filtered)
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-light py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{translate('products', language)}</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {translate('productsSubtitle', language)}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-custom p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <Search onSearch={handleSearch} />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {translate('category', language)}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">{translate('allCategories', language)}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {language === 'ar' ? category.name_ar : category.name_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {translate('sortBy', language)}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="name">{translate('sortName', language)}</option>
                <option value="price-low">{translate('sortPriceLow', language)}</option>
                <option value="price-high">{translate('sortPriceHigh', language)}</option>
                <option value="rating">{translate('sortRating', language)}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-dark">
              {translate('productsFound', language)}: {filteredProducts.length}
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-muted mb-2">
                {translate('noProductsFound', language)}
              </h3>
              <p className="text-muted">{translate('tryDifferentSearch', language)}</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Categories */}
        <div className="bg-white rounded-xl shadow-custom p-8">
          <h3 className="text-2xl font-semibold text-center mb-8">{translate('browseByCategory', language)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <a
                key={category.id}
                href={`/categories/${category.id}`}
                className="flex flex-col items-center p-4 rounded-lg border-2 border-transparent hover:border-primary hover:bg-pink-50 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <span className="font-medium text-center">
                  {language === 'ar' ? category.name_ar : category.name_en}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
