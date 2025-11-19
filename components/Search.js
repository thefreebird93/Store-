'use client'
import { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translate } from '@/utils/translations'

export default function Search({ onSearch }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder={translate('searchProducts', language)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
        />
        <SearchIcon 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-dark"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="text-sm text-muted mb-3">
              {translate('searchSuggestions', language)}
            </div>
            {/* يمكن إضافة الاقتراحات هنا */}
            <div className="text-center py-8 text-muted">
              {translate('typeToSearch', language)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}