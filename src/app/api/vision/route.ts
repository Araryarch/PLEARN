import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'https://senopati-elysia.vercel.app/api'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const res = await fetch(`${API_BASE_URL}/vision`, {
      method: 'POST',
      body: formData,
      // Note: Do NOT set Content-Type header when sending FormData,
      // fetch will automatically set it with boundary
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `External API Error: ${res.statusText}` },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
