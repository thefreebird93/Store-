'use client'
import { useState, useEffect } from 'react'
import { Search, Filter, Eye, Edit, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'
import { orders as initialOrders } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  useEffect(() => {
    setOrders(initialOrders)
    setFilteredOrders(initialOrders)
  }, [])

  useEffect(() => {
    let filtered = orders

    // البحث
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // التصفية حسب الحالة
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus)
    }

    setFilteredOrders(filtered)
  }, [searchTerm, selectedStatus, orders])

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { color: 'yellow', icon: Clock, label: 'pending' },
      processing: { color: 'blue', icon: Edit, label: 'processing' },
      shipped: { color: 'purple', icon: Truck, label: 'shipped' },
      delivered: { color: 'green', icon: CheckCircle, label: 'delivered' },
      cancelled: { color: 'red', icon: XCircle, label: 'cancelled' }
    }
    return statusMap[status] || statusMap.pending
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    addNotification(translate('orderStatusUpdated', language), 'success')
  }

  const getTotalRevenue = () => {
    return orders.reduce((sum, order) => sum + order.total, 0)
  }

  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length
  }

  const statusOptions = [
    { value: 'pending', label: 'pending' },
    { value: 'processing', label: 'processing' },
    { value: 'shipped', label: 'shipped' },
    { value: 'delivered', label: 'delivered' },
    { value: 'cancelled', label: 'cancelled' }
  ]

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{translate('manageOrders', language)}</h1>
          <p className="text-muted">{translate('manageOrdersDescription', language)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Truck size={24} className="text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{orders.length}</div>
              <div className="text-sm text-muted">{translate('totalOrders', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <CheckCircle size={24} className="text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{getStatusCount('delivered')}</div>
              <div className="text-sm text-muted">{translate('delivered', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Clock size={24} className="text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{getStatusCount('pending')}</div>
              <div className="text-sm text-muted">{translate('pending', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <Edit size={24} className="text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{getStatusCount('processing')}</div>
              <div className="text-sm text-muted">{translate('processing', language)}</div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <XCircle size={24} className="text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{getStatusCount('cancelled')}</div>
              <div className="text-sm text-muted">{translate('cancelled', language)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="admin-card bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">{translate('totalRevenue', language)}</h3>
            <p className="text-3xl font-bold">{getTotalRevenue()} LE</p>
            <p className="text-primary-100 mt-2">
              {translate('fromAllOrders', language)}
            </p>
          </div>
          <div className="text-4xl">💰</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('search', language)}
            </label>
            <div className="relative">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder={translate('searchOrders', language)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('status', language)}
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">{translate('allStatus', language)}</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {translate(option.label, language)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('actions', language)}
            </label>
            <button className="w-full p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Filter size={16} />
              {translate('moreFilters', language)}
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{translate('orderID', language)}</th>
                <th>{translate('customer', language)}</th>
                <th>{translate('date', language)}</th>
                <th>{translate('amount', language)}</th>
                <th>{translate('status', language)}</th>
                <th>{translate('actions', language)}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const statusInfo = getStatusInfo(order.status)
                const StatusIcon = statusInfo.icon
                
                return (
                  <tr key={order.id}>
                    <td>
                      <div className="font-medium text-primary">{order.id}</div>
                    </td>
                    <td>
                      <div>
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-sm text-muted">{order.customer_email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-muted">{order.created_at}</div>
                    </td>
                    <td>
                      <div className="font-bold text-primary">{order.total} LE</div>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-primary ${
                          statusInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          statusInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          statusInfo.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                          statusInfo.color === 'green' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {translate(option.label, language)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title={translate('viewDetails', language)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title={translate('edit', language)}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Truck size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              {searchTerm ? translate('noOrdersFound', language) : translate('noOrders', language)}
            </h3>
            <p className="text-gray-400">
              {searchTerm ? translate('noOrdersMatchSearch', language) : translate('noOrdersDescription', language)}
            </p>
          </div>
        )}
      </div>

      {/* Order Summary */}
      {filteredOrders.length > 0 && (
        <div className="admin-card">
          <h3 className="text-lg font-semibold mb-4">{translate('ordersSummary', language)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {statusOptions.map(option => (
              <div key={option.value} className="p-4 border border-gray-200 rounded-lg">
                <div className={`text-2xl font-bold ${
                  option.value === 'pending' ? 'text-yellow-600' :
                  option.value === 'processing' ? 'text-blue-600' :
                  option.value === 'shipped' ? 'text-purple-600' :
                  option.value === 'delivered' ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {getStatusCount(option.value)}
                </div>
                <div className="text-sm text-muted">{translate(option.label, language)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}