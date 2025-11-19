'use client';

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/hooks/useToast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings } from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  
  const { user } = useAuth()
  const { t } = useLanguage()
  const { success, error } = useToast()

  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      })
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product (
              name,
              name_ar,
              image_url
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
// console.error('Error loading orders:', err)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)

      if (error) throw error
      success(t('profileUpdated'))
    } catch (err) {
      error(t('updateFailed'))
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', name: t('profile'), icon: User },
    { id: 'orders', name: t('orders'), icon: ShoppingBag },
    { id: 'wishlist', name: t('wishlist'), icon: Heart },
    { id: 'settings', name: t('settings'), icon: Settings }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('authenticationRequired')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('pleaseLoginToViewProfile')}
          </p>
          <Button onClick={() => window.location.href = '/auth/login'}>
            {t('login')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.full_name?.charAt(0) || user.email.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.full_name || t('noName')}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  {t('memberSince')} {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-pink-50 text-pink-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t('personalInformation')}
                  </h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label={t('fullName')}
                        value={profileData.full_name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                        icon={User}
                      />
                      <Input
                        label={t('email')}
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        icon={Mail}
                        disabled
                      />
                      <Input
                        label={t('phone')}
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        icon={Phone}
                      />
                    </div>
                    <Textarea
                      label={t('shippingAddress')}
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      icon={MapPin}
                      rows={4}
                    />
                    <Button type="submit" loading={loading}>
                      {t('updateProfile')}
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t('orderHistory')}
                  </h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {t('noOrdersYet')}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {t('noOrdersDescription')}
                      </p>
                      <Button onClick={() => window.location.href = '/products'}>
                        {t('startShopping')}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {t('order')} #{order.id.slice(-8)}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {t(order.status)}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            {order.order_items.map((item: any) => (
                              <div key={item.id} className="flex items-center space-x-3">
                                <img
                                  src={item.product.image_url}
                                  alt={item.product.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">
                                    {item.product.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {item.quantity} × {item.unit_price} LE
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                            <span className="font-semibold text-gray-900">
                              {t('total')}: {order.total_amount} LE
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.location.href = `/order-tracking?order=${order.id}`}
                            >
                              {t('viewDetails')}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t('myWishlist')}
                  </h2>
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {t('wishlistEmpty')}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('wishlistEmptyDescription')}
                    </p>
                    <Button onClick={() => window.location.href = '/products'}>
                      {t('browseProducts')}
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t('accountSettings')}
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {t('notificationPreferences')}
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 text-pink-500" defaultChecked />
                          <span className="text-gray-700">{t('emailNotifications')}</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 text-pink-500" defaultChecked />
                          <span className="text-gray-700">{t('smsNotifications')}</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 text-pink-500" />
                          <span className="text-gray-700">{t('promotionalEmails')}</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {t('privacySettings')}
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 text-pink-500" defaultChecked />
                          <span className="text-gray-700">{t('showProfile')}</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 text-pink-500" />
                          <span className="text-gray-700">{t('shareActivity')}</span>
                        </label>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      {t('downloadMyData')}
                    </Button>

                    <div className="border-t border-gray-200 pt-6">
                      <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                        {t('deleteAccount')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}