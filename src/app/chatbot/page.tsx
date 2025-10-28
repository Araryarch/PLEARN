'use client'
import Layouts from '@/Layouts/Layouts'
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react'
import { Send, ChevronDown, Copy, Volume2, CheckCircle2 } from 'lucide-react'
import { useSpeechSynthesis } from 'react-speech-kit'

interface TodoItem {
  title: string
  description: string
}

interface Message {
  text: string
  sender: 'user' | 'bot'
  jsonData?: TodoItem[]
}

type AIMode = 'fluent' | 'creative' | 'precise' | 'balanced' | 'list'

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
  const [isLoading, setIsLoading] = useState(true)
  const [aiMode, setAiMode] = useState<AIMode>('balanced')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { speak, cancel, speaking, supported } = useSpeechSynthesis()

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
    {
      value: 'list',
      label: 'List Generator',
      description: 'Generate Your List Automatic with AI',
    },
  ]

  const systemPromptMap: Record<AIMode, string> = {
    fluent:
      'jawablah dengan gaya natural, mengalir, dan mudah dimengerti manusia.',
    creative: 'jawablah dengan gaya kreatif, penuh imajinasi, dan unik.',
    precise: 'jawablah dengan gaya formal, sangat akurat, dan terperinci.',
    balanced: 'jawablah dengan keseimbangan antara natural dan akurat.',
    list: 'kamu harus SELALU membalas dalam format JSON valid. setiap jawaban wajib berupa array berisi objek dengan properti "title" dan "description" dan title dan deskripsion nya adalah kegiatan yang cocok masuk di todolist jangan sembanrangan. contoh: [{"title":"item1","description":"desc1"},{"title":"item2","description":"desc2"}]. tidak boleh ada teks lain di luar JSON.',
  }

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

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
            content: `kamu adalah AI bernama PLEARN, ${systemPromptMap[aiMode]}`,
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
      let reply = data.choices?.[0]?.message?.content ?? '[Error: No reply]'
      let jsonData: TodoItem[] | undefined = undefined

      if (aiMode === 'list') {
        try {
          jsonData = JSON.parse(reply)
          if (
            !Array.isArray(jsonData) ||
            !jsonData.every(
              (item) =>
                typeof item.title === 'string' &&
                typeof item.description === 'string',
            )
          ) {
            throw new Error('Invalid JSON structure')
          }
          reply = JSON.stringify(jsonData, null, 2)
        } catch (err) {
          console.error('Failed to parse JSON:', err)
          reply = '⚠️ AI returned invalid JSON'
        }
      }

      setMessages((prev) => [...prev, { text: reply, sender: 'bot', jsonData }])
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
    if (!input.trim()) return
    const newMessage: Message = { text: input, sender: 'user' }
    setMessages((prev) => [...prev, newMessage])
    const prompt = input
    setInput('')
    fetchAIReply(prompt)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && handleSend()

  const handleCopy = (text: string) => navigator.clipboard.writeText(text)
  const handleTTS = (text: string) => {
    if (supported) {
      if (speaking) cancel()
      else speak({ text })
    }
  }

  if (isLoading) {
    return (
      <Layouts>
        <div className="min-h-full flex items-center justify-center bg-[#1e1e2e]">
          <p className="text-lg font-semibold text-[#cdd6f4]">
            Loading PLEARN AI...
          </p>
        </div>
      </Layouts>
    )
  }

  return (
    <Layouts>
      <div className="min-h-full h-full w-full flex flex-col bg-[#1e1e2e]">
        {/* Header */}
        <div className="border-b border-[#313244] bg-[#181825] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-[#cdd6f4]">PLEARN AI</h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#313244] text-[#cdd6f4] transition hover:bg-[#45475a]"
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
              <div className="absolute right-0 mt-2 w-56 shadow-lg overflow-hidden bg-[#313244] border border-[#45475a] z-10">
                {aiModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => {
                      setAiMode(mode.value)
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left transition ${
                      aiMode === mode.value
                        ? 'bg-[#45475a]'
                        : 'hover:bg-[#45475a]'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#cdd6f4]">
                      {mode.label}
                    </div>
                    <div className="text-xs mt-0.5 text-[#a6adc8]">
                      {mode.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 w-full overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#cdd6f4]">
                  Welcome to PLEARN AI
                </h2>
                <p className="text-sm text-[#a6adc8]">
                  Start a conversation by sending a message
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-[#cba6f7] text-[#1e1e2e] rounded-br-md'
                    : 'bg-[#313244] text-[#cdd6f4] rounded-bl-md'
                } relative group font-mono`}
              >
                {msg.jsonData ? (
                  <div className="space-y-2">
                    {msg.jsonData.map((item, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 bg-[#45475a] p-3 rounded-lg hover:bg-[#585b70] transition"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-[#cba6f7] mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-[#cba6f7]">
                            {item.title}
                          </p>
                          <p className="text-sm text-[#a6adc8] mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                )}

                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(msg.text)}
                    className="p-1 rounded hover:bg-[#45475a]"
                  >
                    <Copy size={14} className="text-[#a6adc8]" />
                  </button>
                  <button
                    onClick={() => handleTTS(msg.text)}
                    className="p-1 rounded hover:bg-[#45475a]"
                  >
                    <Volume2 size={14} className="text-[#a6adc8]" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
              <div className="px-4 py-3 rounded-2xl bg-[#313244]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#6c7086] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#6c7086] animate-bounce [animation-delay:150ms]" />
                  <div className="w-2 h-2 rounded-full bg-[#6c7086] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="w-full border-t border-[#313244] bg-[#181825] p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#313244] text-[#cdd6f4] placeholder-[#a6adc8] focus:outline-none focus:ring-2 focus:ring-[#cba6f7]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 rounded-xl bg-[#cba6f7] text-[#1e1e2e] hover:bg-[#b794f4] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </Layouts>
  )
}
