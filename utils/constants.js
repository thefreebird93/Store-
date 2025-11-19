// بيانات الفئات
export const categories = [
  {
    id: 'hair',
    name_ar: 'العناية بالشعر',
    name_en: 'Hair Care',
    description_ar: 'شامبو، بلسم، أقنعة شعر وزيوت للعناية المثالية بشعرك',
    description_en: 'Shampoo, conditioner, hair masks and oils for perfect hair care',
    icon: '💇'
  },
  {
    id: 'face',
    name_ar: 'العناية بالبشرة',
    name_en: 'Skin Care',
    description_ar: 'منتجات تنظيف، تونر، مصل وكريمات لبشرة مشرقة',
    description_en: 'Cleansers, toners, serums and creams for glowing skin',
    icon: '✨'
  },
  {
    id: 'lips',
    name_ar: 'مستحضرات الشفاه',
    name_en: 'Lip Products',
    description_ar: 'لمعان شفاه، مرطب شفاه وأحمر شفاه بألوان رائعة',
    description_en: 'Lip gloss, lip balm and lipstick in amazing colors',
    icon: '💋'
  },
  {
    id: 'body',
    name_ar: 'العناية بالجسم',
    name_en: 'Body Care',
    description_ar: 'جل استحمام، مقشرات، لوشن وزبدة جسم للعناية الشاملة',
    description_en: 'Shower gel, scrubs, lotion and body butter for complete care',
    icon: '🛁'
  },
  {
    id: 'perfumes',
    name_ar: 'العطور',
    name_en: 'Perfumes',
    description_ar: 'مجموعة مميزة من العطور بنفحات متنوعة تناسب جميع الأذواق',
    description_en: 'A distinctive collection of perfumes with various notes to suit all tastes',
    icon: '🌸'
  }
]

// دالة حساب السعر بعد الخصم
export const calculateDiscountedPrice = (price, discount) => {
  const priceNum = parseInt(price);
  const discountNum = parseInt(discount);
  return (priceNum - (priceNum * discountNum / 100)).toString();
};

