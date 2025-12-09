# Chatbot Module

A modular, clean, and maintainable chatbot implementation with vision capabilities, markdown/LaTeX support, and todo list generation.

## 📁 Structure

````
chatbot/
├── components/          # UI Components
│   ├── ChatHeader.tsx   # Header with AI mode selector
│   ├── ChatInput.tsx    # Input area with image upload
│   ├── EmptyState.tsx   # Initial empty state
│   ├── MessageBubble.tsx # Individual message rendering
│   ├── MessageContent.tsx # Markdown/LaTeX renderer
│   ├── TodoCard.tsx     # Todo item card
│   └── index.ts         # Barrel exports
├── hooks/              # Custom React Hooks
│   ├── useChatbot.ts   # Main chatbot logic & state
│   ├── useDropdown.ts  # Reusable dropdown logic
│   ├── useKeyboardHandler.ts # Keyboard event handling
│   └── index.ts        # Barrel exports
├── services/           # API Services
│   └── chatService.ts  # Chat & Vision API calls
├── constants.ts        # App constants & colors
├── types.ts           # TypeScript type definitions
├── utils.ts           # Utility functions
└── page.tsx           # Main page component

## 🎯 Features

- **Multiple AI Modes**: Fluent, Creative, Precise, Balanced, List Generator
- **Vision Support**: Upload and analyze images
- **Rich Text**: Markdown and LaTeX rendering
- **Todo Generation**: AI-powered task list creation
- **Message Actions**: Copy, Edit, Delete, Retry, Text-to-Speech
- **Mobile Optimized**: Responsive design with keyboard handling

## 🧩 Components

### ChatHeader
Header component with AI mode selector dropdown.

**Props:**
- `aiMode`: Current AI mode
- `setAiMode`: Function to change AI mode
- `dropdownOpen`: Dropdown state
- `toggleDropdown`: Toggle dropdown function
- `dropdownRef`: Ref for dropdown element
- `buttonRef`: Ref for trigger button

### ChatInput
Input area with image upload and send button.

**Props:**
- `input`: Current input text
- `setInput`: Function to update input
- `selectedImage`: Selected image base64
- `isTyping`: AI typing state
- `onSend`: Send message handler
- `onKeyPress`: Keyboard event handler
- `onImageSelect`: Image selection handler
- `onClearImage`: Clear image handler
- `onFocus/onBlur`: Focus event handlers

### MessageBubble
Individual message rendering with actions.

**Props:**
- `message`: Message object
- `userAvatar`: User avatar URL
- `copiedId`: Currently copied message ID
- `onCopy/onSpeak/onEdit/onDelete/onRetry`: Action handlers
- `onAddToDatabase`: Add todos to database
- `onEditTextChange`: Edit text change handler

## 🪝 Hooks

### useChatbot
Main chatbot logic and state management.

**Returns:**
- State: `messages`, `input`, `isTyping`, `aiMode`, etc.
- Handlers: `handleSend`, `handleRetry`, `handleCopy`, etc.
- Refs: `messagesEndRef`

### useDropdown
Reusable dropdown logic with click-outside detection.

**Returns:**
- `isOpen`: Dropdown state
- `toggle/close`: State control functions
- `dropdownRef/triggerRef`: Element refs

## 🔧 Services

### chatService
API interaction layer for chat and vision endpoints.

**Functions:**
- `fetchChatResponse(messages)`: Get AI chat response
- `fetchVisionResponse(prompt, messages, image)`: Get vision response
- `parseTodoList(content)`: Parse JSON todo list
- `generateListPrompt(prompt)`: Generate list mode prompt

## 📝 Types

- `Message`: Chat message structure
- `TodoItem`: Todo item structure
- `AIMode`: AI mode types
- `AIResponse`: API response structure
- `AIModeConfig`: AI mode configuration

## 🎨 Styling

Uses Catppuccin Mocha color palette for consistent theming.

## 🚀 Usage

```tsx
import Chatbot from '@/app/chatbot/page'

// In your app
<Chatbot />
````

## 🔐 Security

- Session-based authentication
- Input sanitization
- Error boundary handling
- Safe image upload (base64)

## 📦 Dependencies

- `react-markdown`: Markdown rendering
- `remark-gfm`: GitHub Flavored Markdown
- `remark-math` / `rehype-katex`: LaTeX support
- `sweetalert2`: Alert dialogs
- `lucide-react`: Icons

## 🧪 Testing

Ensure all features work:

1. Send text messages
2. Upload and analyze images
3. Generate todo lists
4. Edit/delete messages
5. Copy and TTS functionality
6. Add todos to database

## 🔄 Future Improvements

- [ ] Message search
- [ ] Export chat history
- [ ] Custom AI modes
- [ ] Voice input
- [ ] File attachments
