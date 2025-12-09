import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'https://senopati-elysia.vercel.app/api'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Create specific FormData for upstream
    const newFormData = new FormData()

    // Manual copy to ensure structure
    const image = formData.get('image')
    const prompt = formData.get('prompt')

    if (image && image instanceof File) {
      // Ensure we are passing it as a correct file type
      newFormData.append('image', image, image.name)
    }

    if (prompt) {
      newFormData.append('prompt', prompt)
    }

    console.log('Proxying Vision Request...')

    const res = await fetch(`${API_BASE_URL}/vision`, {
      method: 'POST',
      body: newFormData,
      // Do NOT set Content-Type header; fetch sets it with boundary for FormData
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Vision API Error:', res.status, errorText)
      return NextResponse.json(
        { error: `External API Error: ${res.statusText}`, details: errorText },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy Vision Error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
