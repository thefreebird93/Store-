'use client'
import { useState, useEffect } from 'react'
import { Search, Mail, Phone, MapPin, Calendar, Edit, Trash2, User } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    // بيانات عملاء تجريبية
    const sampleCustomers = [
      {
        id: 1,
        name: 'سارة محمد',
        email: 'sara@example.com',
        phone: '+201234567890',
        address: 'القاهرة، مصر',
        joinDate: '2024-01-15',
        totalOrders: 5,
        totalSpent: 1250,
        lastOrder: '2024-03-01'
      },
      {
        id: 2,
        name: 'أحمد علي',
        email: 'ahmed@example.com',
        phone: '+201234567891',
        address: 'الجيزة، مصر',
        joinDate: '2024-02-10',
        totalOrders: 3,
        totalSpent: 780,
        lastOrder: '2024-02-28'
      },
      {
        id: 3,
        name: 'فاطمة محمود',
        email: 'fatma@example.com',
        phone: '+201234567892',
        address: 'الإسكندرية، مصر',
        joinDate: '2024-01-20',
        totalOrders: 8,
        totalSpent: 2100,
        lastOrder: '2024-03-05'
      }
    ]
    setCustomers(sampleCustomers)
    setFilteredCustomers(sampleCustomers)
  }, [])

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    )
    setFilteredCustomers(filtered)
  }, [searchTerm, customers])

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm(translate('deleteCustomerConfirm', language))) {
      setCustomers(prev => prev.filter(customer => customer.id !== customerId))
      addNotification(translate('customerDeleted', language), 'success')
    }
  }

  const getTotalCustomers = () => customers.length
  const getTotalRevenue = () => customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const getAverageOrderValue = () => {
    const totalOrders = customers.reduce((sum, customer) => sum + customer.totalOrders, 0)
    return totalOrders > 0 ? getTotalRevenue() / totalOrders : 0
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{translate('manageCustomers', language)}</h1>
          <p className="text-muted">{translate('manageCustomersDescription', language)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <User size={24} className="text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{getTotalCustomers()}</div>
              <div className="text-sm text-muted">{translate('totalCustomers', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <User size={24} className="text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{getTotalRevenue()} LE</div>
              <div className="text-sm text-muted">{translate('totalRevenue', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <User size={24} className="text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {Math.round(getAverageOrderValue())} LE
              </div>
              <div className="text-sm text-muted">{translate('avgOrderValue', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <User size={24} className="text-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">
                {Math.max(...customers.map(c => c.totalOrders)) || 0}
              </div>
              <div className="text-sm text-muted">{translate('mostOrders', language)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder={translate('searchCustomers', language)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="admin-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{customer.name}</h3>
                  <p className="text-sm text-muted">ID: {customer.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                  title={translate('edit', language)}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title={translate('delete', language)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Mail size={16} />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Phone size={16} />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={16} />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Calendar size={16} />
                <span>{translate('joined', language)}: {customer.joinDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-600">{customer.totalOrders}</div>
                <div className="text-xs text-blue-500">{translate('orders', language)}</div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <div className="font-bold text-green-600">{customer.totalSpent} LE</div>
                <div className="text-xs text-green-500">{translate('spent', language)}</div>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <div className="font-bold text-purple-600">
                  {customer.totalOrders > 0 ? Math.round(customer.totalSpent / customer.totalOrders) : 0} LE
                </div>
                <div className="text-xs text-purple-500">{translate('avgOrder', language)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted">
                {translate('lastOrder', language)}: {customer.lastOrder}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                customer.totalOrders >= 5 ? 'bg-green-100 text-green-800' :
                customer.totalOrders >= 2 ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {customer.totalOrders >= 5 ? translate('vip', language) :
                 customer.totalOrders >= 2 ? translate('regular', language) :
                 translate('new', language)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 admin-card">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            {searchTerm ? translate('noCustomersFound', language) : translate('noCustomers', language)}
          </h3>
          <p className="text-gray-400">
            {searchTerm ? translate('noCustomersMatchSearch', language) : translate('noCustomersDescription', language)}
          </p>
        </div>
      )}

      {/* Customer Insights */}
      {filteredCustomers.length > 0 && (
        <div className="admin-card">
          <h3 className="text-lg font-semibold mb-4">{translate('customerInsights', language)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">{translate('topSpenders', language)}</h4>
              <div className="space-y-3">
                {[...customers]
                  .sort((a, b) => b.totalSpent - a.totalSpent)
                  .slice(0, 3)
                  .map(customer => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                          {customer.name.charAt(0)}
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                      <span className="font-bold text-primary">{customer.totalSpent} LE</span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">{translate('mostFrequent', language)}</h4>
              <div className="space-y-3">
                {[...customers]
                  .sort((a, b) => b.totalOrders - a.totalOrders)
                  .slice(0, 3)
                  .map(customer => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                          {customer.name.charAt(0)}
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                      <span className="font-bold text-primary">{customer.totalOrders} {translate('orders', language)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}