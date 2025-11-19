'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

// Mock blog post data
const blogPost = {
  id: 1,
  title: 'How to Take Care of Your Skin in Summer',
  title_ar: 'كيف تعتني ببشرتك في الصيف',
  content: `
    <p>Summer brings sunshine and warmth, but it also brings challenges for your skin. The combination of heat, humidity, and increased sun exposure can lead to various skin issues. Here's your comprehensive guide to summer skincare:</p>
    
    <h2>1. Sun Protection is Non-Negotiable</h2>
    <p>UV rays are strongest during summer months. Always apply broad-spectrum sunscreen with at least SPF 30, and reapply every 2 hours when outdoors.</p>
    
    <h2>2. Stay Hydrated</h2>
    <p>Increased temperatures mean more sweating and potential dehydration. Drink plenty of water and use hydrating serums containing hyaluronic acid.</p>
    
    <h2>3. Adjust Your Cleansing Routine</h2>
    <p>Switch to a gentle, hydrating cleanser that won't strip your skin's natural oils while effectively removing sweat and sunscreen.</p>
    
    <h2>4. Lighten Up Your Moisturizer</h2>
    <p>Swap heavy creams for lightweight, oil-free moisturizers or gel-based formulas that provide hydration without feeling greasy.</p>
    
    <h2>5. Don't Forget Your Lips and Eyes</h2>
    <p>Use SPF lip balm and wear sunglasses to protect the delicate skin around your eyes from sun damage.</p>
  `,
  content_ar: `
    <p>يأتي الصيف بأشعة الشمس والدفء، ولكنه يجلب أيضاً تحديات لبشرتك. يمكن لمزيج الحرارة والرطوبة وزيادة التعرض للشمس أن يؤدي إلى مشاكل جلدية متنوعة. إليك دليلك الشامل للعناية بالبشرة في الصيف:</p>
    
    <h2>1. الحماية من الشمس غير قابلة للتفاوض</h2>
    <p>تكون أشعة UV أقوى خلال أشهر الصيف. ضعي دائماً واقي شمس واسع الطيف بمعامل حماية 30 على الأقل، وأعيدي تطبيقه كل ساعتين عندما تكونين في الخارج.</p>
    
    <h2>2. حافظي على ترطيب بشرتك</h2>
    <p>درجات الحرارة المرتفعة تعني المزيد من التعرق والجفاف المحتمل. اشربي الكثير من الماء واستخدمي السيرومات المرطبة التي تحتوي على حمض الهيالورونيك.</p>
    
    <h2>3. عدلي روتين التنظيف</h2>
    <p>انتقلي إلى منظف لطيف ومرطب لا يزيل الزيوت الطبيعية لبشرتك بينما يزيل العرق وواقي الشمس بفعالية.</p>
    
    <h2>4. خففي مرطبك</h2>
    <p>استبدلي الكريمات الثقيلة بمرطبات خفيفة خالية من الزيوت أو الصيغ القائمة على الجل التي توفر الترطيب دون أن تترك ملمساً دهنياً.</p>
    
    <h2>5. لا تنسي شفتيك وعينيك</h2>
    <p>استخدمي مرطب شفاه بمعامل حماية من الشمس وارتدي النظارات الشمسية لحماية الجلد الحساس حول عينيك من أضرار الشمس.</p>
  `,
  excerpt: 'Important tips for skin care during summer and maintaining its radiance',
  excerpt_ar: 'نصائح مهمة للعناية بالبشرة خلال فصل الصيف والحفاظ على نضارتها',
  image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
  author: 'Dr. Nahla Alaa',
  date: '2024-01-15',
  readTime: '5 min read',
  category: 'Skincare',
  tags: ['skincare', 'summer', 'protection', 'hydration']
}

export default function BlogPostPage() {
  const params = useParams()
  const postId = params.id as string
  const { t, language } = useLanguage()

  const displayTitle = language === 'ar' ? blogPost.title_ar : blogPost.title
  const displayContent = language === 'ar' ? blogPost.content_ar : blogPost.content

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToBlog')}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {blogPost.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {displayTitle}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center text-gray-600 space-x-6 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={blogPost.image}
              alt={displayTitle}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-sm p-8">
                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none prose-p:text-gray-700 prose-headings:text-gray-900 prose-a:text-pink-600"
                  dangerouslySetInnerHTML={{ __html: displayContent }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Share2 className="h-5 w-5 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">{t('shareThisPost')}:</span>
                    </div>
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-500">
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button className="text-blue-700 hover:text-blue-800">
                        <Linkedin className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Author Bio */}
              <div className="mt-8 bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    NA
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {blogPost.author}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t('authorBio')}
                    </p>
                    <div className="flex space-x-4">
                      <button className="text-pink-600 hover:text-pink-700 font-medium">
                        {t('viewAllPosts')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Related Posts */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {t('relatedPosts')}
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="group">
                        <h4 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2 mb-1">
                          {t('summerSkincareTips')} {i}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-3">
                    {t('stayUpdated')}
                  </h3>
                  <p className="text-pink-100 text-sm mb-4">
                    {t('newsletterDescription')}
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder={t('enterYourEmail')}
                      className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button className="w-full bg-white text-pink-600 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                      {t('subscribe')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}