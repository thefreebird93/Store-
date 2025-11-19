'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // تحميل تفضيل اللغة من التخزين المحلي
    const savedLanguage = localStorage.getItem('nonaBeautyLanguage')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const switchLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('nonaBeautyLanguage', lang)
    
    // تحديث سمة HTML
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  const value = {
    language,
    switchLanguage
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}