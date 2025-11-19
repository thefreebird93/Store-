'use client'
import { useState, useEffect } from 'react'
import { Save, Store, Mail, Phone, MapPin, Globe, CreditCard, Truck, Shield } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    store: {
      name_ar: 'Nona Beauty',
      name_en: 'Nona Beauty',
      description_ar: 'متجر متكامل لمستحضرات التجميل والعناية بالبشرة والشعر',
      description_en: 'Complete store for cosmetics, skin and hair care',
      logo: '',
      favicon: ''
    },
    contact: {
      email: 'nonabeauty.eg@gmail.com',
      phone: '+201094004720',
      address_ar: 'القاهرة، مصر',
      address_en: 'Cairo, Egypt',
      working_hours: '9:00 AM - 10:00 PM'
    },
    social: {
      facebook: 'https://facebook.com/nonabeauty',
      instagram: 'https://instagram.com/nonabeauty',
      twitter: 'https://twitter.com/nonabeauty',
      whatsapp: 'https://wa.me/201094004720'
    },
    payment: {
      cash_on_delivery: true,
      credit_card: true,
      bank_transfer: false,
      paypal: false
    },
    shipping: {
      free_shipping_minimum: 500,
      shipping_cost: 50,
      estimated_delivery: '2-5 أيام'
    },
    general: {
      currency: 'LE',
      language: 'ar',
      timezone: 'Africa/Cairo',
      maintenance_mode: false
    }
  })
  const [activeTab, setActiveTab] = useState('store')
  const [isLoading, setIsLoading] = useState(false)
  const { language, switchLanguage } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    // تحميل الإعدادات من التخزين المحلي
    const savedSettings = localStorage.getItem('nonaBeautySettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    
    // محاكاة حفظ الإعدادات
    setTimeout(() => {
      localStorage.setItem('nonaBeautySettings', JSON.stringify(settings))
      addNotification(translate('settingsSaved', language), 'success')
      setIsLoading(false)
    }, 1500)
  }

  const tabs = [
    { id: 'store', label: 'storeSettings', icon: Store },
    { id: 'contact', label: 'contactInfo', icon: Mail },
    { id: 'social', label: 'socialMedia', icon: Globe },
    { id: 'payment', label: 'paymentMethods', icon: CreditCard },
    { id: 'shipping', label: 'shippingSettings', icon: Truck },
    { id: 'general', label: 'generalSettings', icon: Shield }
  ]

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{translate('settings', language)}</h1>
          <p className="text-muted">{translate('settingsDescription', language)}</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {translate('saving', language)}...
            </>
          ) : (
            <>
              <Save size={20} />
              {translate('saveSettings', language)}
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="admin-card">
            <nav className="space-y-2">
              {tabs.map(tab => {
                const TabIcon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-muted hover:bg-gray-100 hover:text-dark'
                    }`}
                  >
                    <TabIcon size={20} />
                    <span>{translate(tab.label, language)}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="admin-card">
            {/* Store Settings */}
            {activeTab === 'store' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">{translate('storeSettings', language)}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('storeNameAr', language)} *
                    </label>
                    <input
                      type="text"
                      value={settings.store.name_ar}
                      onChange={(e) => handleSettingChange('store', 'name_ar', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('storeNameEn', language)} *
                    </label>
                    <input
                      type="text"
                      value={settings.store.name_en}
                      onChange={(e) => handleSettingChange('store', 'name_en', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('descriptionAr', language)}
                    </label>
                    <textarea
                      value={settings.store.description_ar}
                      onChange={(e) => handleSettingChange('store', 'description_ar', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('descriptionEn', language)}
                    </label>
                    <textarea
                      value={settings.store.description_en}
                      onChange={(e) => handleSettingChange('store', 'description_en', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('logoURL', language)}
                    </label>
                    <input
                      type="url"
                      value={settings.store.logo}
                      onChange={(e) => handleSettingChange('store', 'logo', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('faviconURL', language)}
                    </label>
                    <input
                      type="url"
                      value={settings.store.favicon}
                      onChange={(e) => handleSettingChange('store', 'favicon', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">{translate('contactInfo', language)}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('email', language)} *
                    </label>
                    <input
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) => handleSettingChange('contact', 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('phone', language)} *
                    </label>
                    <input
                      type="tel"
                      value={settings.contact.phone}
                      onChange={(e) => handleSettingChange('contact', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('addressAr', language)}
                    </label>
                    <input
                      type="text"
                      value={settings.contact.address_ar}
                      onChange={(e) => handleSettingChange('contact', 'address_ar', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('addressEn', language)}
                    </label>
                    <input
                      type="text"
                      value={settings.contact.address_en}
                      onChange={(e) => handleSettingChange('contact', 'address_en', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translate('workingHours', language)}
                  </label>
                  <input
                    type="text"
                    value={settings.contact.working_hours}
                    onChange={(e) => handleSettingChange('contact', 'working_hours', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="9:00 AM - 10:00 PM"
                  />
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">{translate('paymentMethods', language)}</h3>
                
                <div className="space-y-4">
                  {Object.entries(settings.payment).map(([method, enabled]) => (
                    <div key={method} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium">
                          {translate(method, language)}
                        </div>
                        <div className="text-sm text-muted">
                          {translate(`${method}Description`, language)}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => handleSettingChange('payment', method, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">{translate('shippingSettings', language)}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('freeShippingMinimum', language)} (LE)
                    </label>
                    <input
                      type="number"
                      value={settings.shipping.free_shipping_minimum}
                      onChange={(e) => handleSettingChange('shipping', 'free_shipping_minimum', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('shippingCost', language)} (LE)
                    </label>
                    <input
                      type="number"
                      value={settings.shipping.shipping_cost}
                      onChange={(e) => handleSettingChange('shipping', 'shipping_cost', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translate('estimatedDelivery', language)}
                  </label>
                  <input
                    type="text"
                    value={settings.shipping.estimated_delivery}
                    onChange={(e) => handleSettingChange('shipping', 'estimated_delivery', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="2-5 أيام"
                  />
                </div>
              </div>
            )}

            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">{translate('generalSettings', language)}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('defaultLanguage', language)}
                    </label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => {
                        handleSettingChange('general', 'language', e.target.value)
                        switchLanguage(e.target.value)
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('currency', language)}
                    </label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="LE">جنيه مصري (LE)</option>
                      <option value="USD">دولار أمريكي ($)</option>
                      <option value="EUR">يورو (€)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translate('timezone', language)}
                    </label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="Africa/Cairo">Africa/Cairo</option>
                      <option value="UTC">UTC</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium">
                      {translate('maintenanceMode', language)}
                    </div>
                    <div className="text-sm text-muted">
                      {translate('maintenanceModeDescription', language)}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.general.maintenance_mode}
                      onChange={(e) => handleSettingChange('general', 'maintenance_mode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}