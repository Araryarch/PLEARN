'use client'
import Layouts from '@/Layouts/Layouts'
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react'
import { Send, ChevronDown } from 'lucide-react'

interface Message {
  text: string
  sender: 'user' | 'bot'
}

type AIMode = 'fluent' | 'creative' | 'precise' | 'balanced'

interface AIResponse {
  choices?: {
    message?: {
      content?: string
    }
  }[]
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiMode, setAiMode] = useState<AIMode>('balanced')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const url = 'https://chat.ragita.net/api/chat/completions'
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string | undefined

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
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchAIReply = async (prompt: string) => {
    setIsTyping(true)
    try {
      const body = {
        model: 'qwen2.5:14b',
        messages: [
          {
            role: 'system',
            content:
              'kamu harus menjawab semua pertanyaan dengan JSON tanpa terkecuali',
          },
          { role: 'user', content: prompt },
        ],
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { Authorization: apiKey } : {}),
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const data: AIResponse = await res.json()
      const reply = data.choices?.[0]?.message?.content ?? '[Error: No reply]'

      setMessages((prev) => [...prev, { text: reply, sender: 'bot' }])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        { text: '⚠️ gagal mengambil respons dari AI', sender: 'bot' },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = () => {
    if (input.trim() === '') return
    const newMessage: Message = { text: input, sender: 'user' }
    setMessages((prev) => [...prev, newMessage])
    const prompt = input
    setInput('')
    fetchAIReply(prompt)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <Layouts>
      <div className="min-h-full h-full w-full bg-ctp-base flex flex-col">
        {/* Header */}
        <div className="bg-ctp-mantle border-b border-ctp-surface0 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-ctp-mauve to-ctp-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-ctp-text text-lg font-semibold">PLEARN AI</h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-text rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">
                {aiModes.find((m) => m.value === aiMode)?.label}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg overflow-hidden z-10">
                {aiModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => {
                      setAiMode(mode.value)
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-ctp-surface1 transition-colors ${
                      aiMode === mode.value ? 'bg-ctp-surface1' : ''
                    }`}
                  >
                    <div className="text-sm font-medium text-ctp-text">
                      {mode.label}
                    </div>
                    <div className="text-xs text-ctp-subtext0 mt-0.5">
                      {mode.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 w-full bg-ctp-base overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-ctp-mauve to-ctp-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">P</span>
                </div>
                <h2 className="text-ctp-text text-xl font-semibold mb-2">
                  Welcome to PLEARN AI
                </h2>
                <p className="text-ctp-subtext0 text-sm">
                  Start a conversation by sending a message
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-ctp-mauve text-ctp-base rounded-br-md'
                    : 'bg-ctp-surface0 text-ctp-text rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-ctp-surface0 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-ctp-overlay0 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-ctp-overlay0 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-ctp-overlay0 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="w-full border-t border-ctp-surface0 bg-ctp-mantle p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl bg-surface0-ctp text-ctp-text placeholder-ctp-subtext0 focus:outline-none focus:ring-2 focus:ring-ctp-mauve transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-ctp-mauve text-ctp-base rounded-xl hover:bg-ctp-mauve/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </Layouts>
  )
}
