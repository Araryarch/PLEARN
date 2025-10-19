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
import { Calendar, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layouts from '@/Layouts/Layouts'

interface DiagnosisData {
  disease_name: string
  diagnosis_date: string
  severity: string
  notes: string
}

interface DisplayField {
  id: keyof DiagnosisData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function DiagnosisDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const diagnosisData: DiagnosisData = {
    disease_name: 'Hypertension',
    diagnosis_date: '2024-12-01',
    severity: 'Mild',
    notes: 'Stage 1 hypertension, managing with lifestyle changes',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'disease_name',
      label: 'Nama Penyakit',
      icon: AlertCircle,
    },
    {
      id: 'diagnosis_date',
      label: 'Tanggal Diagnosa',
      icon: Calendar,
    },
    {
      id: 'severity',
      label: 'Tingkat Keparahan',
      icon: AlertCircle,
    },
    {
      id: 'notes',
      label: 'Catatan',
      icon: AlertCircle,
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((res) => setTimeout(res, 1000))
      console.log('Data diagnosa disubmit:', diagnosisData)
      alert('Data diagnosa berhasil disimpan!')
    } catch (err) {
      alert('Gagal menyimpan data diagnosa.' + String(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    console.log('Reset form diklik')
    alert('Form diagnosa direset')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Data Diagnosa Kesehatan
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi diagnosa kesehatan pasien
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                return (
                  <div key={field.id} className="space-y-2">
                    <Label
                      htmlFor={field.id}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500" />
                      {field.label}
                    </Label>
                    <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                      {diagnosisData[field.id]}
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
        <DiagnosisDisplayContent />
      </main>
    </Layouts>
  )
}
