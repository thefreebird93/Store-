import { useState } from 'react'
import { Product } from '@/types/product'
import { supabase } from '@/lib/supabase'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  getProducts: (filters?: ProductFilters) => Promise<Product[]>
  getProduct: (id: string) => Promise<Product | null>
  createProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

interface ProductFilters {
  category?: string
  limit?: number
  search?: string
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProducts = async (filters: ProductFilters = {}): Promise<Product[]> => {
    setLoading(true)
    setError(null)
    
    try {
      let query = supabase.from('products').select('*')
      
      if (filters.category) {
        query = query.eq('category', filters.category)
      }
      
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,name_ar.ilike.%${filters.search}%`)
      }
      
      if (filters.limit) {
        query = query.limit(filters.limit)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      
      setProducts(data || [])
      return data || []
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return []
    } finally {
      setLoading(false)
    }
  }

  const getProduct = async (id: string): Promise<Product | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase
        .from('products')
        .insert([product])
      
      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
      
      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Remove from local state
      setProducts(prev => prev.filter(product => product.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    error,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  }
}