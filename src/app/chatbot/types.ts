/**
 * Todo item structure for list generation mode
 */
export interface TodoItem {
  title: string
  description: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  deadline?: string
}

/**
 * AI mode types for different conversation styles
 */
export type AIMode = 'fluent' | 'creative' | 'precise' | 'balanced' | 'list'

/**
 * Chat message structure
 */
export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  role?: 'user' | 'assistant'
  timestamp: Date
  image?: string
  jsonData?: TodoItem[]
  error?: boolean
  isEditing?: boolean
  editedText?: string
}

/**
 * API response structure from chat endpoints
 */
export interface AIResponse {
  success: boolean
  data: {
    reply: string
    messages: Array<{
      role: string
      content: string
    }>
  }
  models?: string[]
}

/**
 * AI mode configuration
 */
export interface AIModeConfig {
  value: AIMode
  label: string
  description: string
}
