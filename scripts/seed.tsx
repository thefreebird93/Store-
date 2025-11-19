import { supabase } from '@/lib/supabase'

const sampleProducts = [
  {
    name: 'Sulfate-Free Shampoo 400ml',
    name_ar: 'شامبو خالي من الكبريتات 400 مل',
    description: 'Gentle sulfate-free shampoo that cleanses without stripping natural oils. Perfect for daily use on all hair types.',
    description_ar: 'شامبو لطيف خالي من الكبريتات ينظف دون تجريد الزيوت الطبيعية. مثالي للاستخدام اليومي على جميع أنواع الشعر.',
    price: 170.00,
    image_url: 'https://images.unsplash.com/photo-1627992795905-59b43c6838a5?w=500',
    category: 'hair',
    in_stock: true,
    sku: 'NB1001',
    rating: 4.5,
    review_count: 24,
    tags: ['hair', 'care', 'natural']
  },
  // Add more sample products...
]

async function seedDatabase() {
  console.log('Seeding database...')

  for (const product of sampleProducts) {
    const { error } = await supabase
      .from('products')
      .insert([product])

    if (error) {
      console.error('Error seeding product:', error)
    } else {
      console.log('Product seeded:', product.name)
    }
  }

  console.log('Database seeding completed!')
}

seedDatabase()
