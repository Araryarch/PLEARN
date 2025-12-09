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
      <div className="flex h-full w-full bg-background text-foreground">
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 md:p-6 pb-24 overflow-y-auto">
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-foreground">
                <BrainCircuit className="text-foreground" size={28} />
                AI Quiz
              </h1>
              <p className="text-muted-foreground text-sm">
                Test your knowledge
              </p>
            </div>

            {/* IDLE / EMPTY STATE */}
            {status === 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Card className="bg-card border-border py-8 shadow-sm">
                  <CardContent className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border border-border">
                      <BrainCircuit size={32} className="text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        Belum ada Quiz Aktif
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Silakan minta chatbot untuk membuatkan quiz tentang
                        topik tertentu.
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        (window.location.href = '/chatbot?mode=quiz')
                      }
                      className="w-full bg-foreground text-background hover:bg-muted-foreground gap-2 font-bold"
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
                      className="gap-2 border-border bg-card text-foreground hover:bg-muted"
                    >
                      <SkipForward size={16} />
                      Selesaikan Quiz
                    </Button>
                  </div>

                  <Card className="bg-card border-border shadow-sm">
                    <CardContent className="pt-6">
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            Question {currentQIndex + 1} of {questions.length}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">
                            {Math.round(
                              ((currentQIndex + 1) / questions.length) * 100,
                            )}
                            % Complete
                          </span>
                        </div>
                        <div className="bg-muted h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-foreground h-full transition-all duration-300"
                            style={{
                              width: `${((currentQIndex + 1) / questions.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 leading-relaxed text-foreground">
                        {questions[currentQIndex].question}
                      </h3>

                      <div className="space-y-3">
                        {questions[currentQIndex].options.map((opt, idx) => {
                          const isSelected = selectedOption === idx
                          const isCorrect =
                            questions[currentQIndex].correctAnswer === idx

                          let btnClass =
                            'w-full justify-start text-left p-4 md:p-5 h-auto text-sm md:text-base border-border bg-card hover:bg-muted text-muted-foreground transition-all'

                          if (isAnswered) {
                            if (isCorrect)
                              btnClass =
                                'w-full justify-start text-left p-4 md:p-5 h-auto bg-green-500 text-white border-green-500 font-medium'
                            else if (isSelected && !isCorrect)
                              btnClass =
                                'w-full justify-start text-left p-4 md:p-5 h-auto bg-red-500 text-white border-red-500 font-medium'
                          }

                          return (
                            <Button
                              key={idx}
                              variant="outline"
                              className={btnClass}
                              onClick={() => handleAnswer(idx)}
                              disabled={isAnswered}
                            >
                              <span className="mr-3 font-bold text-muted-foreground">
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
                                  className="ml-auto text-white"
                                  size={20}
                                />
                              )}
                            </Button>
                          )
                        })}
                      </div>

                      {/* Mark as Uncertain Button */}
                      {!isAnswered && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <Button
                            onClick={toggleUncertain}
                            variant="outline"
                            className={`w-full gap-2 ${
                              uncertainAnswers.has(currentQIndex)
                                ? 'bg-muted text-foreground border-border'
                                : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
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
                <Card className="bg-card border-border py-8 shadow-sm">
                  <CardContent className="flex flex-col items-center">
                    <Trophy className="text-foreground mb-4" size={64} />
                    <h2 className="text-2xl font-bold mb-2 text-foreground">
                      Quiz Completed!
                    </h2>

                    <div className="text-6xl font-black text-foreground mb-2">
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Benar {score} dari {questions.length} soal
                    </p>
                    {uncertainCount > 0 && (
                      <p className="text-xs text-muted-foreground mb-4">
                        {uncertainCount} soal ditandai ragu-ragu
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mb-8">
                      Waktu: {formatTime(timeElapsed)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <Button
                        onClick={handleResetQuiz}
                        className="flex-1 gap-2 bg-muted text-foreground hover:bg-muted/80 font-bold border border-border"
                      >
                        Selesai
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = '/chatbot?mode=quiz')
                        }
                        className="flex-1 gap-2 bg-foreground text-background hover:bg-muted-foreground font-bold"
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
          <div className="hidden lg:flex w-80 border-l border-border bg-card flex-col overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Stats Cards */}
              <div className="space-y-3">
                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Clock className="text-muted-foreground" size={16} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Time
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {formatTime(timeElapsed)}
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Target className="text-muted-foreground" size={16} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Score
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {Math.round((score / (currentQIndex + 1)) * 100)}% Accuracy
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Award className="text-muted-foreground" size={16} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Progress
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {currentQIndex + 1}/{questions.length}
                  </div>
                </div>

                {uncertainCount > 0 && (
                  <div className="bg-muted/30 rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Flag className="text-muted-foreground" size={16} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Uncertain
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {uncertainCount}
                    </div>
                  </div>
                )}
              </div>

              {/* Question Navigator */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
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
                              ? 'bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background'
                              : isAnswered
                                ? isCorrect
                                  ? 'bg-muted text-foreground border border-border'
                                  : 'bg-destructive/10 text-destructive border border-destructive/20'
                                : 'bg-card text-muted-foreground border border-border hover:bg-muted hover:text-foreground'
                          }
                        `}
                      >
                        {idx + 1}
                        {isUncertain && !isAnswered && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-muted-foreground"></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Legend
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-foreground"></div>
                    <span className="text-muted-foreground">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-muted border border-border"></div>
                    <span className="text-muted-foreground">Correct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-destructive/10 border border-destructive/20"></div>
                    <span className="text-muted-foreground">Wrong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-card border border-border relative">
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-muted-foreground"></div>
                    </div>
                    <span className="text-muted-foreground">Uncertain</span>
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
              className="w-full bg-card border-t border-border px-4 py-3 flex items-center justify-between text-foreground"
            >
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">
                  {formatTime(timeElapsed)}
                </span>
                <span className="text-muted-foreground">•</span>
                <Target size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">{score}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
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
                  className="bg-card border-t border-border overflow-hidden"
                >
                  <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {/* Question Navigator */}
                    <div>
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
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
                                    ? 'bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background'
                                    : isAnswered
                                      ? isCorrect
                                        ? 'bg-muted text-foreground border border-border'
                                        : 'bg-destructive/10 text-destructive border border-destructive/20'
                                      : 'bg-card text-muted-foreground border border-border'
                                }
                              `}
                            >
                              {idx + 1}
                              {isUncertain && !isAnswered && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-muted-foreground"></div>
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
