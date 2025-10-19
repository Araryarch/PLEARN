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
import {
  Calendar,
  Droplets,
  CheckCircle,
  XCircle,
  Utensils,
} from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface MealLogData {
  log_date: string
  is_breakfast: boolean
  is_lunch: boolean
  is_dinner: boolean
  is_morning_snack: boolean
  is_afternoon_snack: boolean
  is_evening_snack: boolean
  description: string
  water_intake_litre: number
}

interface DisplayField {
  id: keyof MealLogData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  isBoolean?: boolean
  unit?: string
}

function MealLogDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mealLogData: MealLogData = {
    log_date: '2025-06-14',
    is_breakfast: true,
    is_lunch: true,
    is_dinner: true,
    is_morning_snack: false,
    is_afternoon_snack: true,
    is_evening_snack: false,
    description: 'Healthy meals throughout the day with balanced nutrition',
    water_intake_litre: 2.5,
  }

  const displayFields: DisplayField[] = [
    { id: 'log_date', label: 'Tanggal Log', icon: Calendar },
    { id: 'is_breakfast', label: 'Sarapan', icon: Utensils, isBoolean: true },
    { id: 'is_lunch', label: 'Makan Siang', icon: Utensils, isBoolean: true },
    { id: 'is_dinner', label: 'Makan Malam', icon: Utensils, isBoolean: true },
    {
      id: 'is_morning_snack',
      label: 'Camilan Pagi',
      icon: Utensils,
      isBoolean: true,
    },
    {
      id: 'is_afternoon_snack',
      label: 'Camilan Sore',
      icon: Utensils,
      isBoolean: true,
    },
    {
      id: 'is_evening_snack',
      label: 'Camilan Malam',
      icon: Utensils,
      isBoolean: true,
    },
    { id: 'description', label: 'Deskripsi', icon: Utensils },
    {
      id: 'water_intake_litre',
      label: 'Asupan Air',
      icon: Droplets,
      unit: 'liter',
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((res) => setTimeout(res, 1000))
      console.log('Data yang dikirim:', mealLogData)
      alert('Data log makanan berhasil disimpan!')
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data' + String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    console.log('Reset form diklik')
    alert('Form telah direset!')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Log Makanan Harian
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi log makanan dan asupan air harian
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = mealLogData[field.id]
                const displayValue = field.isBoolean ? (
                  value ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Ya</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span>Tidak</span>
                    </div>
                  )
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
                      {field.unit && !field.isBoolean && (
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

            {/* Tombol Simpan & Reset */}
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
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
        <MealLogDisplayContent />
      </main>
    </Layouts>
  )
}
