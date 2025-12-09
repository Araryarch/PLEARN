import { useEffect } from 'react'

interface UseKeyboardHandlerProps {
  onEnter?: () => void
  onEscape?: () => void
}

export const useKeyboardHandler = ({
  onEnter,
  onEscape,
}: UseKeyboardHandlerProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && onEnter) {
        e.preventDefault()
        onEnter()
      }
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault()
        onEscape()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onEnter, onEscape])
}
