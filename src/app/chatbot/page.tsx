'use client'

import { useRouter } from 'next/navigation'
import { QuizQuestion } from './types'
import { ScrollArea } from '@/components/ui/scroll-area'
import Layouts from '@/Layouts/Layouts'
import { App } from '@capacitor/app'
import { Suspense } from 'react'

import { useChatbot } from './hooks/useChatbot'
import { useDropdown } from './hooks/useDropdown'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { EmptyState } from './components/EmptyState'
import { MessageBubble } from './components/MessageBubble'
import { ChatSkeleton } from './components/ChatSkeleton'

function ChatbotContent() {
  const router = useRouter()
  const {
    messages,
    input,
    setInput,
    isTyping,
    aiMode,
    setAiMode,
    messagesEndRef,
    handleSend,
    handleRetry,
    handleEditMessage,
    handleDeleteMessage,
    handleCopy,
    handleTextToSpeech,
    handleAddToDatabase,
    copiedId,
    setMessages,
    selectedImage,
    handleImageSelect,
    clearImage,
    extended,
  } = useChatbot()

  const {
    isOpen: dropdownOpen,
    toggle: toggleDropdown,
    dropdownRef,
    triggerRef,
  } = useDropdown()

  App.addListener('backButton', () => {
    // Handle back button if needed
  })

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleEditTextChange = (id: string, text: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, editedText: text } : m)),
    )
  }

  const handleStartEdit = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isEditing: true } : m)),
    )
  }

  const handleCancelEdit = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isEditing: false } : m)),
    )
  }

  const handleStartQuiz = (questions: QuizQuestion[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeQuiz', JSON.stringify(questions))
      router.push('/quiz')
    }
  }

  const hasMessages = messages.length > 0

  const chatInput = (
    <ChatInput
      input={input}
      setInput={setInput}
      selectedImage={selectedImage}
      isTyping={isTyping}
      onSend={handleSend}
      onKeyPress={handleKeyPress}
      onImageSelect={handleImageSelect}
      onClearImage={clearImage}
    />
  )

  return (
    <div className="flex flex-col h-full w-full relative bg-black">
      <ChatHeader
        aiMode={aiMode}
        setAiMode={setAiMode}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
        buttonRef={triggerRef}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {!hasMessages ? (
          <div className="flex-1 overflow-y-auto">
            <EmptyState setInput={setInput}>{chatInput}</EmptyState>
          </div>
        ) : (
          <ScrollArea className="flex-1 w-full h-full">
            <div className="px-4 py-6 space-y-6 pb-4 container mx-auto max-w-4xl">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  userAvatar={extended?.user?.avatar || '/default-avatar.png'}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                  onSpeak={handleTextToSpeech}
                  onEdit={handleStartEdit}
                  onSaveEdit={handleEditMessage}
                  onCancelEdit={handleCancelEdit}
                  onDelete={handleDeleteMessage}
                  onRetry={handleRetry}
                  onAddToDatabase={handleAddToDatabase}
                  onEditTextChange={handleEditTextChange}
                  onStartQuiz={handleStartQuiz}
                />
              ))}

              {isTyping && <ChatSkeleton />}

              <div ref={messagesEndRef} className="h-4" />
            </div>
          </ScrollArea>
        )}
      </div>

      {hasMessages && (
        <div className="flex-none w-full z-20 bg-black pt-10 pb-2">
          {chatInput}
        </div>
      )}
    </div>
  )
}

export default function Chatbot() {
  return (
    <Layouts>
      <Suspense fallback={<div className="h-full w-full bg-black" />}>
        <ChatbotContent />
      </Suspense>
    </Layouts>
  )
}
