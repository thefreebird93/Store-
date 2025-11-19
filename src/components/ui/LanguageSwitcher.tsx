'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm rounded-full transition-colors ${
          language === 'en'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 text-sm rounded-full transition-colors ${
          language === 'ar'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        AR
      </button>
    </div>
  )
}