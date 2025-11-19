'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

// Mock blog post data (مثل ما عندك)
const blogPost = {
  id: 1,
  title: "Blog Post Title",
  content: "Blog content...",
  // ... other properties
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
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{displayTitle}</h1>
            {/* Meta Information */}
            ...
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img src={blogPost.image} alt={displayTitle} className="w-full h-96 object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-sm p-8">
                <div 
                  className="prose prose-lg max-w-none prose-p:text-gray-700 prose-headings:text-gray-900 prose-a:text-pink-600"
                  dangerouslySetInnerHTML={{ __html: displayContent }}
                />
                {/* Tags, Share, Author Bio ... */}
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Posts, Newsletter ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