// بيانات المنتجات الكاملة مع نظام الخصومات
export const products = {
  hair: [
    {
      id: 'hair_1',
      name_ar: 'شامبو خالي من الكبريتات 400 مل',
      name_en: 'Sulfate-Free Shampoo 400ml',
      description_ar: 'شامبو لطيف خالي من الكبريتات ينظف دون تجريد الزيوت الطبيعية. مثالي للاستخدام اليومي على جميع أنواع الشعر.',
      description_en: 'Gentle sulfate-free shampoo that cleans without stripping natural oils. Ideal for daily use on all hair types.',
      price: '136', // بعد الخصم
      original_price: '170',
      discount: '20',
      image: 'https://images.unsplash.com/photo-1627992795905-59b43c6838a5?q=80&w=500&auto=format&fit=crop',
      category: 'hair',
      rating: 4.5,
      review_count: 24,
      in_stock: true,
      sku: 'NB1001',
      tags: ['شعر', 'عناية', 'طبيعي'],
      is_on_sale: true
    },
    {
      id: 'hair_2',
      name_ar: 'بلسم خالي من الكبريتات 400 مل',
      name_en: 'Sulfate-Free Conditioner 400ml',
      description_ar: 'بلسم خالي من الكبريتات يفك التشابك ويرطب الشعر، ويتركه ناعماً وسهل التصفيف.',
      description_en: 'Sulfate-free conditioner that detangles and moisturizes hair, leaving it soft and easy to style.',
      price: '180',
      original_price: '180',
      discount: '0',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=500&auto=format&fit=crop',
      category: 'hair',
      rating: 4.3,
      review_count: 18,
      in_stock: true,
      sku: 'NB1002',
      tags: ['شعر', 'عناية', 'طبيعي'],
      is_on_sale: false
    },
    {
      id: 'hair_3',
      name_ar: 'قناع شعر 300 جم',
      name_en: 'Hair Mask 300g',
      description_ar: 'علاج تكييف عميق يصلح الشعر التالف ويعيد اللمعان والحيوية.',
      description_en: 'Deep conditioning treatment that repairs damaged hair and restores shine and vitality.',
      price: '112', // بعد الخصم
      original_price: '140',
      discount: '20',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b184f479?q=80&w=500&auto=format&fit=crop',
      category: 'hair',
      rating: 4.7,
      review_count: 32,
      in_stock: true,
      sku: 'NB1003',
      tags: ['شعر', 'عناية', 'ترطيب'],
      is_on_sale: true
    },
    {
      id: 'hair_4',
      name_ar: 'زيت شعر 30 مل',
      name_en: 'Hair Oil 30ml',
      description_ar: 'زيت شعر مغذي يضيف اللمعان والنعومة ويحمي من التلف الحراري.',
      description_en: 'Nourishing hair oil that adds shine and softness while protecting from heat damage.',
      price: '104', // بعد الخصم
      original_price: '130',
      discount: '20',
      image: 'https://images.unsplash.com/photo-1555024765-a6e30b8d5e1d?q=80&w=500&auto=format&fit=crop',
      category: 'hair',
      rating: 4.6,
      review_count: 28,
      in_stock: true,
      sku: 'NB1004',
      tags: ['شعر', 'عناية', 'زيت'],
      is_on_sale: true
    }
  ],
  face: [
    {
      id: 'face_1',
      name_ar: 'سيروم نياسمينيد',
      name_en: 'Niacinamide Serum',
      description_ar: 'مصل قوي يجمع بين الهيالورونيك والنياسيناميد والألفا يوريا للبشرة المشرقة.',
      description_en: 'Powerful serum combining hyaluronic acid, niacinamide and alpha arbutin for glowing skin.',
      price: '280', // بعد الخصم
      original_price: '350',
      discount: '20',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=500&auto=format&fit=crop',
      category: 'face',
      rating: 4.8,
      review_count: 45,
      in_stock: true,
      sku: 'NB2001',
      tags: ['بشرة', 'سيروم', 'عناية'],
      is_on_sale: true
    },
    {
      id: 'face_2',
      name_ar: 'كريم الكولاجين',
      name_en: 'Collagen Cream',
      description_ar: 'كريم الكولاجين لشد البشرة وتغذيتها ومكافحة علامات التقدم في السن.',
      description_en: 'Collagen cream for firming, nourishing skin and fighting signs of aging.',
      price: '200',
      original_price: '200',
      discount: '0',
      image: 'https://images.unsplash.com/photo-1628177732298-63c6212e3e9d?q=80&w=500&auto=format&fit=crop',
      category: 'face',
      rating: 4.5,
      review_count: 35,
      in_stock: true,
      sku: 'NB2002',
      tags: ['بشرة', 'كريم', 'عناية'],
      is_on_sale: false
    }
  ],
  lips: [
    {
      id: 'lips_1',
      name_ar: 'لمعان شفاه 10 مل',
      name_en: 'Lip Gloss 10ml',
      description_ar: 'لمعان شفاه عالي اللمعان في أنبوب ضغط مريح مع نكهة لطيفة.',
      description_en: 'High-shine lip gloss in a convenient squeeze tube with a pleasant flavor.',
      price: '52', // بعد الخصم
      original_price: '65',
      discount: '20',
      image: 'https://images.unsplash.com/photo-1616738910404-b9c2982d1c68?q=80&w=500&auto=format&fit=crop',
      category: 'lips',
      rating: 4.1,
      review_count: 12,
      in_stock: true,
      sku: 'NB3001',
      tags: ['شفاه', 'لمعان', 'تجميل'],
      is_on_sale: true
    }
  ],
  body: [
    {
      id: 'body_1',
      name_ar: 'جل استحمام 400 مل',
      name_en: 'Shower Gel 400ml',
      description_ar: 'جل استحمام منعش ينظف ويرطب البشرة برائحة عطرية مميزة.',
      description_en: 'Refreshing shower gel that cleanses and moisturizes skin with a distinctive aromatic scent.',
      price: '96', // بعد الخصم
      original_price: '120',
      discount: '20',
      image: 'https://images.unsplash.com/photo-1628177579624-a745c92e92c4?q=80&w=500&auto=format&fit=crop',
      category: 'body',
      rating: 4.3,
      review_count: 16,
      in_stock: true,
      sku: 'NB4001',
      tags: ['جسم', 'استحمام', 'نظافة'],
      is_on_sale: true
    }
  ],
  perfumes: [
    {
      id: 'perfumes_1',
      name_ar: 'عطر 30 مل',
      name_en: 'Perfume 30ml',
      description_ar: 'عطر أنيق بحجم 30 مل مريح مع بقاء طويل المدى ورائحة مميزة.',
      description_en: 'Elegant perfume in a convenient 30ml size with long-lasting effect and distinctive scent.',
      price: '208', // بعد الخصم
      original_price: '260',
      discount: '20',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=500&auto=format&fit=crop',
      category: 'perfumes',
      rating: 4.6,
      review_count: 40,
      in_stock: true,
      sku: 'NB5001',
      tags: ['عطر', 'أناقة', 'جاذبية'],
      is_on_sale: true
    }
  ]
}

