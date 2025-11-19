'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, ShoppingCart, DollarSign, Package, Eye } from 'lucide-react'

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  revenueGrowth: number
  ordersGrowth: number
  salesData: any[]
  categoryData: any[]
  topProducts: any[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    salesData: [],
    categoryData: [],
    topProducts: []
  })
  const [timeRange, setTimeRange] = useState('30days')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      // Get total revenue from delivered orders
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'delivered')

      const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

      // Get orders count
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      // Get products count
      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      // Get users count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Get sales data for chart
      const salesData = await generateSalesData()
      
      // Get category distribution
      const categoryData = await generateCategoryData()
      
      // Get top products
      const topProducts = await generateTopProducts()

      setData({
        totalRevenue,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalUsers: totalUsers || 0,
        revenueGrowth: 12.5, // Simulated growth
        ordersGrowth: 8.3, // Simulated growth
        salesData,
        categoryData,
        topProducts
      })
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSalesData = async () => {
    // Simulate sales data - in real app, query orders by date
    return [
      { date: 'Jan', sales: 4000, orders: 24 },
      { date: 'Feb', sales: 3000, orders: 18 },
      { date: 'Mar', sales: 5000, orders: 30 },
      { date: 'Apr', sales: 2780, orders: 16 },
      { date: 'May', sales: 5890, orders: 35 },
      { date: 'Jun', sales: 4390, orders: 28 },
    ]
  }

  const generateCategoryData = async () => {
    // Get products count by category
    const { data: products } = await supabase
      .from('products')
      .select('category')

    const categoryCount = products?.reduce((acc: any, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {}) || {}

    return Object.entries(categoryCount).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }))
  }

  const generateTopProducts = async () => {
    // Simulate top products - in real app, query from order_items
    return [
      { id: 1, name: 'Sulfate-Free Shampoo', sales: 45, revenue: 7650 },
      { id: 2, name: 'Hair Conditioner', sales: 38, revenue: 6840 },
      { id: 3, name: 'Face Serum', sales: 32, revenue: 11200 },
      { id: 4, name: 'Lip Balm', sales: 28, revenue: 1400 },
      { id: 5, name: 'Body Lotion', sales: 25, revenue: 5000 },
    ]
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${data.totalRevenue.toLocaleString()}`,
      change: `${data.revenueGrowth}%`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: data.totalOrders.toLocaleString(),
      change: `${data.ordersGrowth}%`,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Products',
      value: data.totalProducts.toLocaleString(),
      change: '5.2%',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      change: '15.8%',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your store performance and metrics</p>
        </div>

        {/* Time Range Filter */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['7days', '30days', '90days', '1year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  timeRange === range
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range === '7days' ? '7 Days' :
                 range === '30days' ? '30 Days' :
                 range === '90days' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.change} from last period</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
                  <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Categories Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Products by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Selling Products</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.topProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.sales}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.revenue.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-pink-600 hover:text-pink-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
