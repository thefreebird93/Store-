import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  name_ar: z.string().min(1, 'Arabic product name is required'),
  description: z.string().optional(),
  description_ar: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  original_price: z.number().optional(),
  image_url: z.string().url('Invalid image URL'),
  category: z.enum(['hair', 'face', 'lips', 'body', 'perfumes']),
  in_stock: z.boolean().default(true),
  sku: z.string().min(1, 'SKU is required'),
  tags: z.array(z.string()).default([]),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const orderSchema = z.object({
  user_id: z.string().uuid('Invalid user ID'),
  items: z.array(z.object({
    product_id: z.string().uuid('Invalid product ID'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  })).min(1, 'At least one item is required'),
  shipping_address: z.string().min(1, 'Shipping address is required'),
  customer_notes: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ProductFormData = z.infer<typeof productSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type OrderFormData = z.infer<typeof orderSchema>