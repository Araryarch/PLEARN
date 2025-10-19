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
import { Calendar, Syringe, FileText } from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface VaccinationData {
  vaccination_date: string
  vaccine_name: string
  notes: string
}

interface DisplayField {
  id: keyof VaccinationData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function VaccinationDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const vaccinationData: VaccinationData = {
    vaccination_date: '2025-02-15',
    vaccine_name: 'Influenza Vaccine',
    notes: 'Annual flu shot - seasonal vaccination',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'vaccination_date',
      label: 'Tanggal Vaksinasi',
      icon: Calendar,
    },
    {
      id: 'vaccine_name',
      label: 'Nama Vaksin',
      icon: Syringe,
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
      await new Promise((res) => setTimeout(res, 1000))
      console.log('Data vaksinasi disimpan:', vaccinationData)
      alert('Data vaksinasi berhasil disimpan!')
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan data.' + String(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    alert('Formulir vaksinasi telah direset.')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Log Vaksinasi
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi vaksinasi pasien
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = vaccinationData[field.id]
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
                      {value}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handleReset}
              >
                Reset Form
              </Button>
              <Button
                disabled={isSubmitting}
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
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
        <VaccinationDisplayContent />
      </main>
    </Layouts>
  )
}
