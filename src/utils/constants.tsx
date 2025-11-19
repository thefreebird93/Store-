export const APP_CONFIG = {
  name: 'Nona Beauty',
  description: 'Premium Cosmetics and Beauty Products',
  version: '1.0.0',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}

export const SUPPORT_CONFIG = {
  email: 'support@nonabeauty.com',
  phone: '+201094004720',
  whatsapp: '+201094004720',
  address: '123 Beauty Street, Cairo, Egypt',
  workingHours: '9:00 AM - 10:00 PM',
}

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/nonabeauty',
  instagram: 'https://instagram.com/nonabeauty',
  twitter: 'https://twitter.com/nonabeauty',
  tiktok: 'https://tiktok.com/@nonabeauty',
  youtube: 'https://youtube.com/@nonabeauty',
}

export const PAYMENT_METHODS = {
  cash: { name: 'Cash on Delivery', name_ar: 'الدفع عند الاستلام' },
  card: { name: 'Credit Card', name_ar: 'البطاقة الائتمانية' },
  wallet: { name: 'E-Wallet', name_ar: 'المحفظة الإلكترونية' },
}

export const SHIPPING_METHODS = {
  standard: { 
    name: 'Standard Shipping', 
    name_ar: 'الشحن العادي',
    cost: 25,
    duration: '3-5 days'
  },
  express: { 
    name: 'Express Shipping', 
    name_ar: 'الشحن السريع',
    cost: 50,
    duration: '1-2 days'
  },
  free: { 
    name: 'Free Shipping', 
    name_ar: 'شحن مجاني',
    cost: 0,
    duration: '5-7 days'
  },
}

export const ORDER_STATUS = {
  pending: { 
    label: 'Pending', 
    label_ar: 'قيد الانتظار',
    color: 'yellow'
  },
  confirmed: { 
    label: 'Confirmed', 
    label_ar: 'تم التأكيد',
    color: 'blue'
  },
  shipped: { 
    label: 'Shipped', 
    label_ar: 'قيد الشحن',
    color: 'purple'
  },
  delivered: { 
    label: 'Delivered', 
    label_ar: 'تم التوصيل',
    color: 'green'
  },
  cancelled: { 
    label: 'Cancelled', 
    label_ar: 'ملغي',
    color: 'red'
  },
} as const

export const CATEGORIES = {
  hair: {
    id: 'hair',
    name: 'Hair Care',
    name_ar: 'العناية بالشعر',
    description: 'Shampoo, conditioner, hair masks and oils',
    description_ar: 'شامبو، بلسم، أقنعة شعر وزيوت',
    icon: '💇',
    color: 'blue'
  },
  face: {
    id: 'face',
    name: 'Skin Care',
    name_ar: 'العناية بالبشرة',
    description: 'Cleansers, toners, serums and creams',
    description_ar: 'منتجات تنظيف، تونر، مصل وكريمات',
    icon: '✨',
    color: 'pink'
  },
  lips: {
    id: 'lips',
    name: 'Lip Products',
    name_ar: 'مستحضرات الشفاه',
    description: 'Lip gloss, lip balm and lipstick',
    description_ar: 'لمعان شفاه، مرطب شفاه وأحمر شفاه',
    icon: '💋',
    color: 'red'
  },
  body: {
    id: 'body',
    name: 'Body Care',
    name_ar: 'العناية بالجسم',
    description: 'Shower gel, scrubs, lotion and body butter',
    description_ar: 'جل استحمام، مقشرات، لوشن وزبدة جسم',
    icon: '🛁',
    color: 'green'
  },
  perfumes: {
    id: 'perfumes',
    name: 'Perfumes',
    name_ar: 'العطور',
    description: 'A distinctive collection of perfumes',
    description_ar: 'مجموعة مميزة من العطور',
    icon: '🌸',
    color: 'purple'
  },
} as const