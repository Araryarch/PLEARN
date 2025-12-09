import { Button } from '@/components/ui/button'
import { Send, X, Image as ImageIcon, Mic } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  selectedImage: string | null
  isTyping: boolean
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearImage: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export const ChatInput = ({
  input,
  setInput,
  selectedImage,
  isTyping,
  onSend,
  onKeyPress,
  onImageSelect,
  onClearImage,
  onFocus,
  onBlur,
}: ChatInputProps) => {
  const canSend = (input.trim() || selectedImage) && !isTyping
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    isListening,
    text: voiceText,
    error: voiceError,
    startListening,
    stopListening,
  } = useSpeechRecognition()

  // Sync voice input to text state
  useEffect(() => {
    if (voiceText) {
      setInput(voiceText)
    }
  }, [voiceText, setInput])

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
      return
    }
    onKeyPress(e)
  }

  const handleMicClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6 pt-2">
      {selectedImage && (
        <div className="relative inline-block mb-4 animate-in fade-in slide-in-from-bottom-2">
          <Image
            src={selectedImage}
            alt="Selected"
            width={80}
            height={80}
            className="h-20 w-auto rounded-xl border border-white/10 object-cover shadow-2xl ring-1 ring-white/5"
          />
          <button
            onClick={onClearImage}
            className="absolute -top-2 -right-2 bg-zinc-800 text-white rounded-full p-1.5 border border-zinc-700 shadow-lg hover:bg-zinc-700 transition-all hover:scale-110"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Pill Input */}
      <div
        className={`relative flex items-end gap-2 rounded-[2rem] p-2 pl-3 shadow-2xl transition-all duration-300 backdrop-blur-2xl ring-1 ${
          isListening
            ? 'bg-red-500/10 ring-red-500/50'
            : 'bg-zinc-950/90 hover:bg-zinc-950 ring-zinc-800 focus-within:ring-zinc-700'
        }`}
      >
        <label
          className={`cursor-pointer w-10 h-10 rounded-full hover:bg-zinc-800 transition flex items-center justify-center shrink-0 mb-[1px] text-zinc-400 hover:text-white ${selectedImage ? 'text-white bg-zinc-800' : ''}`}
          title="Upload Image"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageSelect}
          />
          <ImageIcon size={20} strokeWidth={2} />
        </label>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={
            isListening
              ? 'Listening...'
              : selectedImage
                ? 'Ask about this image...'
                : 'Message Senopati...'
          }
          rows={1}
          className="flex-1 bg-transparent py-3 px-1 focus:outline-none resize-none max-h-[200px] overflow-y-auto w-full custom-scrollbar text-[15px] text-white placeholder:text-zinc-600"
          style={{
            minHeight: '24px',
          }}
        />

        {canSend ? (
          <Button
            onClick={onSend}
            size="icon"
            className="shrink-0 rounded-full w-10 h-10 transition-all shadow-md mb-[1px] bg-white hover:bg-zinc-200 text-black hover:scale-105"
          >
            <Send size={18} strokeWidth={2.5} className="ml-0.5" />
          </Button>
        ) : (
          <Button
            onClick={handleMicClick}
            size="icon"
            className={`shrink-0 rounded-full w-10 h-10 transition-all mb-[1px] hover:bg-zinc-800 ${isListening ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' : 'bg-transparent text-zinc-400'}`}
          >
            <Mic size={20} strokeWidth={2} />
          </Button>
        )}
      </div>
      <div className="text-center mt-2">
        {isListening && (
          <p className="text-[11px] text-red-400 mb-1 animate-pulse">
            🎤 Mendengarkan...
          </p>
        )}
        {voiceError && (
          <p className="text-[11px] text-red-400 mb-1">
            ⚠️{' '}
            {voiceError === 'not-allowed'
              ? 'Izin mikrofon ditolak'
              : 'Gagal merekam suara'}
          </p>
        )}
        <p className="text-[10px] text-zinc-600">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}
