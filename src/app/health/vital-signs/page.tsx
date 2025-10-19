'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Calendar,
  Heart,
  Thermometer,
  Droplets,
  Scale,
  Activity,
} from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

// TypeScript interfaces
interface HealthData {
  measurement_date: string
  blood_pressure_systolic: string
  blood_pressure_diastolic: string
  pulse_rate: string
  body_temperature: string
  blood_glucose: string
  heart_rate: string
  weight_kg: string
  cholesterol_level: string
  uric_acid: string
}

interface FormField {
  id: keyof HealthData
  label: string
  type: string
  step?: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  unit: string
}

interface ValidationErrors {
  [key: string]: string | null
}

// Validation schema
const healthSchema: Record<keyof HealthData, (value: string) => string | null> =
  {
    measurement_date: (value: string) => {
      if (!value) return 'Tanggal harus diisi'
      return null
    },
    blood_pressure_systolic: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Sistolik harus berupa angka'
      if (num < 70 || num > 200) return 'Sistolik harus antara 70-200 mmHg'
      return null
    },
    blood_pressure_diastolic: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Diastolik harus berupa angka'
      if (num < 40 || num > 120) return 'Diastolik harus antara 40-120 mmHg'
      return null
    },
    pulse_rate: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Denyut nadi harus berupa angka'
      if (num < 40 || num > 150) return 'Denyut nadi harus antara 40-150 bpm'
      return null
    },
    body_temperature: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Suhu tubuh harus berupa angka'
      if (num < 35 || num > 42) return 'Suhu tubuh harus antara 35-42°C'
      return null
    },
    blood_glucose: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Gula darah harus berupa angka'
      if (num < 50 || num > 400) return 'Gula darah harus antara 50-400 mg/dL'
      return null
    },
    heart_rate: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Detak jantung harus berupa angka'
      if (num < 40 || num > 150) return 'Detak jantung harus antara 40-150 bpm'
      return null
    },
    weight_kg: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Berat badan harus berupa angka'
      if (num < 20 || num > 300) return 'Berat badan harus antara 20-300 kg'
      return null
    },
    cholesterol_level: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Kolesterol harus berupa angka'
      if (num < 100 || num > 400) return 'Kolesterol harus antara 100-400 mg/dL'
      return null
    },
    uric_acid: (value: string) => {
      const num = Number(value)
      if (!value || isNaN(num)) return 'Asam urat harus berupa angka'
      if (num < 2 || num > 12) return 'Asam urat harus antara 2-12 mg/dL'
      return null
    },
  }

function HealthFormContent() {
  const [formData, setFormData] = useState<HealthData>({
    measurement_date: '',
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    pulse_rate: '',
    body_temperature: '',
    blood_glucose: '',
    heart_rate: '',
    weight_kg: '',
    cholesterol_level: '',
    uric_acid: '',
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleInputChange = (field: keyof HealthData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    ;(Object.keys(healthSchema) as Array<keyof HealthData>).forEach((field) => {
      const error = healthSchema[field](formData[field])
      if (error) {
        newErrors[field] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Data submitted:', formData)
      alert('Data kesehatan berhasil disimpan!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi kesalahan saat menyimpan data.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = (): void => {
    setFormData({
      measurement_date: '',
      blood_pressure_systolic: '',
      blood_pressure_diastolic: '',
      pulse_rate: '',
      body_temperature: '',
      blood_glucose: '',
      heart_rate: '',
      weight_kg: '',
      cholesterol_level: '',
      uric_acid: '',
    })
    setErrors({})
  }

  const formFields: FormField[] = [
    {
      id: 'measurement_date',
      label: 'Tanggal Pengukuran',
      type: 'datetime-local',
      icon: Calendar,
      unit: '',
    },
    {
      id: 'blood_pressure_systolic',
      label: 'Tekanan Darah Sistolik',
      type: 'number',
      icon: Heart,
      unit: 'mmHg',
    },
    {
      id: 'blood_pressure_diastolic',
      label: 'Tekanan Darah Diastolik',
      type: 'number',
      icon: Heart,
      unit: 'mmHg',
    },
    {
      id: 'pulse_rate',
      label: 'Denyut Nadi',
      type: 'number',
      icon: Activity,
      unit: 'bpm',
    },
    {
      id: 'body_temperature',
      label: 'Suhu Tubuh',
      type: 'number',
      step: '0.1',
      icon: Thermometer,
      unit: '°C',
    },
    {
      id: 'blood_glucose',
      label: 'Gula Darah',
      type: 'number',
      icon: Droplets,
      unit: 'mg/dL',
    },
    {
      id: 'heart_rate',
      label: 'Detak Jantung',
      type: 'number',
      icon: Heart,
      unit: 'bpm',
    },
    {
      id: 'weight_kg',
      label: 'Berat Badan',
      type: 'number',
      step: '0.1',
      icon: Scale,
      unit: 'kg',
    },
    {
      id: 'cholesterol_level',
      label: 'Kadar Kolesterol',
      type: 'number',
      icon: Droplets,
      unit: 'mg/dL',
    },
    {
      id: 'uric_acid',
      label: 'Asam Urat',
      type: 'number',
      step: '0.1',
      icon: Droplets,
      unit: 'mg/dL',
    },
  ]

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Data Kesehatan
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Masukkan data pengukuran kesehatan Anda dengan lengkap dan akurat
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field) => {
                const IconComponent = field.icon
                return (
                  <div key={field.id} className="space-y-2">
                    <Label
                      htmlFor={field.id}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500" />
                      {field.label}
                      {field.unit && (
                        <span className="text-xs text-gray-400">
                          ({field.unit})
                        </span>
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id={field.id}
                        type={field.type}
                        step={field.step}
                        value={formData[field.id]}
                        onChange={(e) =>
                          handleInputChange(field.id, e.target.value)
                        }
                        className={`w-full transition-colors ${
                          errors[field.id]
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-gray-500 focus:ring-gray-200'
                        }`}
                        placeholder={`Masukkan ${field.label.toLowerCase()}`}
                      />
                      {field.unit && field.type === 'number' && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                          {field.unit}
                        </div>
                      )}
                    </div>
                    {errors[field.id] && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

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
        <HealthFormContent />
      </main>
    </Layouts>
  )
}
