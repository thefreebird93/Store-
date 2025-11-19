'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: 'How to Take Care of Your Skin in Summer',
    title_ar: 'كيف تعتني ببشرتك في الصيف',
    excerpt: 'Important tips for skin care during summer and maintaining its radiance',
    excerpt_ar: 'نصائح مهمة للعناية بالبشرة خلال فصل الصيف والحفاظ على نضارتها',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    author: 'Dr. Nahla Alaa',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Skincare'
  },
  {
    id: 2,
    title: 'Best Products for Dry Hair',
    title_ar: 'أفضل المنتجات للشعر الجاف',
    excerpt: 'Discover the best products suitable for dry and damaged hair care',
    excerpt_ar: 'اكتشف أفضل المنتجات المناسبة للعناية بالشعر الجاف والمتقصف',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500',
    author: 'Beauty Expert',
    date: '2024-01-10',
    readTime: '4 min read',
    category: 'Haircare'
  },
  {
    id: 3,
    title: 'Secrets of Natural Makeup',
    title_ar: 'أسرار المكياج الطبيعي',
    excerpt: 'Learn how to apply natural makeup that highlights your beauty without exaggeration',
    excerpt_ar: 'تعلمي كيفية تطبيق مكياج طبيعي يبرز جمالك دون مبالغة',
    image: 'https://images.unsplash.com/photo-1596462502895-d85290b3a097?w=500',
    author: 'Makeup Artist',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Makeup'
  },
  {
    id: 4,
    title: 'The Ultimate Skincare Routine',
    title_ar: 'روتين العناية بالبشرة المثالي',
    excerpt: 'Step-by-step guide to creating the perfect skincare routine for your skin type',
    excerpt_ar: 'دليل خطوة بخطوة لإنشاء روتين العناية بالبشرة المثالي لنوع بشرتك',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=500',
    author: 'Skin Specialist',
    date: '2024-01-01',
    readTime: '8 min read',
    category: 'Skincare'
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { t, language } = useLanguage()

  const categories = ['all', 'Skincare', 'Haircare', 'Makeup', 'Wellness']

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('blog')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('blogSubtitle')}
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? t('all') : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={language === 'ar' ? post.title_ar : post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {language === 'ar' ? post.title_ar : post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {language === 'ar' ? post.excerpt_ar : post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-pink-600 font-semibold group-hover:translate-x-2 transition-transform"
                >
                  {t('readMore')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              {t('loadMore')}
            </button>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">{t('stayUpdated')}</h2>
          <p className="mb-6 opacity-90 max-w-md mx-auto">
            {t('newsletterDescription')}
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder={t('enterYourEmail')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}