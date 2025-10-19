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
import { Calendar, Droplets, FileText, TestTube } from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface BloodTestData {
  test_date: string
  test_name: string
  test_result: string
  description: string
}

interface DisplayField {
  id: keyof BloodTestData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function BloodTestDisplayContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bloodTestData: BloodTestData = {
    test_date: '2025-05-20',
    test_name: 'Blood Glucose Test',
    test_result: '95 mg/dL - Normal range',
    description: 'Fasting blood glucose test',
  }

  const displayFields: DisplayField[] = [
    {
      id: 'test_date',
      label: 'Tanggal Tes',
      icon: Calendar,
    },
    {
      id: 'test_name',
      label: 'Nama Tes',
      icon: TestTube,
    },
    {
      id: 'test_result',
      label: 'Hasil Tes',
      icon: Droplets,
    },
    {
      id: 'description',
      label: 'Deskripsi',
      icon: FileText,
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Data tes darah disubmit:', bloodTestData)
      alert('Data tes darah berhasil disimpan!')
    } catch (error) {
      alert('Gagal menyimpan data.' + String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    console.log('Reset form tes darah diklik')
    alert('Form tes darah telah direset.')
  }

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Hasil Tes Darah
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Informasi hasil tes darah pasien
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {displayFields.map((field) => {
                const IconComponent = field.icon
                const value = bloodTestData[field.id]

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
        <BloodTestDisplayContent />
      </main>
    </Layouts>
  )
}
