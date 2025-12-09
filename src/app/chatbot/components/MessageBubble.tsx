import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
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
  GraduationCap,
  Bot,
  ZoomIn,
} from 'lucide-react'
import Image from 'next/image'
import { formatTime } from '../utils'
import { Message, TodoItem, QuizQuestion } from '../types'
import { MessageContent } from './MessageContent'
import { TodoCard } from './TodoCard'
import { useState } from 'react'

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
  onStartQuiz: (questions: QuizQuestion[]) => void
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
  onStartQuiz,
}: MessageBubbleProps) => {
  const isUser = message.sender === 'user'
  const isCopied = copiedId === message.id
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
      >
        <div
          className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-[85%] lg:max-w-3xl items-start ${isUser ? 'flex-row-reverse' : ''}`}
        >
          {/* Avatar */}
          <div className="flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity">
            {isUser ? (
              <Image
                src={userAvatar}
                width={32}
                height={32}
                alt="You"
                className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-white/5 grayscale"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center text-zinc-400 bg-zinc-900 rounded-lg">
                <Bot size={20} />
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
          >
            {/* Name & Time */}
            <div
              className={`flex items-center gap-2 px-1 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <span className="text-xs font-semibold text-white">
                {isUser ? 'You' : 'Senopati'}
              </span>
              <span className="text-[10px] text-zinc-600">
                {formatTime(message.timestamp)}
              </span>
            </div>

            {/* Bubble */}
            <div
              className={`py-2 px-4 md:py-3 md:px-5 overflow-hidden break-words ${
                isUser
                  ? 'rounded-2xl rounded-tr-sm bg-zinc-800 text-white shadow-md'
                  : message.error
                    ? 'rounded-xl bg-red-500/10 border border-red-500/20 text-white'
                    : 'rounded-none bg-transparent text-white px-0 md:px-0'
              }`}
            >
              {message.image && (
                <div className="mb-3 relative group/image">
                  <Image
                    src={message.image}
                    alt="Uploaded content"
                    width={256}
                    height={256}
                    className="max-w-full rounded-lg max-h-64 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setImagePreview(message.image!)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                      <ZoomIn className="text-white" size={20} />
                    </div>
                  </div>
                </div>
              )}

              {message.isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={message.editedText || message.text}
                    onChange={(e) =>
                      onEditTextChange(message.id, e.target.value)
                    }
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        onSaveEdit(
                          message.id,
                          message.editedText || message.text,
                        )
                      }
                      className="bg-white text-black hover:bg-zinc-200"
                    >
                      <Check size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCancelEdit(message.id)}
                      className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <MessageContent content={message.text} />

                  {message.jsonData && message.jsonData.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {message.jsonData.map((item, idx) => (
                        <TodoCard key={idx} item={item} />
                      ))}
                      <Button
                        onClick={() => onAddToDatabase(message.jsonData!)}
                        size="sm"
                        className="w-full gap-2 bg-white text-black hover:bg-zinc-200 font-medium"
                      >
                        <Plus size={16} />
                        Tambahkan ke Database
                      </Button>
                    </div>
                  )}

                  {message.quizData && message.quizData.length > 0 && (
                    <div className="mt-4">
                      <Button
                        onClick={() => onStartQuiz(message.quizData!)}
                        size="sm"
                        className="w-full gap-2 bg-white text-black hover:bg-zinc-200 font-medium"
                      >
                        <GraduationCap size={16} />
                        Mulai Quiz ({message.quizData.length} soal)
                      </Button>
                    </div>
                  )}
                </>
              )}

              {message.error && (
                <Button
                  onClick={() => onRetry(message.text)}
                  size="sm"
                  variant="outline"
                  className="mt-2 gap-2 border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <RotateCcw size={14} />
                  Retry
                </Button>
              )}
            </div>

            {/* Actions */}
            {!message.isEditing && !message.error && (
              <div
                className={`flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onCopy(message.text, message.id)}
                  className="h-7 px-2 text-zinc-500 hover:text-white hover:bg-zinc-900"
                >
                  {isCopied ? (
                    <Check size={14} className="text-white" />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
                {!isUser && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onSpeak(message.text)}
                    className="h-7 px-2 text-zinc-500 hover:text-white hover:bg-zinc-900"
                  >
                    <Volume2 size={14} />
                  </Button>
                )}
                {isUser && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(message.id)}
                      className="h-7 px-2 text-zinc-500 hover:text-white hover:bg-zinc-900"
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(message.id)}
                      className="h-7 px-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Image Preview Modal */}
      {imagePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setImagePreview(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={imagePreview}
              alt="Preview"
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="text-white" size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
