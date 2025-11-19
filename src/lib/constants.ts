export const CATEGORIES = {
  hair: {
    id: 'hair',
    name: 'Hair Care',
    name_ar: 'العناية بالشعر',
    description: 'Shampoo, conditioner, hair masks and oils for perfect hair care',
    description_ar: 'شامبو، بلسم، أقنعة شعر وزيوت للعناية المثالية بشعرك',
    icon: '💇'
  },
  face: {
    id: 'face',
    name: 'Skin Care',
    name_ar: 'العناية بالبشرة',
    description: 'Cleansers, toners, serums and creams for glowing skin',
    description_ar: 'منتجات تنظيف، تونر، مصل وكريمات لبشرة مشرقة',
    icon: '✨'
  },
  lips: {
    id: 'lips',
    name: 'Lip Products',
    name_ar: 'مستحضرات الشفاه',
    description: 'Lip gloss, lip balm and lipstick in amazing colors',
    description_ar: 'لمعان شفاه، مرطب شفاه وأحمر شفاه بألوان رائعة',
    icon: '💋'
  },
  body: {
    id: 'body',
    name: 'Body Care',
    name_ar: 'العناية بالجسم',
    description: 'Shower gel, scrubs, lotion and body butter for complete care',
    description_ar: 'جل استحمام، مقشرات، لوشن وزبدة جسم للعناية الشاملة',
    icon: '🛁'
  },
  perfumes: {
    id: 'perfumes',
    name: 'Perfumes',
    name_ar: 'العطور',
    description: 'A distinctive collection of perfumes with various notes',
    description_ar: 'مجموعة مميزة من العطور بنفحات متنوعة',
    icon: '🌸'
  }
} as const

export const ORDER_STATUS = {
  pending: {
    label: 'Pending',
    label_ar: 'قيد الانتظار',
    color: 'bg-yellow-100 text-yellow-800'
  },
  confirmed: {
    label: 'Confirmed',
    label_ar: 'تم التأكيد',
    color: 'bg-blue-100 text-blue-800'
  },
  shipped: {
    label: 'Shipped',
    label_ar: 'قيد الشحن',
    color: 'bg-purple-100 text-purple-800'
  },
  delivered: {
    label: 'Delivered',
    label_ar: 'تم التوصيل',
    color: 'bg-green-100 text-green-800'
  },
  cancelled: {
    label: 'Cancelled',
    label_ar: 'ملغي',
    color: 'bg-red-100 text-red-800'
  }
} as const

export const SITE_CONFIG = {
  name: 'Nona Beauty',
  description: 'Premium cosmetics and beauty products',
  url: 'https://nona-beauty.vercel.app',
  supportEmail: 'support@nonabeauty.com',
  supportPhone: '+201094004720',
  socialLinks: {
    facebook: 'https://facebook.com/nonabeauty',
    instagram: 'https://instagram.com/nonabeauty',
    twitter: 'https://twitter.com/nonabeauty',
    whatsapp: 'https://wa.me/201094004720'
  }
} as const