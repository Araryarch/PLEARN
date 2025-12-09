import { useState, useEffect, useCallback, useRef } from 'react'

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: { new (): SpeechRecognition }
  webkitSpeechRecognition?: { new (): SpeechRecognition }
}

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as WindowWithSpeech
      const SpeechRecognition =
        win.SpeechRecognition || win.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = true
        recognitionInstance.lang = 'id-ID'

        recognitionInstance.onstart = () => {
          setIsListening(true)
          setError(null)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error)
          setError(event.error)
          setIsListening(false)
        }

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from({ length: event.results.length })
            .map((_, i) => event.results[i][0].transcript)
            .join('')
          setText(transcript)
        }

        recognitionRef.current = recognitionInstance
      } else {
        setError('Speech recognition not supported in this browser')
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch {
          // Ignore errors on cleanup
        }
      }
    }
  }, [])

  const startListening = useCallback(() => {
    setText('')
    setError(null)
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
      } catch (e) {
        const err = e as Error
        if (err.message.includes('already started')) {
          // Already listening, stop and restart
          recognitionRef.current.stop()
          setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.start()
            }
          }, 100)
        } else {
          console.error('Failed to start speech recognition:', e)
          setError('Failed to start recording')
        }
      }
    } else {
      setError('Speech recognition not available')
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        console.error('Failed to stop speech recognition:', e)
      }
    }
  }, [])

  return {
    isListening,
    text,
    error,
    startListening,
    stopListening,
    hasRecognition: !!recognitionRef.current,
  }
}
