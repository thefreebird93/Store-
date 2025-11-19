import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product (
            name,
            name_ar,
            image_url,
            sku
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, items, shipping_address, customer_notes } = body

    // Calculate total amount
    const { data: products } = await supabase
      .from('products')
      .select('id, price')
      .in('id', items.map((item: any) => item.product_id))

    const total_amount = items.reduce((total: number, item: any) => {
      const product = products?.find(p => p.id === item.product_id)
      return total + (product?.price || 0) * item.quantity
    }, 0)

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id,
          total_amount,
          shipping_address,
          customer_notes,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: products?.find(p => p.id === item.product_id)?.price || 0
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}