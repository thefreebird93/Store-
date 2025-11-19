export interface Product {
  id: string
  name: string
  name_ar: string
  description: string
  description_ar: string
  price: number
  original_price?: number
  image_url: string
  category: 'hair' | 'face' | 'lips' | 'body' | 'perfumes'
  in_stock: boolean
  sku: string
  rating: number
  review_count: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text: string
  order_index: number
}

export interface ProductReview {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  user: {
    name: string
  }
}