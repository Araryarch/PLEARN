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
  Pill,
  FileText,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface MedicationData {
  medication_name: string
  description: string
  dosage: string
  frequency: string
  start_date: string
  status: string
  possible_side_effect: string
}

interface DisplayField {
  id: keyof MedicationData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  isStatus?: boolean
}

function MedicationDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const medicationData: MedicationData = {
    medication_name: 'Multivitamin Complex',
    description: 'Daily multivitamin supplement for overall health',
    dosage: '1 tablet',
    frequency: 'Once daily with breakfast',
    start_date: '2025-01-01',
    status: 'active',
    possible_side_effect: 'May cause stomach upset if taken on empty stomach',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'medication_name',
      label: 'Nama Obat',
      icon: Pill,
    },
    {
      id: 'description',
      label: 'Deskripsi',
      icon: FileText,
    },
    {
      id: 'dosage',
      label: 'Dosis',
      icon: Pill,
    },
    {
      id: 'frequency',
      label: 'Frekuensi',
      icon: Pill,
    },
    {
      id: 'start_date',
      label: 'Tanggal Mulai',
      icon: Calendar,
    },
    {
      id: 'status',
      label: 'Status',
      icon: CheckCircle,
      isStatus: true,
    },
    {
      id: 'possible_side_effect',
      label: 'Efek Samping yang Mungkin',
      icon: AlertTriangle,
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Data obat disimpan:', medicationData)
      alert('Data obat berhasil disimpan!')
    } catch (error) {
      alert('Gagal menyimpan data.' + String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    console.log('Reset form obat diklik')
    alert('Form obat telah direset.')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Informasi Obat
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Detail penggunaan obat pasien
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = medicationData[field.id]
                const displayValue = field.isStatus ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>
                      {String(value).charAt(0).toUpperCase() +
                        String(value).slice(1)}
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
        <MedicationDisplayContent />
      </main>
    </Layouts>
  )
}
