import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Copy,
  Edit2,
  Trash2,
  Volume2,
  Check,
  X,
  RotateCcw,
  Plus,
} from 'lucide-react'
import Image from 'next/image'
import { catppuccin } from '../constants'
import { formatTime } from '../utils'
import { Message, TodoItem } from '../types'
import { MessageContent } from './MessageContent'
import { TodoCard } from './TodoCard'

interface MessageBubbleProps {
  message: Message
  userAvatar: string
  copiedId: string | null
  onCopy: (text: string, id: string) => void
  onSpeak: (text: string) => void
  onEdit: (id: string) => void
  onSaveEdit: (id: string, text: string) => void
  onCancelEdit: (id: string) => void
  onDelete: (id: string) => void
  onRetry: (text: string) => void
  onAddToDatabase: (items: TodoItem[]) => void
  onEditTextChange: (id: string, text: string) => void
}

export const MessageBubble = ({
  message,
  userAvatar,
  copiedId,
  onCopy,
  onSpeak,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onRetry,
  onAddToDatabase,
  onEditTextChange,
}: MessageBubbleProps) => {
  const isUser = message.sender === 'user'
  const isCopied = copiedId === message.id

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%] lg:max-w-2xl items-start ${isUser ? 'flex-row-reverse' : ''}`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <Image
              src={userAvatar}
              width={32}
              height={32}
              alt="You"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border border-opacity-20 shadow-sm"
              style={{ borderColor: catppuccin.overlay }}
            />
          ) : (
            <div
              className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-sm"
              style={{
                backgroundColor: catppuccin.mauve,
                color: catppuccin.base,
              }}
            >
              AI
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
        >
          {/* Name & Time */}
          <div className="flex items-center gap-1.5 md:gap-2 px-1">
            <span
              className="text-[10px] md:text-xs font-semibold"
              style={{ color: catppuccin.subtext }}
            >
              {isUser ? 'You' : 'Senopati AI'}
            </span>
            <span
              className="text-[9px] md:text-[10px]"
              style={{ color: catppuccin.overlay }}
            >
              {formatTime(message.timestamp)}
            </span>
          </div>

          {/* Bubble */}
          <div
            className={`px-3 md:px-5 py-2.5 md:py-3.5 rounded-2xl shadow-sm ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'}`}
            style={{
              backgroundColor: isUser
                ? catppuccin.surface1
                : message.error
                  ? 'rgba(243, 139, 168, 0.1)'
                  : catppuccin.surface1,
              border: message.error ? `1px solid ${catppuccin.red}` : 'none',
              color: catppuccin.text,
            }}
          >
            {message.image && (
              <div className="mb-3">
                <Image
                  src={message.image}
                  alt="Uploaded content"
                  width={256}
                  height={256}
                  className="max-w-full rounded-lg max-h-64 object-cover"
                />
              </div>
            )}

            {message.isEditing ? (
              <div className="flex flex-col gap-2 min-w-[200px]">
                <Input
                  value={message.editedText ?? message.text}
                  onChange={(e) => onEditTextChange(message.id, e.target.value)}
                  className="bg-transparent border-opacity-50"
                  style={{
                    color: catppuccin.text,
                    borderColor: catppuccin.overlay,
                  }}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      onSaveEdit(message.id, message.editedText ?? message.text)
                    }
                    className="h-8 w-8 p-0"
                    style={{
                      backgroundColor: catppuccin.green,
                      color: catppuccin.base,
                    }}
                  >
                    <Check size={14} />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onCancelEdit(message.id)}
                    className="h-8 w-8 p-0"
                    style={{
                      backgroundColor: catppuccin.red,
                      color: catppuccin.base,
                    }}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>
            ) : message.jsonData ? (
              <div className="space-y-3 w-full min-w-[250px]">
                {message.jsonData.map((item, i) => (
                  <TodoCard key={i} item={item} />
                ))}

                {(message.jsonData?.length ?? 0) > 0 && (
                  <Button
                    onClick={() => onAddToDatabase(message.jsonData!)}
                    className="w-full mt-2 gap-2 shadow-lg hover:brightness-110 transition"
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
              <MessageContent content={message.text} />
            )}
          </div>

          {/* Message Actions */}
          <div
            className={`flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 ${isUser ? 'flex-row-reverse' : ''}`}
          >
            <button
              onClick={() => onCopy(message.text, message.id)}
              title="Copy"
              className="p-1 hover:text-white transition"
              style={{
                color: isCopied ? catppuccin.green : catppuccin.overlay,
              }}
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <button
              onClick={() => onSpeak(message.text)}
              title="Speak"
              className="p-1 hover:text-white transition"
              style={{ color: catppuccin.overlay }}
            >
              <Volume2 size={14} />
            </button>
            {isUser && (
              <button
                onClick={() => onEdit(message.id)}
                title="Edit"
                className="p-1 hover:text-white transition"
                style={{ color: catppuccin.overlay }}
              >
                <Edit2 size={14} />
              </button>
            )}
            {message.error && (
              <button
                onClick={() => onRetry(message.text)}
                title="Retry"
                className="p-1 hover:text-white transition"
                style={{ color: catppuccin.red }}
              >
                <RotateCcw size={14} />
              </button>
            )}
            <button
              onClick={() => onDelete(message.id)}
              title="Delete"
              className="p-1 hover:text-red-400 transition"
              style={{ color: catppuccin.overlay }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
