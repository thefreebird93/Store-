export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: string
  customer_notes?: string
  tracking_number?: string
  created_at: string
  updated_at: string
  order_items: OrderItem[]
  user?: {
    full_name: string
    email: string
    phone: string
  }
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  product: {
    name: string
    name_ar: string
    image_url: string
    sku: string
  }
}

export interface CreateOrderRequest {
  user_id: string
  items: {
    product_id: string
    quantity: number
  }[]
  shipping_address: string
  customer_notes?: string
}