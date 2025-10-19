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
import { Calendar, FileText, AlertTriangle } from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface SymptomLogData {
  symptom_description: string
  symptom_date: string
  severity_level: string
  mitigation_steps: string
}

interface DisplayField {
  id: keyof SymptomLogData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  unit?: string
  isSeverity?: boolean
}

function SymptomLogDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const symptomLogData: SymptomLogData = {
    symptom_description: 'Tension headache, started after long work session',
    symptom_date: '2025-06-14',
    severity_level: '3',
    mitigation_steps: 'Rest, hydration, and over-the-counter pain relief',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'symptom_description',
      label: 'Deskripsi Gejala',
      icon: FileText,
    },
    {
      id: 'symptom_date',
      label: 'Tanggal Gejala',
      icon: Calendar,
    },
    {
      id: 'severity_level',
      label: 'Tingkat Keparahan',
      icon: AlertTriangle,
      unit: '/10',
      isSeverity: true,
    },
    {
      id: 'mitigation_steps',
      label: 'Langkah Mitigasi',
      icon: FileText,
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Log gejala disimpan:', symptomLogData)
      alert('Log gejala berhasil disimpan!')
    } catch (err) {
      alert('Gagal menyimpan log gejala.' + String(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    alert('Form log gejala telah direset.')
    console.log('Reset form gejala diklik')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Log Gejala
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi gejala kesehatan yang dialami
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = symptomLogData[field.id]
                const displayValue = field.isSeverity ? (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span>
                      {value}
                      {field.unit}
                    </span>
                  </div>
                ) : (
                  value
                )

                return (
                  <div key={field.id} className="space-y-2">
                    <Label
                      htmlFor={field.id}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500" />
                      {field.label}
                      {field.unit && field.isSeverity && (
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

            {/* Tombol Aksi */}
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
        <SymptomLogDisplayContent />
      </main>
    </Layouts>
  )
}
