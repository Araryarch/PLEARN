'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layouts from '@/Layouts/Layouts'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QuizQuestion } from '../chatbot/types'
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  Trophy,
  RefreshCcw,
} from 'lucide-react'

export default function QuizPage() {
  const [status, setStatus] = useState<'idle' | 'quiz' | 'result'>('idle')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  // Load quiz from storage on mount
  useEffect(() => {
    // Add useEffect import
    const stored = localStorage.getItem('activeQuiz')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed)
          setStatus('quiz')
        }
      } catch (e) {
        console.error('Failed to load quiz', e)
      }
    }
  }, [])

  const handleAnswer = (index: number) => {
    if (isAnswered) return

    setSelectedOption(index)
    setIsAnswered(true)

    const correct = questions[currentQIndex].correctAnswer === index
    if (correct) {
      setScore((s) => s + 1)
    }

    // Auto next after delay
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1)
        setSelectedOption(null)
        setIsAnswered(false)
      } else {
        setStatus('result')
      }
    }, 1500)
  }

  return (
    <Layouts>
      <div className="flex flex-col h-full w-full min-h-screen relative p-4 pb-24 bg-black text-zinc-50">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3 text-white">
              <BrainCircuit className="text-white" size={32} />
              AI Quiz
            </h1>
            <p className="text-zinc-400">Test your knowledge</p>
          </div>

          {/* IDLE / EMPTY STATE */}
          {status === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <Card className="bg-zinc-950 border-zinc-900 py-8 shadow-sm">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                    <BrainCircuit size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Belum ada Quiz Aktif
                    </h3>
                    <p className="text-zinc-500 text-sm">
                      Silakan minta chatbot untuk membuatkan quiz tentang topik
                      tertentu.
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      (window.location.href = '/chatbot?mode=quiz')
                    }
                    className="w-full bg-white text-black hover:bg-zinc-200 gap-2 font-bold"
                  >
                    Buka Chatbot
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* QUIZ STATE */}
          {status === 'quiz' && questions.length > 0 && (
            <motion.div
              key={currentQIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <div className="flex justify-between mb-4 text-sm font-medium text-zinc-500">
                <span>
                  Question {currentQIndex + 1}/{questions.length}
                </span>
                <span>Score: {score}</span>
              </div>

              <div className="mb-6 bg-zinc-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{
                    width: `${((currentQIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              <Card className="bg-zinc-950 border-zinc-900 mb-6 shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6 leading-relaxed text-zinc-100">
                    {questions[currentQIndex].question}
                  </h3>
                  <div className="space-y-3">
                    {questions[currentQIndex].options.map((opt, idx) => {
                      const isSelected = selectedOption === idx
                      const isCorrect =
                        questions[currentQIndex].correctAnswer === idx

                      let btnClass =
                        'w-full justify-start text-left p-4 h-auto text-sm md:text-base border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'

                      if (isAnswered) {
                        if (isCorrect)
                          btnClass =
                            'w-full justify-start text-left p-4 h-auto bg-zinc-800 text-white border-white'
                        else if (isSelected && !isCorrect)
                          btnClass =
                            'w-full justify-start text-left p-4 h-auto bg-zinc-900 text-zinc-500 border-zinc-800 opacity-50'
                      }

                      return (
                        <Button
                          key={idx}
                          variant="outline"
                          className={btnClass}
                          onClick={() => handleAnswer(idx)}
                          disabled={isAnswered}
                        >
                          <span className="mr-3 font-bold opacity-50">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          {opt}
                          {isAnswered && isCorrect && (
                            <CheckCircle2
                              className="ml-auto text-white"
                              size={20}
                            />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle
                              className="ml-auto text-zinc-500"
                              size={20}
                            />
                          )}
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* RESULT STATE */}
          {status === 'result' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <Card className="bg-zinc-950 border-zinc-900 py-8 shadow-sm">
                <CardContent className="flex flex-col items-center">
                  <Trophy className="text-white mb-4" size={64} />
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    Quiz Completed!
                  </h2>

                  <div className="text-6xl font-black text-white mb-2">
                    {Math.round((score / questions.length) * 100)}
                  </div>
                  <p className="text-sm text-zinc-500 mb-8">
                    Benar {score} dari {questions.length} soal
                  </p>

                  <Button
                    onClick={() =>
                      (window.location.href = '/chatbot?mode=quiz')
                    }
                    className="gap-2 bg-white text-black hover:bg-zinc-200 font-bold"
                  >
                    <RefreshCcw size={18} />
                    Coba Topik Lain
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layouts>
  )
}
