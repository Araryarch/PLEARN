import { AIResponse, TodoItem } from '../types'

const API_BASE_URL = '/api'

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
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

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
  image: string,
): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('prompt', prompt)
    formData.append('messages', JSON.stringify(messages))
    formData.append('image', image)

    const res = await fetch(`${API_BASE_URL}/vision`, {
      method: 'POST',
      body: formData,
    })

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
