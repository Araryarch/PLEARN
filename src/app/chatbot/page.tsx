'use client'
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  useRef,
  useEffect,
} from 'react'
import {
  Send,
  Calendar,
  Flag,
  Plus,
  Copy,
  Edit2,
  Trash2,
  Volume2,
  Check,
  X,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Layouts from '@/Layouts/Layouts'

interface TodoItem {
  title: string
  description: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  deadline?: string
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  jsonData?: TodoItem[]
  error?: boolean
  timestamp: Date
  isEditing?: boolean
  editedText?: string
}

type AIMode = 'fluent' | 'creative' | 'precise' | 'balanced' | 'list'

interface AIResponse {
  choices?: {
    message?: {
      content?: string
    }
  }[]
}

const catppuccin = {
  base: '#1e1e2e',
  surface0: '#181825',
  surface1: '#181825',
  text: '#cdd6f4',
  subtext: '#a6adc8',
  blue: '#89b4fa',
  green: '#a6e3a1',
  red: '#f38ba8',
  peach: '#fab387',
  yellow: '#f9e2af',
  teal: '#94e2d5',
  mauve: '#cba6f7',
  overlay: '#585b70',
  lavender: '#b4befe',
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiMode, setAiMode] = useState<AIMode>('balanced')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const aiModes: { value: AIMode; label: string; description: string }[] = [
    {
      value: 'fluent',
      label: 'Fluent',
      description: 'Natural & conversational',
    },
    {
      value: 'creative',
      label: 'Creative',
      description: 'Imaginative & unique',
    },
    { value: 'precise', label: 'Precise', description: 'Accurate & detailed' },
    {
      value: 'balanced',
      label: 'Balanced',
      description: 'Best of both worlds',
    },
    {
      value: 'list',
      label: 'List Generator',
      description: 'Generate Your List Automatic with AI',
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // ------------------------------------------------------------------ //
  // Effects
  // ------------------------------------------------------------------ //

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, isTyping])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // ------------------------------------------------------------------ //
  // Helpers
  // ------------------------------------------------------------------ //
  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1
      window.speechSynthesis.speak(utterance)
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

  const handleRetry = async (messageText: string) => {
    await fetchAIReply(messageText)
  }

  // ------------------------------------------------------------------ //
  // AI call
  // ------------------------------------------------------------------ //
  const fetchAIReply = async (prompt: string) => {
    setIsTyping(true)
    try {
      const currentDate = new Date().toISOString().split('T')[0]
      let enhancedPrompt = prompt

      if (aiMode === 'list') {
        enhancedPrompt = `Current date: ${currentDate}. Generate a JSON array of todo items with the following structure for each item:
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

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: enhancedPrompt, aiMode }),
      })
      const data: AIResponse = await res.json()

      let reply = data.choices?.[0]?.message?.content ?? '[Error: No reply]'
      let jsonData: TodoItem[] | undefined = undefined

      if (aiMode === 'list') {
        try {
          let jsonString = reply.trim()
          if (jsonString.startsWith('```')) {
            jsonString = jsonString
              .replace(/```json?\n?/g, '')
              .replace(/```\n?$/g, '')
          }
          jsonData = JSON.parse(jsonString)
          jsonData = jsonData!.map((item) => ({
            title: item.title || 'Untitled',
            description: item.description || '',
            category: item.category || 'Lainnya',
            priority: item.priority || 'medium',
            deadline:
              item.deadline ||
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0],
          }))
          reply = JSON.stringify(jsonData, null, 2)
        } catch (e) {
          console.error('JSON parse error:', e)
          reply = 'Warning: AI returned invalid JSON'
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
          text: 'Warning: Gagal terhubung ke AI.',
          sender: 'bot',
          error: true,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // ------------------------------------------------------------------ //
  // Input handling
  // ------------------------------------------------------------------ //
  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: userMessage,
        sender: 'user',
        timestamp: new Date(),
      },
    ])
    await fetchAIReply(userMessage)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // ------------------------------------------------------------------ //
  // Database stub
  // ------------------------------------------------------------------ //
  const handleAddToDatabase = (items: TodoItem[]) => {
    console.log('=== TODO ITEMS TO BE ADDED ===')
    console.log('Total items:', items.length)
    console.log('Items:', JSON.stringify(items, null, 2))
    items.forEach((item, index) => {
      console.log(`\nItem ${index + 1}:`)
      console.log('Title:', item.title)
      console.log('Description:', item.description)
      console.log('Category:', item.category)
      console.log('Priority:', item.priority)
      console.log('Deadline:', item.deadline)
    })
  }

  // ------------------------------------------------------------------ //
  // UI helpers
  // ------------------------------------------------------------------ //
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return catppuccin.red
      case 'medium':
        return catppuccin.peach
      case 'low':
        return catppuccin.green
      default:
        return catppuccin.subtext
    }
  }

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      belajar: catppuccin.blue,
      pekerjaan: catppuccin.mauve,
      pribadi: catppuccin.teal,
      kesehatan: catppuccin.green,
      keuangan: catppuccin.yellow,
    }
    return colors[category?.toLowerCase() ?? ''] || catppuccin.lavender
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No deadline'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // ------------------------------------------------------------------ //
  // Main UI
  // ------------------------------------------------------------------ //
  return (
    <Layouts>
      <div
        className="h-screen w-full flex flex-col"
        style={{ backgroundColor: catppuccin.base, color: catppuccin.text }}
      >
        {/* Header */}
        <div
          className="border-b px-6 py-4 fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
          style={{
            borderColor: catppuccin.surface1,
            backgroundColor: catppuccin.surface0,
          }}
        >
          <div className="flex items-center gap-3">
            <h1
              className="text-xl font-bold"
              style={{ color: catppuccin.text }}
            >
              PLEARN AI
            </h1>
          </div>

          {/* Mode selector */}
          <div className="relative" ref={dropdownRef}>
            <Button
              ref={buttonRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              variant="outline"
              className="gap-2"
              style={{
                borderColor: catppuccin.overlay,
                color: catppuccin.text,
                backgroundColor: catppuccin.surface0,
              }}
            >
              <span className="text-sm font-medium">
                {aiModes.find((m) => m.value === aiMode)?.label}
              </span>
            </Button>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 shadow-lg rounded-lg border"
                style={{
                  backgroundColor: catppuccin.surface0,
                  borderColor: catppuccin.overlay,
                  zIndex: 9999,
                }}
              >
                <div className="p-2 space-y-1">
                  {aiModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => {
                        setAiMode(mode.value)
                        setDropdownOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left rounded-lg transition"
                      style={{
                        backgroundColor:
                          aiMode === mode.value
                            ? catppuccin.surface1
                            : catppuccin.surface0,
                        color: catppuccin.text,
                      }}
                    >
                      <div className="text-sm font-medium">{mode.label}</div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: catppuccin.subtext }}
                      >
                        {mode.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col mt-[73px] overflow-hidden">
          {/* Messages scroll area */}
          <ScrollArea className="flex-1 w-full">
            <div className="p-6 space-y-4">
              {/* Empty state */}
              {messages.length === 0 && !isTyping && (
                <div className="flex flex-col items-center justify-center pt-20 text-center">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: catppuccin.text }}
                  >
                    How can I help you today?
                  </h2>
                  <p className="mt-2" style={{ color: catppuccin.subtext }}>
                    You are in{' '}
                    <strong style={{ color: catppuccin.text }}>
                      {aiModes.find((m) => m.value === aiMode)?.label}
                    </strong>{' '}
                    mode.
                  </p>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div
                    className={`flex gap-3 max-w-xs lg:max-w-2xl items-start ${
                      msg.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor:
                          msg.sender === 'user'
                            ? catppuccin.mauve
                            : catppuccin.mauve,
                        color: catppuccin.base,
                      }}
                      title={msg.sender === 'user' ? 'You' : 'PLEARN AI'}
                    >
                      {msg.sender === 'user' ? 'U' : 'AI'}
                    </div>

                    {/* Content + actions */}
                    <div
                      className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      {/* Timestamp */}
                      <div className="flex items-center gap-2 px-2">
                        <span
                          className="text-xs font-medium"
                          style={{ color: catppuccin.subtext }}
                        >
                          {msg.sender === 'user' ? 'You' : 'PLEARN AI'}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: catppuccin.overlay }}
                        >
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>

                      {/* Bubble */}
                      <div
                        className="px-4 py-3 rounded-sm mt-2"
                        style={{
                          backgroundColor:
                            msg.sender === 'user'
                              ? catppuccin.surface1
                              : msg.error
                                ? catppuccin.red
                                : catppuccin.surface1,
                          color:
                            msg.sender === 'user'
                              ? catppuccin.text
                              : catppuccin.text,
                        }}
                      >
                        {msg.isEditing ? (
                          <div className="flex gap-2">
                            <Input
                              value={msg.editedText ?? msg.text}
                              onChange={(e) => {
                                setMessages((prev) =>
                                  prev.map((m) =>
                                    m.id === msg.id
                                      ? { ...m, editedText: e.target.value }
                                      : m,
                                  ),
                                )
                              }}
                              style={{
                                backgroundColor: catppuccin.surface0,
                                color: catppuccin.text,
                                borderColor: catppuccin.overlay,
                              }}
                            />
                            <Button
                              size="sm"
                              onClick={() =>
                                handleEditMessage(
                                  msg.id,
                                  msg.editedText ?? msg.text,
                                )
                              }
                              style={{
                                backgroundColor: catppuccin.green,
                                color: catppuccin.base,
                              }}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                setMessages((prev) =>
                                  prev.map((m) =>
                                    m.id === msg.id
                                      ? { ...m, isEditing: false }
                                      : m,
                                  ),
                                )
                              }
                              style={{
                                backgroundColor: catppuccin.red,
                                color: catppuccin.base,
                              }}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ) : msg.jsonData ? (
                          <div className="space-y-3">
                            {msg.jsonData.map((item, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-lg"
                                style={{
                                  backgroundColor: catppuccin.surface0,
                                  border: `1px solid ${catppuccin.overlay}`,
                                }}
                              >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <h3 className="font-semibold text-base flex-1">
                                    {item.title}
                                  </h3>
                                  <span
                                    className="px-2 py-1 rounded text-xs font-medium"
                                    style={{
                                      backgroundColor: getCategoryColor(
                                        item.category,
                                      ),
                                      color: catppuccin.base,
                                    }}
                                  >
                                    {item.category ?? 'Lainnya'}
                                  </span>
                                </div>

                                <p
                                  className="text-sm mb-3"
                                  style={{ color: catppuccin.subtext }}
                                >
                                  {item.description}
                                </p>

                                <div className="flex items-center justify-between gap-4 text-xs">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                      <Flag
                                        size={14}
                                        style={{
                                          color: getPriorityColor(
                                            item.priority,
                                          ),
                                        }}
                                      />
                                      <span
                                        style={{ color: catppuccin.subtext }}
                                      >
                                        {(item.priority ?? 'medium')
                                          .charAt(0)
                                          .toUpperCase() +
                                          (item.priority ?? 'medium').slice(1)}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                      <Calendar
                                        size={14}
                                        style={{ color: catppuccin.lavender }}
                                      />
                                      <span
                                        style={{ color: catppuccin.subtext }}
                                      >
                                        {formatDate(item.deadline)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {(msg.jsonData?.length ?? 0) > 0 && (
                              <Button
                                onClick={() =>
                                  handleAddToDatabase(msg.jsonData!)
                                }
                                className="w-full mt-2 gap-2"
                                style={{
                                  backgroundColor: catppuccin.green,
                                  color: catppuccin.base,
                                }}
                              >
                                <Plus size={16} />
                                Add All to Database
                              </Button>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(msg.text, msg.id)}
                          title="Copy message"
                          style={{
                            color:
                              copiedId === msg.id
                                ? catppuccin.green
                                : catppuccin.subtext,
                          }}
                        >
                          {copiedId === msg.id ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </Button>

                        {msg.sender === 'user' && !msg.isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setMessages((prev) =>
                                prev.map((m) =>
                                  m.id === msg.id
                                    ? { ...m, isEditing: true }
                                    : m,
                                ),
                              )
                            }
                            title="Edit message"
                            style={{ color: catppuccin.subtext }}
                          >
                            <Edit2 size={16} />
                          </Button>
                        )}

                        {msg.sender === 'user' && !msg.isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRetry(msg.text)}
                            title="Retry - send message again"
                            style={{ color: catppuccin.subtext }}
                          >
                            <RotateCcw size={16} />
                          </Button>
                        )}

                        {msg.sender === 'bot' && !msg.jsonData && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleTextToSpeech(msg.text)}
                            title="Text to speech"
                            style={{ color: catppuccin.subtext }}
                          >
                            <Volume2 size={16} />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMessage(msg.id)}
                          title="Delete message"
                          style={{ color: catppuccin.red }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: catppuccin.mauve,
                        color: catppuccin.base,
                      }}
                    >
                      AI
                    </div>
                    <div
                      className="px-4 py-3 rounded-sm"
                      style={{ backgroundColor: catppuccin.surface1 }}
                    >
                      <div className="w-48 space-y-2.5 animate-pulse">
                        <div
                          className="h-4 w-full rounded"
                          style={{ backgroundColor: catppuccin.overlay }}
                        />
                        <div
                          className="h-4 w-3/4 rounded"
                          style={{ backgroundColor: catppuccin.overlay }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        <div
          className="w-full border-t p-4 pb-24 md:pb-4"
          style={{
            borderColor: catppuccin.overlay,
            backgroundColor: catppuccin.base,
          }}
        >
          <div className="flex items-center gap-3">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 rounded-sm"
              style={{
                borderColor: catppuccin.overlay,
                backgroundColor: catppuccin.surface1,
                color: catppuccin.text,
              }}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              style={{
                backgroundColor: catppuccin.blue,
                color: catppuccin.base,
                opacity: !input.trim() || isTyping ? 0.5 : 1,
              }}
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </Layouts>
  )
}
