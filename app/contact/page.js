'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { contactInfo, socialLinks } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // محاكاة إرسال النموذج
    setTimeout(() => {
      setIsSubmitting(false)
      addNotification(translate('messageSent', language), 'success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-light py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{translate('contactUs', language)}</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {translate('contactSubtitle', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* معلومات الاتصال */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-custom p-6">
              <h3 className="text-xl font-semibold mb-6">{translate('contactInfo', language)}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{translate('email', language)}</div>
                    <div className="text-muted">{contactInfo.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{translate('phone', language)}</div>
                    <div className="text-muted">{contactInfo.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{translate('address', language)}</div>
                    <div className="text-muted">{contactInfo.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{translate('workingHours', language)}</div>
                    <div className="text-muted">{contactInfo.working_hours}</div>
                  </div>
                </div>
              </div>

              {/* وسائل التواصل الاجتماعي */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4">{translate('followUs', language)}</h4>
                <div className="flex gap-3">
                  {socialLinks.map(link => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-secondary transition-colors"
                      title={link.name}
                    >
                      <span className="text-lg">{link.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-4">{translate('quickSupport', language)}</h4>
              <p className="text-sm opacity-90 mb-4">
                {translate('supportDescription', language)}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {translate('supportFeature1', language)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {translate('supportFeature2', language)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {translate('supportFeature3', language)}
                </div>
              </div>
            </div>
          </div>

          {/* نموذج الاتصال */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-custom p-8">
              <h3 className="text-2xl font-semibold mb-6">{translate('sendMessage', language)}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('name', language)} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={translate('enterYourName', language)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('email', language)} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={translate('enterYourEmail', language)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('phone', language)}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={translate('enterYourPhone', language)}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('subject', language)} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">{translate('selectSubject', language)}</option>
                      <option value="general">{translate('generalInquiry', language)}</option>
                      <option value="product">{translate('productQuestion', language)}</option>
                      <option value="order">{translate('orderSupport', language)}</option>
                      <option value="technical">{translate('technicalSupport', language)}</option>
                      <option value="other">{translate('other', language)}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {translate('message', language)} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    placeholder={translate('enterYourMessage', language)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {translate('sending', language)}...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {translate('sendMessage', language)}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* معلومات الاستجابة */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-blue-800 mb-2">{translate('responseTime', language)}</h4>
              <p className="text-blue-700 text-sm">
                {translate('responseDescription', language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}