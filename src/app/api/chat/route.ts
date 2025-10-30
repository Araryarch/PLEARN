/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from 'next/server'

interface ChatRequest {
  prompt: string
  aiMode: string
}

interface AIResponse {
  choices?: {
    message?: {
      content?: string
    }
  }[]
}

const systemPromptMap: Record<string, string> = {
  fluent:
    'jawablah dengan gaya natural, mengalir, dan mudah dimengerti manusia.',
  creative: 'jawablah dengan gaya kreatif, penuh imajinasi, dan unik.',
  precise: 'jawablah dengan gaya formal, sangat akurat, dan terperinci.',
  balanced: 'jawablah dengan keseimbangan antara natural dan akurat.',
  list: '',
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, aiMode }: ChatRequest = await request.json()

    if (!prompt || !aiMode) {
      return NextResponse.json(
        { error: 'Missing prompt or aiMode' },
        { status: 400 },
      )
    }

    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    if (!apiKey) {
      console.error('[Senopati] API key not configured')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 },
      )
    }

    const url = 'https://chat.ragita.net/api/chat/completions'
    const body = {
      model: 'qwen2.5:14b',
      messages: [
        {
          role: 'system',
          content: `kamu adalah AI bernama PLEARN, ${systemPromptMap[aiMode]}`,
        },
        { role: 'user', content: prompt },
      ],
    }

    console.log('[Senopati] Sending request to AI API from server:', {
      url,
      model: body.model,
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      console.error('[Senopati] API Error:', res.status, res.statusText)
      return NextResponse.json(
        { error: `HTTP error! status: ${res.status}` },
        { status: res.status },
      )
    }

    const data: AIResponse = await res.json()
    console.log('[Senopati] API Response received from server')

    return NextResponse.json(data)
  } catch (err: any) {
    console.error('[Senopati] Error in chat route:', err)

    let errorMessage = 'Gagal terhubung ke AI. Silakan coba lagi.'

    if (err.name === 'AbortError') {
      errorMessage =
        'Permintaan timeout. Server tidak merespons dalam waktu yang ditentukan.'
    } else if (err instanceof TypeError) {
      errorMessage = 'Network error. Periksa koneksi internet Anda.'
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
