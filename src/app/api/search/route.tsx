import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') || '10'

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
    }

    let searchQuery = supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,name_ar.ilike.%${query}%,description.ilike.%${query}%,description_ar.ilike.%${query}%`)
      .limit(parseInt(limit))

    if (category) {
      searchQuery = searchQuery.eq('category', category)
    }

    const { data, error } = await searchQuery

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      query,
      results: data,
      total: data?.length || 0
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}