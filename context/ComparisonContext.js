'use client'
import { createContext, useContext, useState } from 'react'

const ComparisonContext = createContext()

export function ComparisonProvider({ children }) {
  const [comparisonItems, setComparisonItems] = useState([])
  
  const addToComparison = (product) => {
    if (comparisonItems.length < 4 && !comparisonItems.find(item => item.id === product.id)) {
      setComparisonItems(prev => [...prev, product])
      return true
    }
    return false
  }
  
  const removeFromComparison = (productId) => {
    setComparisonItems(prev => prev.filter(item => item.id !== productId))
  }
  
  const clearComparison = () => {
    setComparisonItems([])
  }
  
  const isInComparison = (productId) => {
    return comparisonItems.some(item => item.id === productId)
  }

  const value = {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison
  }

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  )
}

export const useComparison = () => {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}