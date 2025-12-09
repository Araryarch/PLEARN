import { Button } from '@/components/ui/button'
import { Send, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { catppuccin } from '../constants'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  selectedImage: string | null
  isTyping: boolean
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearImage: () => void
  onFocus: () => void
  onBlur: () => void
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

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
    onKeyPress(e)
  }

  return (
    <div
      className="w-full border-t p-4 pb-6"
      style={{
        borderColor: catppuccin.overlay,
        backgroundColor: catppuccin.base,
      }}
    >
      {selectedImage && (
        <div className="relative inline-block mb-3 ml-1">
          <Image
            src={selectedImage}
            alt="Selected"
            width={80}
            height={80}
            className="h-20 w-auto rounded-lg border border-gray-600 object-cover"
          />
          <button
            onClick={onClearImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Input Container */}
      <div
        className="flex items-end gap-2 rounded-3xl p-2 border transition-colors focus-within:border-opacity-100"
        style={{
          backgroundColor: catppuccin.surface1,
          borderColor: catppuccin.overlay,
        }}
      >
        <label
          className="cursor-pointer p-2 rounded-full hover:bg-white/10 transition flex items-center justify-center shrink-0 mb-1"
          title="Upload Image"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageSelect}
          />
          <ImageIcon
            size={20}
            style={{
              color: selectedImage ? catppuccin.green : catppuccin.subtext,
            }}
          />
        </label>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={
            selectedImage ? 'Describe the image...' : 'Type a message...'
          }
          rows={1}
          className="flex-1 bg-transparent py-3 px-2 focus:outline-none resize-none max-h-[200px] overflow-y-auto w-full custom-scrollbar"
          style={{
            color: catppuccin.text,
            minHeight: '44px',
          }}
        />

        <Button
          onClick={onSend}
          disabled={!canSend}
          size="icon"
          className="shrink-0 mb-1 rounded-full w-10 h-10 transition-all active:scale-95"
          style={{
            backgroundColor: canSend ? catppuccin.text : 'transparent',
            color: canSend ? catppuccin.base : catppuccin.subtext,
            opacity: canSend ? 1 : 0.5,
          }}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  )
}
