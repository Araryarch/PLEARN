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
} from 'lucide-react'
import Image from 'next/image'
import { catppuccin } from '../constants'
import { formatTime } from '../utils'
import { Message, TodoItem, QuizQuestion } from '../types'
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

  return (
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
              className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-white/5"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-blue-400 bg-blue-500/10 rounded-lg">
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
            <span className="text-xs font-semibold text-[#cdd6f4]">
              {isUser ? 'You' : 'Senopati'}
            </span>
            <span className="text-[10px] text-[#585b70]">
              {formatTime(message.timestamp)}
            </span>
          </div>

          {/* Bubble */}
          <div
            className={`py-2 px-4 md:py-3 md:px-5 overflow-hidden break-words ${
              isUser
                ? 'rounded-2xl rounded-tr-sm bg-[#313244] text-[#cdd6f4] shadow-md'
                : message.error
                  ? 'rounded-xl bg-red-500/10 border border-red-500/20 text-[#cdd6f4]'
                  : 'rounded-none bg-transparent text-[#cdd6f4] px-0 md:px-0'
            }`}
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
            ) : message.quizData ? (
              <div className="w-full min-w-[250px] space-y-3">
                <div
                  className="p-4 rounded-xl border border-dashed flex flex-col items-center justify-center text-center gap-2"
                  style={{
                    borderColor: catppuccin.blue,
                    backgroundColor: `${catppuccin.blue}1A`,
                  }}
                >
                  <GraduationCap size={32} style={{ color: catppuccin.blue }} />
                  <div>
                    <h4 className="font-bold text-base">Quiz Siap!</h4>
                    <p className="text-sm opacity-70">
                      {message.quizData.length} pertanyaan generated.
                    </p>
                  </div>
                  <Button
                    onClick={() => onStartQuiz(message.quizData!)}
                    className="w-full mt-2 font-bold shadow-lg hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: catppuccin.blue,
                      color: catppuccin.base,
                    }}
                  >
                    Mulai Mengerjakan
                  </Button>
                </div>
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
    </motion.div>
  )
}
