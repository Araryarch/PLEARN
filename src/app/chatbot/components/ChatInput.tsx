import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { catppuccin } from '../constants'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  selectedImage: string | null
  isTyping: boolean
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
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

  return (
    <div
      className="w-full border-t p-4 max-h-fit md:pb-4"
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

      <div className="flex items-center gap-3">
        <label
          className="cursor-pointer p-3 rounded-full hover:bg-[#313244] transition flex items-center justify-center group"
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

        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={
            selectedImage ? 'Describe the image...' : 'Type your message...'
          }
          className="flex-1 rounded-sm py-5 px-4 transition-all"
          style={{
            borderColor: catppuccin.overlay,
            backgroundColor: catppuccin.surface1,
            color: catppuccin.text,
          }}
        />

        <Button
          onClick={onSend}
          disabled={!canSend}
          style={{
            backgroundColor: catppuccin.blue,
            color: catppuccin.base,
            opacity: canSend ? 1 : 0.5,
          }}
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  )
}
