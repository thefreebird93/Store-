import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Verify admin access (in real app, check user role)
    
    // Get dashboard stats
    const [
      { count: productsCount },
      { count: ordersCount },
      { count: usersCount },
      { data: revenueData }
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('total_amount').eq('status', 'delivered')
    ])

    const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

    const stats = {
      products: productsCount || 0,
      orders: ordersCount || 0,
      users: usersCount || 0,
      revenue: totalRevenue
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}