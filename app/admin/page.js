'use client'
import { useState, useEffect } from 'react'
import { 
  ShoppingBag, Users, DollarSign, Package, 
  TrendingUp, Eye, ShoppingCart, Star 
} from 'lucide-react'
import { getAllProducts, orders } from '@/utils/constants'
import { useLanguage } from '@/context/LanguageContext'
import { translate } from '@/utils/translations'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    lowStockProducts: 0,
    pendingOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const { language } = useLanguage()

  useEffect(() => {
    const products = getAllProducts()
    
    // إحصائيات
    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      totalCustomers: 150, // رقم تجريبي
      lowStockProducts: products.filter(p => !p.in_stock).length,
      pendingOrders: orders.filter(o => o.status === 'pending').length
    })

    // الطلبات الحديثة
    setRecentOrders(orders.slice(0, 5))

    // أفضل المنتجات
    setTopProducts(products.sort((a, b) => b.rating - a.rating).slice(0, 5))
  }, [])

  const statsCards = [
    {
      title: 'totalProducts',
      value: stats.totalProducts,
      icon: Package,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'totalOrders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'totalRevenue',
      value: `${stats.totalRevenue} LE`,
      icon: DollarSign,
      color: 'purple',
      change: '+15%'
    },
    {
      title: 'totalCustomers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'orange',
      change: '+5%'
    },
    {
      title: 'lowStock',
      value: stats.lowStockProducts,
      icon: TrendingUp,
      color: 'red',
      change: '-2%'
    },
    {
      title: 'pendingOrders',
      value: stats.pendingOrders,
      icon: ShoppingBag,
      color: 'yellow',
      change: '+3%'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500'
    }
    return colors[color] || 'bg-gray-500'
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark mb-2">{translate('dashboard', language)}</h1>
        <p className="text-muted">{translate('welcomeBack', language)}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="admin-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted mb-1">
                    {translate(stat.title, language)}
                  </p>
                  <p className="text-2xl font-bold text-dark">{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} {translate('fromLastMonth', language)}
                  </p>
                </div>
                <div className={`w-12 h-12 ${getColorClasses(stat.color)} bg-opacity-10 rounded-full flex items-center justify-center`}>
                  <Icon size={24} className={getColorClasses(stat.color).replace('bg-', 'text-')} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="admin-card">
          <h3 className="text-lg font-semibold mb-4">{translate('recentOrders', language)}</h3>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-muted">{order.customer_name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{order.total} LE</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-600' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {translate(order.status, language)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/orders" className="block text-center mt-4 text-primary hover:text-secondary font-medium">
            {translate('viewAllOrders', language)}
          </a>
        </div>

        {/* Top Products */}
        <div className="admin-card">
          <h3 className="text-lg font-semibold mb-4">{translate('topProducts', language)}</h3>
          <div className="space-y-4">
            {topProducts.map(product => (
              <div key={product.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <img 
                  src={product.image} 
                  alt={language === 'ar' ? product.name_ar : product.name_en}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">
                    {language === 'ar' ? product.name_ar : product.name_en}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span>{product.rating}</span>
                    <span>({product.review_count})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{product.price} LE</div>
                  {product.is_on_sale && (
                    <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/products" className="block text-center mt-4 text-primary hover:text-secondary font-medium">
            {translate('viewAllProducts', language)}
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h3 className="text-lg font-semibold mb-4">{translate('quickActions', language)}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a 
            href="/admin/products/new" 
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Package size={24} className="mx-auto mb-2" />
            <div className="font-medium">{translate('addProduct', language)}</div>
          </a>
          <a 
            href="/admin/offers/new" 
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Percent size={24} className="mx-auto mb-2" />
            <div className="font-medium">{translate('createOffer', language)}</div>
          </a>
          <a 
            href="/admin/categories" 
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Tag size={24} className="mx-auto mb-2" />
            <div className="font-medium">{translate('manageCategories', language)}</div>
          </a>
          <a 
            href="/admin/settings" 
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Settings size={24} className="mx-auto mb-2" />
            <div className="font-medium">{translate('settings', language)}</div>
          </a>
        </div>
      </div>
    </div>
  )
}