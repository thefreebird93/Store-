export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  address?: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  avatar_url?: string
  date_of_birth?: string
  preferences?: {
    language: string
    currency: string
    notifications: boolean
  }
  created_at: string
  updated_at: string
}