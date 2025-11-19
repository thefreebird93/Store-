'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, Eye, EyeOff } from 'lucide-react'
import { adminUsers } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
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
    setIsLoading(true)

    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      const user = adminUsers.find(u => 
        u.username === formData.username && u.password === formData.password
      )

      if (user) {
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminUser', JSON.stringify(user))
        addNotification(translate('loginSuccess', language), 'success')
        router.push('/admin')
      } else {
        addNotification(translate('invalidCredentials', language), 'error')
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* الشعار */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
              NB
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Nona Beauty</h1>
          <p className="text-white text-opacity-80">{translate('adminPanel', language)}</p>
        </div>

        {/* نموذج تسجيل الدخول */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">{translate('adminLogin', language)}</h2>
            <p className="text-muted">{translate('enterCredentials', language)}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                {translate('username', language)}
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder={translate('enterUsername', language)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {translate('password', language)}
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder={translate('enterPassword', language)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-dark"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {translate('loggingIn', language)}...
                </>
              ) : (
                translate('login', language)
              )}
            </button>
          </form>

          {/* معلومات تسجيل الدخول للاختبار */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">{translate('testCredentials', language)}:</h4>
            <div className="text-xs text-muted space-y-1">
              <div>{translate('username', language)}: <strong>admin</strong></div>
              <div>{translate('password', language)}: <strong>admin123</strong></div>
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="text-center mt-6">
          <p className="text-white text-opacity-70 text-sm">
            © 2024 Nona Beauty. {translate('allRightsReserved', language)}
          </p>
        </div>
      </div>
    </div>
  )
}