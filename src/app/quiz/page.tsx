'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Clock,
  Target,
  Award,
  ChevronUp,
  ChevronDown,
  Flag,
  SkipForward,
} from 'lucide-react'

export default function QuizPage() {
  const [status, setStatus] = useState<'idle' | 'quiz' | 'result'>('idle')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [uncertainAnswers, setUncertainAnswers] = useState<Set<number>>(
    new Set(),
  )
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showMobileStats, setShowMobileStats] = useState(false)

  // Timer
  useEffect(() => {
    if (status === 'quiz') {
      const interval = setInterval(() => {
        setTimeElapsed((t) => t + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [status])

  // Load quiz from storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('activeQuiz')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed)
          setAnswers(new Array(parsed.length).fill(null))
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

    // Save answer
    const newAnswers = [...answers]
    newAnswers[currentQIndex] = index
    setAnswers(newAnswers)

    // Auto next after delay
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1)
        setSelectedOption(null)
        setIsAnswered(false)
      } else {
        // Clear quiz from localStorage when finished
        localStorage.removeItem('activeQuiz')
        setStatus('result')
      }
    }, 1500)
  }

  const toggleUncertain = () => {
    const newUncertain = new Set(uncertainAnswers)
    if (newUncertain.has(currentQIndex)) {
      newUncertain.delete(currentQIndex)
    } else {
      newUncertain.add(currentQIndex)
    }
    setUncertainAnswers(newUncertain)
  }

  const handleFinishQuiz = () => {
    // Mark all unanswered questions as wrong
    for (let i = currentQIndex; i < questions.length; i++) {
      if (answers[i] === null) {
        const newAnswers = [...answers]
        newAnswers[i] = -1 // Invalid answer
        setAnswers(newAnswers)
      }
    }

    localStorage.removeItem('activeQuiz')
    setStatus('result')
  }

  const handleResetQuiz = () => {
    // Reset all state
    setStatus('idle')
    setQuestions([])
    setCurrentQIndex(0)
    setScore(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setAnswers([])
    setUncertainAnswers(new Set())
    setTimeElapsed(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const goToQuestion = (index: number) => {
    if (isAnswered) return
    setCurrentQIndex(index)
    setSelectedOption(null)
  }

  const uncertainCount = uncertainAnswers.size

  return (
    <Layouts>
      <div className="flex h-full w-full min-h-screen bg-black text-zinc-50">
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 md:p-6 pb-24 overflow-y-auto">
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
                <BrainCircuit className="text-white" size={28} />
                AI Quiz
              </h1>
              <p className="text-zinc-400 text-sm">Test your knowledge</p>
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
                        Silakan minta chatbot untuk membuatkan quiz tentang
                        topik tertentu.
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex-1 space-y-4"
                >
                  {/* Finish Quiz Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleFinishQuiz}
                      variant="outline"
                      className="gap-2 border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                      <SkipForward size={16} />
                      Selesaikan Quiz
                    </Button>
                  </div>

                  <Card className="bg-zinc-950 border-zinc-900 shadow-sm">
                    <CardContent className="pt-6">
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-zinc-500">
                            Question {currentQIndex + 1} of {questions.length}
                          </span>
                          <span className="text-sm font-medium text-zinc-500">
                            {Math.round(
                              ((currentQIndex + 1) / questions.length) * 100,
                            )}
                            % Complete
                          </span>
                        </div>
                        <div className="bg-zinc-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-white h-full transition-all duration-300"
                            style={{
                              width: `${((currentQIndex + 1) / questions.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 leading-relaxed text-white">
                        {questions[currentQIndex].question}
                      </h3>

                      <div className="space-y-3">
                        {questions[currentQIndex].options.map((opt, idx) => {
                          const isSelected = selectedOption === idx
                          const isCorrect =
                            questions[currentQIndex].correctAnswer === idx

                          let btnClass =
                            'w-full justify-start text-left p-4 md:p-5 h-auto text-sm md:text-base border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-all'

                          if (isAnswered) {
                            if (isCorrect)
                              btnClass =
                                'w-full justify-start text-left p-4 md:p-5 h-auto bg-white text-black border-white font-medium'
                            else if (isSelected && !isCorrect)
                              btnClass =
                                'w-full justify-start text-left p-4 md:p-5 h-auto bg-zinc-900 text-zinc-500 border-zinc-800 opacity-50'
                          }

                          return (
                            <Button
                              key={idx}
                              variant="outline"
                              className={btnClass}
                              onClick={() => handleAnswer(idx)}
                              disabled={isAnswered}
                            >
                              <span className="mr-3 font-bold text-zinc-500">
                                {String.fromCharCode(65 + idx)}.
                              </span>
                              {opt}
                              {isAnswered && isCorrect && (
                                <CheckCircle2
                                  className="ml-auto text-black"
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

                      {/* Mark as Uncertain Button */}
                      {!isAnswered && (
                        <div className="mt-6 pt-6 border-t border-zinc-800">
                          <Button
                            onClick={toggleUncertain}
                            variant="outline"
                            className={`w-full gap-2 ${
                              uncertainAnswers.has(currentQIndex)
                                ? 'bg-zinc-800 text-white border-zinc-700'
                                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                          >
                            <Flag size={16} />
                            {uncertainAnswers.has(currentQIndex)
                              ? 'Ditandai Ragu-ragu'
                              : 'Tandai Ragu-ragu'}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
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
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                    <p className="text-sm text-zinc-500 mb-2">
                      Benar {score} dari {questions.length} soal
                    </p>
                    {uncertainCount > 0 && (
                      <p className="text-xs text-zinc-600 mb-4">
                        {uncertainCount} soal ditandai ragu-ragu
                      </p>
                    )}
                    <p className="text-xs text-zinc-600 mb-8">
                      Waktu: {formatTime(timeElapsed)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <Button
                        onClick={handleResetQuiz}
                        className="flex-1 gap-2 bg-zinc-800 text-white hover:bg-zinc-700 font-bold border border-zinc-700"
                      >
                        Selesai
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = '/chatbot?mode=quiz')
                        }
                        className="flex-1 gap-2 bg-white text-black hover:bg-zinc-200 font-bold"
                      >
                        <RefreshCcw size={18} />
                        Topik Lain
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* Desktop Right Sidebar */}
        {status === 'quiz' && questions.length > 0 && (
          <div className="hidden lg:flex w-80 border-l border-zinc-900 bg-zinc-950 flex-col overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Stats Cards */}
              <div className="space-y-3">
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Clock className="text-zinc-400" size={16} />
                    </div>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Time
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatTime(timeElapsed)}
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Target className="text-zinc-400" size={16} />
                    </div>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Score
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">{score}</div>
                  <div className="text-xs text-zinc-600 mt-1">
                    {Math.round((score / (currentQIndex + 1)) * 100)}% Accuracy
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Award className="text-zinc-400" size={16} />
                    </div>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Progress
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {currentQIndex + 1}/{questions.length}
                  </div>
                </div>

                {uncertainCount > 0 && (
                  <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <Flag className="text-zinc-400" size={16} />
                      </div>
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Uncertain
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {uncertainCount}
                    </div>
                  </div>
                )}
              </div>

              {/* Question Navigator */}
              <div>
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                  Questions
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, idx) => {
                    const isAnswered = answers[idx] !== null
                    const isCurrent = idx === currentQIndex
                    const isUncertain = uncertainAnswers.has(idx)
                    const isCorrect =
                      isAnswered &&
                      answers[idx] === questions[idx].correctAnswer

                    return (
                      <button
                        key={idx}
                        onClick={() => goToQuestion(idx)}
                        disabled={isAnswered}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all relative
                          ${
                            isCurrent
                              ? 'bg-white text-black ring-2 ring-white ring-offset-2 ring-offset-zinc-950'
                              : isAnswered
                                ? isCorrect
                                  ? 'bg-zinc-800 text-white border border-zinc-700'
                                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                                : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                          }
                        `}
                      >
                        {idx + 1}
                        {isUncertain && !isAnswered && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-400"></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="pt-4 border-t border-zinc-800">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                  Legend
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-white"></div>
                    <span className="text-zinc-400">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700"></div>
                    <span className="text-zinc-400">Correct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800"></div>
                    <span className="text-zinc-400">Wrong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 relative">
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-400"></div>
                    </div>
                    <span className="text-zinc-400">Uncertain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Stats Sheet */}
        {status === 'quiz' && questions.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            {/* Toggle Button */}
            <button
              onClick={() => setShowMobileStats(!showMobileStats)}
              className="w-full bg-zinc-900 border-t border-zinc-800 px-4 py-3 flex items-center justify-between text-white"
            >
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-zinc-400" />
                <span className="text-sm font-medium">
                  {formatTime(timeElapsed)}
                </span>
                <span className="text-zinc-600">•</span>
                <Target size={16} className="text-zinc-400" />
                <span className="text-sm font-medium">{score}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-sm text-zinc-500">
                  {currentQIndex + 1}/{questions.length}
                </span>
              </div>
              {showMobileStats ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronUp size={20} />
              )}
            </button>

            {/* Expandable Stats */}
            <AnimatePresence>
              {showMobileStats && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-zinc-950 border-t border-zinc-800 overflow-hidden"
                >
                  <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {/* Question Navigator */}
                    <div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                        Questions
                      </h3>
                      <div className="grid grid-cols-6 gap-2">
                        {questions.map((_, idx) => {
                          const isAnswered = answers[idx] !== null
                          const isCurrent = idx === currentQIndex
                          const isUncertain = uncertainAnswers.has(idx)
                          const isCorrect =
                            isAnswered &&
                            answers[idx] === questions[idx].correctAnswer

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                goToQuestion(idx)
                                setShowMobileStats(false)
                              }}
                              disabled={isAnswered}
                              className={`
                                aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all relative
                                ${
                                  isCurrent
                                    ? 'bg-white text-black ring-2 ring-white ring-offset-2 ring-offset-zinc-950'
                                    : isAnswered
                                      ? isCorrect
                                        ? 'bg-zinc-800 text-white border border-zinc-700'
                                        : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                                }
                              `}
                            >
                              {idx + 1}
                              {isUncertain && !isAnswered && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-400"></div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </Layouts>
  )
}
