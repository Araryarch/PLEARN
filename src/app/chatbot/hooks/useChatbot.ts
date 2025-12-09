import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { ExtendedSession } from '@/lib/authOptions'
import Swal from 'sweetalert2'
import { Message, AIMode, TodoItem } from '../types'
import { catppuccin } from '../constants'
import {
  generateListPrompt,
  parseTodoList,
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

  const fetchAIReply = async (prompt: string) => {
    setIsTyping(true)
    try {
      let enhancedPrompt = prompt

      if (aiMode === 'list') {
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

      if (selectedFile) {
        reply = await fetchVisionResponse(
          enhancedPrompt,
          apiMessages,
          selectedFile, // Now correct type
        )
      } else {
        reply = await fetchChatResponse(apiMessages)
      }

      if (aiMode === 'list') {
        jsonData = parseTodoList(reply)
        if (jsonData) {
          reply = 'Here is your generated list.'
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: reply,
          sender: 'bot',
          jsonData,
          timestamp: new Date(),
        },
      ])
    } catch (e) {
      console.error('Fetch error:', e)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text:
            'Warning: Gagal terhubung ke AI. ' +
            (e instanceof Error ? e.message : String(e)),
          sender: 'bot',
          error: true,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
      setSelectedImage(null)
      setSelectedFile(null)
    }
  }

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return
    const userMessage = input.trim()
    setInput('')

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: userMessage,
        sender: 'user',
        timestamp: new Date(),
        image: selectedImage || undefined,
      },
    ])
    await fetchAIReply(userMessage)
  }

  const handleRetry = async (messageText: string) => {
    await fetchAIReply(messageText)
  }

  const handleAddToDatabase = async (items: TodoItem[]) => {
    const userId = extended?.user?.id

    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'User session not found',
        icon: 'error',
        background: catppuccin.base,
        color: catppuccin.text,
      })
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

    const results = await Promise.all(items.map(addItem))
    const successCount = results.filter((r) => r.success).length
    const failedCount = results.length - successCount

    if (successCount > 0 && failedCount === 0) {
      Swal.fire({
        title: '✨ Berhasil!',
        text: `${successCount} todo berhasil ditambahkan ke database.`,
        icon: 'success',
        background: '#1e1e2e',
        color: '#cdd6f4',
        confirmButtonColor: '#b4befe',
        iconColor: '#a6e3a1',
        customClass: {
          popup: 'rounded-2xl shadow-lg border border-[#313244]',
        },
      })
    } else if (successCount > 0 && failedCount > 0) {
      Swal.fire({
        title: '⚠️ Sebagian Berhasil',
        text: `${successCount} berhasil, ${failedCount} gagal ditambahkan.`,
        icon: 'warning',
        background: '#1e1e2e',
        color: '#cdd6f4',
        confirmButtonColor: '#f9e2af',
        iconColor: '#f9e2af',
        customClass: {
          popup: 'rounded-2xl shadow-lg border border-[#313244]',
        },
      })
    } else {
      Swal.fire({
        title: '❌ Gagal!',
        text: 'Semua todo gagal ditambahkan.',
        icon: 'error',
        background: '#1e1e2e',
        color: '#cdd6f4',
        confirmButtonColor: '#f38ba8',
        iconColor: '#f38ba8',
        customClass: {
          popup: 'rounded-2xl shadow-lg border border-[#313244]',
        },
      })
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
