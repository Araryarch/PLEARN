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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
      return // Stop here, do not call onKeyPress
    }
    onKeyPress(e)
  }

  return (
    <div className="w-full px-4 pb-4 pt-2 bg-transparent">
      {selectedImage && (
        <div className="relative inline-block mb-3 ml-2">
          <Image
            src={selectedImage}
            alt="Selected"
            width={72}
            height={72}
            className="h-[72px] w-auto rounded-xl border border-white/10 object-cover shadow-lg"
          />
          <button
            onClick={onClearImage}
            className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 border border-white/10 shadow-md hover:bg-gray-700 transition"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Input Capsule */}
      <div
        className="flex items-end gap-2 rounded-[26px] p-1.5 pl-2 border shadow-lg transition-all focus-within:shadow-xl focus-within:border-opacity-100 backdrop-blur-md"
        style={{
          backgroundColor: `${catppuccin.surface0}E6`,
          borderColor: catppuccin.surface1,
        }}
      >
        <label
          className="cursor-pointer w-10 h-10 rounded-full hover:bg-white/5 transition flex items-center justify-center shrink-0 mb-[1px]"
          title="Upload Image"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageSelect}
          />
          <ImageIcon
            size={22}
            strokeWidth={2}
            style={{
              color: selectedImage ? catppuccin.green : catppuccin.text,
              opacity: 0.7,
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
            selectedImage ? 'Describe this image...' : 'Message Senopati...'
          }
          rows={1}
          className="flex-1 bg-transparent py-2.5 px-2 focus:outline-none resize-none max-h-[160px] overflow-y-auto w-full custom-scrollbar text-[16px]"
          style={{
            color: catppuccin.text,
            minHeight: '24px',
            lineHeight: '24px',
          }}
        />

        <Button
          onClick={onSend}
          disabled={!canSend}
          size="icon"
          className="shrink-0 rounded-full w-10 h-10 transition-all shadow-sm mb-[1px]"
          style={{
            backgroundColor: canSend ? catppuccin.text : 'transparent',
            color: canSend ? catppuccin.base : catppuccin.subtext,
            opacity: canSend ? 1 : 0.3,
          }}
        >
          <Send
            size={18}
            strokeWidth={2.5}
            className={canSend ? 'ml-0.5' : ''}
          />
        </Button>
      </div>
    </div>
  )
}
