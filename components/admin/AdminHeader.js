'use client'
import { useState, useEffect } from 'react'
import { Bell, Search, User, Settings } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translate } from '@/utils/translations'

export default function AdminHeader() {
  const [adminUser, setAdminUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const { language } = useLanguage()

  useEffect(() => {
    const user = localStorage.getItem('adminUser')
    if (user) {
      setAdminUser(JSON.parse(user))
    }

    // إشعارات تجريبية
    setNotifications([
      {
        id: 1,
        title: 'طلب جديد',
        message: 'تم استلام طلب جديد #ORD001',
        time: 'منذ 5 دقائق',
        read: false
      },
      {
        id: 2,
        title: 'منتج منخفض المخزون',
        message: 'منتج "شامبو" أصبح منخفض المخزون',
        time: 'منذ ساعة',
        read: false
      }
    ])
  }, [])

  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <header className="bg-white shadow-sm border-b p-4 mb-6 rounded-lg">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder={translate('search', language)}
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-muted hover:text-dark transition-colors">
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-semibold text-dark">
                {adminUser?.name || 'مدير النظام'}
              </div>
              <div className="text-sm text-muted">
                {adminUser?.role === 'super_admin' ? 'مدير عام' : 'مدير'}
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}