import { AIResponse, TodoItem, QuizQuestion } from '../types'

const API_BASE_URL = '/api'

/**
 * Parse AI response into QuizQuestion array
 */
export const parseQuiz = (content: string): QuizQuestion[] | undefined => {
  try {
    let jsonString = content.trim()

    // Remove markdown code block syntax if present
    if (jsonString.startsWith('```')) {
      jsonString = jsonString
        .replace(/```json?\n?/g, '')
        .replace(/```\n?$/g, '')
    }

    const jsonData = JSON.parse(jsonString)

    if (!Array.isArray(jsonData)) return undefined

    // Validate structure
    const isValidQuizData = (data: unknown): data is QuizQuestion[] => {
      if (!Array.isArray(data)) return false
      return data.every(
        (item) =>
          item &&
          typeof item === 'object' &&
          'question' in item &&
          'options' in item &&
          'correctAnswer' in item &&
          typeof item.question === 'string' &&
          Array.isArray(item.options) &&
          typeof item.correctAnswer === 'number',
      )
    }

    return isValidQuizData(jsonData) ? jsonData : undefined
  } catch (e) {
    console.error('JSON parse error:', e)
    return undefined
  }
}

/**
 * Parse AI response into TodoItem array
 * Handles JSON extraction from markdown code blocks
 * @param content - Raw AI response content
 * @returns Parsed TodoItem array or undefined if parsing fails
 */
export const parseTodoList = (content: string): TodoItem[] | undefined => {
  try {
    let jsonString = content.trim()

    // Remove markdown code block syntax if present
    if (jsonString.startsWith('```')) {
      jsonString = jsonString
        .replace(/```json?\n?/g, '')
        .replace(/```\n?$/g, '')
    }

    const jsonData = JSON.parse(jsonString)

    if (!Array.isArray(jsonData)) return undefined

    // Map and validate each item with defaults
    return jsonData.map((item: unknown) => {
      const todo = item as Partial<TodoItem>
      return {
        title: todo.title || 'Untitled',
        description: todo.description || '',
        category: todo.category || 'Lainnya',
        priority: todo.priority || 'medium',
        deadline:
          todo.deadline ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
      }
    })
  } catch (e) {
    console.error('JSON parse error:', e)
    return undefined
  }
}

/**
 * Generate prompt for quiz generation
 */
export const generateQuizPrompt = (topic: string): string => {
  return `Buatlah 5 soal pilihan ganda tentang topik "${topic}" dalam Bahasa Indonesia.
  Output HARUS berupa array JSON valid dengan format:
  [
    {
      "question": "Isi pertanyaan",
      "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
      "correctAnswer": 0 // index jawaban benar (0-3)
    }
  ]
  Jangan tambahkan teks lain selain JSON array. Pastikan JSON valid.`
}

/**
 * Generate enhanced prompt for list generation mode
 * @param prompt - User's original prompt
 * @returns Enhanced prompt with JSON structure instructions
 */
export const generateListPrompt = (prompt: string): string => {
  const currentDate = new Date().toISOString().split('T')[0]
  return `Current date: ${currentDate}. Generate a JSON array of todo items with the following structure for each item:
        {
          "title": "task title",
          "description": "detailed description",
          "category": "category name (e.g., belajar, pekerjaan, pribadi, dll)",
          "priority": "low|medium|high",
          "deadline": "YYYY-MM-DD format - calculate realistic deadline based on current date and task complexity"
        }
        User request: ${prompt}
        Return ONLY valid JSON array, no additional text.`
}

const MAX_RETRIES = 3
const RETRY_DELAY = 2000

const fetchWithRetry = async (
  fn: () => Promise<Response>,
): Promise<Response> => {
  let lastError: unknown
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const res = await fn()
      if (!res.ok) {
        // If 5xx error, retry. If 4xx, maybe not (client error).
        // But let's simple retry for now or throw specific codes.
        if (res.status >= 500 || res.status === 429)
          throw new Error(`Status ${res.status}`)
        return res // 400 etc return as is
      }
      return res
    } catch (e) {
      lastError = e
      if (i < MAX_RETRIES - 1)
        await new Promise((r) => setTimeout(r, RETRY_DELAY))
    }
  }
  throw lastError
}

/**
 * Fetch chat response from AI API
 * @param messages - Array of chat messages with role and content
 * @returns AI response text
 * @throws Error if API request fails
 */
export const fetchChatResponse = async (
  messages: { role: string; content: string }[],
): Promise<string> => {
  try {
    const res = await fetchWithRetry(() =>
      fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      }),
    )

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`)
    }

    const data: AIResponse = await res.json()
    return data.data?.reply ?? '[Error: No reply]'
  } catch (error) {
    console.error('Chat API Error:', error)
    throw error
  }
}

/**
 * Fetch vision response from AI API with image
 * @param prompt - User's text prompt
 * @param messages - Chat history
 * @param image - Base64 encoded image data
 * @returns AI response text
 * @throws Error if API request fails
 */
export const fetchVisionResponse = async (
  prompt: string,
  messages: { role: string; content: string }[],
  image: File,
): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('prompt', prompt)
    formData.append('messages', JSON.stringify(messages))
    formData.append('image', image)

    const res = await fetchWithRetry(() =>
      fetch(`${API_BASE_URL}/vision`, {
        method: 'POST',
        body: formData,
      }),
    )

    if (!res.ok) {
      throw new Error(`Vision API Error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return (
      data.data?.reply ||
      data.reply ||
      (typeof data === 'string' ? data : JSON.stringify(data))
    )
  } catch (error) {
    console.error('Vision API Error:', error)
    throw error
  }
}
