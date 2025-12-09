import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { ExtendedSession } from '@/lib/authOptions'
import { toast } from 'react-hot-toast'
import { Message, AIMode, TodoItem, QuizQuestion } from '../types'
import {
  generateListPrompt,
  parseTodoList,
  parseQuiz,
  fetchChatResponse,
  fetchVisionResponse,
} from '../services/chatService'

interface AddResult {
  success: boolean
  itemTitle: string
  error?: unknown
}

export const useChatbot = () => {
  const { data: session } = useSession()
  const extended = session as ExtendedSession

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiMode, setAiMode] = useState<AIMode>('balanced')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, isTyping])

  const handleTextToSpeech = async (text: string) => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!response.ok) throw new Error('Gagal memproses TTS')
      const { audio, mimeType } = await response.json()
      if (!audio) throw new Error('Audio kosong dari server')
      const audioBytes = Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))
      const blob = new Blob([audioBytes], { type: mimeType || 'audio/wav' })
      const url = URL.createObjectURL(blob)
      const audioElement = new Audio(url)
      audioElement.play()
      audioElement.onended = () => URL.revokeObjectURL(url)
      audioElement.onerror = (e) => console.error('Error playing audio:', e)
    } catch (error) {
      console.error('Error:', error)
      alert('Gagal memproses TTS')
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }

  const handleEditMessage = (id: string, newText: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? { ...msg, text: newText, isEditing: false, editedText: undefined }
          : msg,
      ),
    )
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    setSelectedFile(null)
  }

  const fetchAIReply = async (prompt: string, imageFile?: File | null) => {
    setIsTyping(true)
    try {
      let enhancedPrompt = prompt

      // Handle different AI modes
      if (aiMode === 'quiz') {
        enhancedPrompt += `\n\nGenerate 5 multiple choice questions about "${prompt}" in Bahasa Indonesia. Output JSON Array format: [{ "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0 (0-3 index) }]. Return ONLY raw JSON.`
      } else if (aiMode === 'list') {
        enhancedPrompt = generateListPrompt(prompt)
      }

      const history = messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }))

      const apiMessages = [
        ...history,
        { role: 'user', content: enhancedPrompt },
      ]

      let reply = ''
      let jsonData: TodoItem[] | undefined = undefined
      let quizData: QuizQuestion[] | undefined = undefined

      if (imageFile) {
        reply = await fetchVisionResponse(
          enhancedPrompt,
          apiMessages,
          imageFile,
        )
      } else {
        reply = await fetchChatResponse(apiMessages)
      }

      if (aiMode === 'list') {
        const parsed = parseTodoList(reply)
        if (parsed) {
          jsonData = parsed
          reply = 'Berikut daftar tugas yang telah dibuat.'
        }
      }

      // Try parsing quiz (auto-parse for quiz mode or when quiz detected)
      if (aiMode === 'quiz' || reply.toLowerCase().includes('quiz')) {
        const parsedQuiz = parseQuiz(reply)
        if (parsedQuiz && parsedQuiz.length > 0) {
          quizData = parsedQuiz
          reply = 'Quiz telah siap! Klik tombol di bawah untuk mengerjakan.'
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: reply,
          sender: 'bot',
          jsonData,
          quizData,
          timestamp: new Date(),
        },
      ])
    } catch (e) {
      console.error('Fetch error:', e)
      toast.error('Gagal terhubung ke AI.')
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda.',
          sender: 'bot',
          error: true,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return
    const userMessage = input.trim()
    const currentFile = selectedFile
    const currentImage = selectedImage

    // Clear UI state immediately
    setInput('')
    setSelectedImage(null)
    setSelectedFile(null)

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: userMessage,
        sender: 'user',
        timestamp: new Date(),
        image: currentImage || undefined,
      },
    ])

    // Pass captured state to fetch function
    await fetchAIReply(userMessage, currentFile)
  }

  const handleRetry = async (messageText: string) => {
    // Retry usually just text, but could be enhanced to support context re-fetch if needed
    // For now we assume retry is text-based or the last context logic needs to be smarter
    await fetchAIReply(messageText)
  }

  const handleAddToDatabase = async (items: TodoItem[]) => {
    const userId = extended?.user?.id

    if (!userId) {
      toast.error('User session not found')
      return
    }

    const addItem = async (item: TodoItem): Promise<AddResult> => {
      try {
        const res = await fetch('/api/todo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: item.title,
            desc: item.description,
            category: item.category,
            prioritas: item.priority,
            deadline: item.deadline,
            userId: userId,
          }),
        })

        if (!res.ok) {
          throw new Error(`Failed to add todo: ${res.statusText}`)
        }
        return { success: true, itemTitle: item.title }
      } catch (error) {
        return { success: false, itemTitle: item.title, error }
      }
    }

    const toastId = toast.loading('Menambahkan ke database...')
    const results = await Promise.all(items.map(addItem))
    const successCount = results.filter((r) => r.success).length
    const failedCount = results.length - successCount

    if (successCount > 0 && failedCount === 0) {
      toast.success(`${successCount} todo berhasil ditambahkan!`, {
        id: toastId,
      })
    } else if (successCount > 0 && failedCount > 0) {
      toast(`${successCount} berhasil, ${failedCount} gagal.`, {
        icon: '⚠️',
        id: toastId,
      })
    } else {
      toast.error('Gagal menambahkan todo.', { id: toastId })
    }
  }

  return {
    messages,
    input,
    setInput,
    isTyping,
    aiMode,
    setAiMode,
    messagesEndRef,
    handleSend,
    handleRetry,
    handleEditMessage,
    handleDeleteMessage,
    handleCopy,
    handleTextToSpeech,
    handleAddToDatabase,
    copiedId,
    setMessages,
    selectedImage,
    handleImageSelect,
    clearImage,
    extended,
  }
}
