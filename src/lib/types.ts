export interface ApiResponse<T = any> {
  data?: T
  error?: string
  success: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams {
  query: string
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

export interface FilterOptions {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  inStock: boolean
}

export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  monthlyGrowth: number
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}