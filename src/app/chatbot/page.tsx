'use client'

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Layouts from '@/Layouts/Layouts'
import { App } from '@capacitor/app'

import { useChatbot } from './hooks/useChatbot'
import { useDropdown } from './hooks/useDropdown'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { EmptyState } from './components/EmptyState'
import { MessageBubble } from './components/MessageBubble'
import { catppuccin } from './constants'

export default function Chatbot() {
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
  const [isInputFocused, setIsInputFocused] = useState(false)

  App.addListener('backButton', () => {
    setIsInputFocused(false)
  })

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <Layouts
      isInputFocused={isInputFocused}
      topBotBar={
        <ChatInput
          input={input}
          setInput={setInput}
          selectedImage={selectedImage}
          isTyping={isTyping}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          onImageSelect={handleImageSelect}
          onClearImage={clearImage}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      }
    >
      <div
        className="h-screen w-full flex flex-col"
        style={{ backgroundColor: catppuccin.base, color: catppuccin.text }}
      >
        <ChatHeader
          aiMode={aiMode}
          setAiMode={setAiMode}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
          dropdownRef={dropdownRef}
          buttonRef={triggerRef}
        />

        <div className="flex-1 flex flex-col overflow-y-auto">
          <ScrollArea className="flex-1 w-full pt-[73px]">
            <div className="p-6 space-y-6">
              {messages.length === 0 && !isTyping && (
                <EmptyState aiMode={aiMode} />
              )}

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
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </Layouts>
  )
}
