import { useState, useEffect, useCallback } from 'react'

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

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
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
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

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

        recognitionInstance.onstart = () => setIsListening(true)
        recognitionInstance.onend = () => setIsListening(false)
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from({ length: event.results.length })
            .map((_, i) => event.results[i][0].transcript)
            .join('')
          setText(transcript)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [])

  const startListening = useCallback(() => {
    setText('')
    if (recognition) {
      try {
        recognition.start()
      } catch (e) {
        console.error('Speech recognition already started', e)
      }
    }
  }, [recognition])

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop()
    }
  }, [recognition])

  return {
    isListening,
    text,
    startListening,
    stopListening,
    hasRecognition: !!recognition,
  }
}
