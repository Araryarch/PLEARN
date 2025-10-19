'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar, Smile, FileText } from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface MoodLogData {
  log_date: string
  mood: string
  stress_level: number
  anxiety_level: number
  notes: string
}

interface DisplayField {
  id: keyof MoodLogData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  unit?: string
  isMood?: boolean
}

function MoodLogDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const moodLogData: MoodLogData = {
    log_date: '2025-06-14',
    mood: 'Good',
    stress_level: 3,
    anxiety_level: 2,
    notes: 'Feeling positive today. Work stress is manageable.',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'log_date',
      label: 'Tanggal Log',
      icon: Calendar,
    },
    {
      id: 'mood',
      label: 'Suasana Hati',
      icon: Smile,
      isMood: true,
    },
    {
      id: 'stress_level',
      label: 'Tingkat Stres',
      icon: FileText,
      unit: '/10',
    },
    {
      id: 'anxiety_level',
      label: 'Tingkat Kecemasan',
      icon: FileText,
      unit: '/10',
    },
    {
      id: 'notes',
      label: 'Catatan',
      icon: FileText,
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Mood log disimpan:', moodLogData)
      alert('Mood log berhasil disimpan!')
    } catch (error) {
      alert('Gagal menyimpan mood log.' + String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    alert('Form mood log telah direset.')
    console.log('Reset form mood log diklik')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Log Suasana Hati
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi suasana hati dan kesehatan mental harian
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = moodLogData[field.id]
                const displayValue = field.isMood ? (
                  <div className="flex items-center gap-2">
                    <Smile className="w-4 h-4 text-green-500" />
                    <span>{value}</span>
                  </div>
                ) : (
                  `${value}${field.unit ? ` ${field.unit}` : ''}`
                )

                return (
                  <div key={field.id} className="space-y-2">
                    <Label
                      htmlFor={field.id}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500" />
                      {field.label}
                      {field.unit && !field.isMood && (
                        <span className="text-xs text-gray-400">
                          ({field.unit})
                        </span>
                      )}
                    </Label>
                    <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                      {displayValue}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Tombol aksi */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleReset}
              >
                Reset Form
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </div>
                ) : (
                  'Simpan Data'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function page() {
  return (
    <Layouts>
      <main className="w-full min-h-screen p-2 md:p-5">
        <MoodLogDisplayContent />
      </main>
    </Layouts>
  )
}
