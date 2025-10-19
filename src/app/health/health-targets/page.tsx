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
import { Calendar, Target, Scale, CheckCircle, FileText } from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface GoalData {
  target_name: string
  target_type_id: number
  target_value: string
  description: string
  end_date: string
  status: string
}

interface DisplayField {
  id: keyof GoalData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  unit?: string
  isStatus?: boolean
}

function GoalDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goalData: GoalData = {
    target_name: 'Weight Loss Goal',
    target_type_id: 1,
    target_value: '70',
    description: 'Lose 5kg by end of year through diet and exercise',
    end_date: '2025-12-31',
    status: 'active',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'target_name',
      label: 'Nama Tujuan',
      icon: Target,
    },
    {
      id: 'target_type_id',
      label: 'ID Tipe Tujuan',
      icon: FileText,
    },
    {
      id: 'target_value',
      label: 'Nilai Tujuan',
      icon: Scale,
      unit: 'kg',
    },
    {
      id: 'description',
      label: 'Deskripsi',
      icon: FileText,
    },
    {
      id: 'end_date',
      label: 'Tanggal Berakhir',
      icon: Calendar,
    },
    {
      id: 'status',
      label: 'Status',
      icon: CheckCircle,
      isStatus: true,
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Data goal disubmit:', goalData)
      alert('Data tujuan berhasil disimpan!')
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan.' + String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    console.log('Form reset diklik')
    alert('Form tujuan direset.')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Tujuan Kesehatan
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi tujuan kesehatan pribadi
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = goalData[field.id]
                const displayValue = field.isStatus ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>
                      {String(value).charAt(0).toUpperCase() +
                        String(value).slice(1)}
                    </span>
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
                      {field.unit && !field.isStatus && (
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
        <GoalDisplayContent />
      </main>
    </Layouts>
  )
}
