import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get current date and previous period date
    const now = new Date()
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))
    
    // Total revenue (from delivered orders)
    const { data: revenueData } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'delivered')

    const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

    // Total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })

    // Total products
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    // Total users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Recent orders (last 30 days)
    const { data: recentOrders } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })

    // Products by category
    const { data: productsByCategory } = await supabase
      .from('products')
      .select('category')

    const categoryDistribution = productsByCategory?.reduce((acc: any, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {}) || {}

    const stats = {
      overview: {
        totalRevenue,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalUsers: totalUsers || 0,
        averageOrderValue: totalOrders ? totalRevenue / totalOrders : 0
      },
      recentActivity: {
        ordersLast30Days: recentOrders?.length || 0,
        newUsersLast30Days: 0, // You'd need to calculate this
        revenueLast30Days: recentOrders?.reduce((sum, order) => sum + order.total_amount, 0) || 0
      },
      distribution: {
        categories: categoryDistribution,
        orderStatus: {
          pending: 0,
          confirmed: 0,
          shipped: 0,
          delivered: 0,
          cancelled: 0
        }
      }
    }

    // Calculate order status distribution
    if (recentOrders) {
      recentOrders.forEach(order => {
        stats.distribution.orderStatus[order.status as keyof typeof stats.distribution.orderStatus]++
      })
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}