// الحصول على جميع المنتجات
export const getAllProducts = () => {
  return Object.values(products).flat();
};

// الحصول على المنتجات المخفضة فقط
export const getDiscountedProducts = () => {
  return getAllProducts().filter(product => product.is_on_sale && product.discount > 0);
};

// بيانات العروض
export const offers = [
  {
    id: 'offer_1',
    title_ar: 'عرض خاص على منتجات الشعر',
    title_en: 'Special Offer on Hair Products',
    description_ar: 'خصم 20% على جميع منتجات العناية بالشعر لمدة محدودة',
    description_en: '20% discount on all hair care products for a limited time',
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=500&auto=format&fit=crop',
    discount: '20%',
    valid_until: '2024-12-31',
    category: 'hair'
  },
  {
    id: 'offer_2',
    title_ar: 'عرض العطور',
    title_en: 'Perfumes Offer',
    description_ar: 'خصم 20% على جميع العطور مع هدية مجانية',
    description_en: '20% discount on all perfumes with free gift',
    image: 'https://images.unsplash.com/photo-1588776814546-1d1a1f0c6b9a?q=80&w=500&auto=format&fit=crop',
    discount: '20%',
    valid_until: '2024-11-30',
    category: 'perfumes'
  },
  {
    id: 'offer_3',
    title_ar: 'عرض العناية بالبشرة',
    title_en: 'Skincare Offer',
    description_ar: 'خصم 20% على منتجات العناية بالبشرة المميزة',
    description_en: '20% discount on premium skincare products',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=500&auto=format&fit=crop',
    discount: '20%',
    valid_until: '2024-10-31',
    category: 'face'
  }
]

// وسائل التواصل الاجتماعية
export const socialLinks = [
  {
    name: 'فيسبوك',
    url: 'https://www.facebook.com/share/19gejDdJHE/',
    icon: '📘'
  },
  {
    name: 'انستجرام',
    url: 'https://www.instagram.com/dr_nahlaalaa?igsh=MW9keGhvbWMwajNoYg==',
    icon: '📷'
  },
  {
    name: 'واتساب',
    url: 'https://chat.whatsapp.com/Evn00no5Pl11l2URJZh2Un?mode=wwt',
    icon: '💬'
  },
  {
    name: 'تيك توك',
    url: 'https://www.tiktok.com/@nona.beauty7?_r=1&_t=ZS-9169X3uM9qa',
    icon: '🎵'
  }
]

// معلومات الاتصال
export const contactInfo = {
  email: 'nonabeauty.eg@gmail.com',
  phone: '+201094004720',
  address: 'Cairo, Egypt',
  working_hours: '9:00 AM - 10:00 PM'
}

// بيانات المدونة
export const blogPosts = [
  {
    id: 1,
    title_ar: 'كيف تعتني ببشرتك في الصيف',
    title_en: 'How to Care for Your Skin in Summer',
    excerpt_ar: 'نصائح مهمة للعناية بالبشرة خلال فصل الصيف والحفاظ على نضارتها',
    excerpt_en: 'Important tips for skin care during summer and maintaining its radiance',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=500&auto=format&fit=crop',
    date: '2024-06-15',
    content_ar: 'محتويات المقال الكاملة عن العناية بالبشرة في الصيف...',
    content_en: 'Full article content about summer skin care...'
  },
  {
    id: 2,
    title_ar: 'أفضل المنتجات للشعر الجاف',
    title_en: 'Best Products for Dry Hair',
    excerpt_ar: 'اكتشف أفضل المنتجات المناسبة للعناية بالشعر الجاف والمتقصف',
    excerpt_en: 'Discover the best products suitable for dry and brittle hair care',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=500&auto=format&fit=crop',
    date: '2024-06-10',
    content_ar: 'محتويات المقال الكاملة عن العناية بالشعر الجاف...',
    content_en: 'Full article content about dry hair care...'
  }
]

// بيانات الأدمن
export const adminUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'مدير النظام',
    role: 'super_admin'
  }
]

// بيانات الطلبات
export const orders = [
  {
    id: 'ORD001',
    customer_name: 'أحمد محمد',
    customer_email: 'ahmed@example.com',
    customer_phone: '+201234567890',
    total: 450,
    status: 'completed',
    items: [
      { product_id: 'hair_1', quantity: 2, price: 136 },
      { product_id: 'face_1', quantity: 1, price: 280 }
    ],
    created_at: '2024-01-15'
  }
]