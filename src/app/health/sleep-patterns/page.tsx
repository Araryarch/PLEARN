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
import { Calendar, Clock, Smile, FileText, Moon } from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface SleepLogData {
  sleep_date: string
  bedtime: string
  wake_time: string
  sleep_duration_hours: number
  sleep_quality: string
  notes: string
}

interface DisplayField {
  id: keyof SleepLogData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  unit?: string
  isQuality?: boolean
}

function SleepLogDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sleepLogData: SleepLogData = {
    sleep_date: '2025-06-13',
    bedtime: '22:30:00',
    wake_time: '07:00:00',
    sleep_duration_hours: 8.5,
    sleep_quality: 'Good',
    notes: 'Fell asleep quickly, woke up refreshed',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'sleep_date',
      label: 'Tanggal Tidur',
      icon: Calendar,
    },
    {
      id: 'bedtime',
      label: 'Waktu Tidur',
      icon: Moon,
    },
    {
      id: 'wake_time',
      label: 'Waktu Bangun',
      icon: Clock,
    },
    {
      id: 'sleep_duration_hours',
      label: 'Durasi Tidur',
      icon: Clock,
      unit: 'jam',
    },
    {
      id: 'sleep_quality',
      label: 'Kualitas Tidur',
      icon: Smile,
      isQuality: true,
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
      console.log('Sleep log disimpan:', sleepLogData)
      alert('Log tidur berhasil disimpan!')
    } catch (error) {
      alert('Gagal menyimpan log tidur.' + String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    alert('Form log tidur telah direset.')
    console.log('Reset form log tidur diklik')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Log Tidur Harian
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi tidur harian pasien
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = sleepLogData[field.id]
                const displayValue = field.isQuality ? (
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
                      {field.unit && !field.isQuality && (
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
        <SleepLogDisplayContent />
      </main>
    </Layouts>
  )
}
