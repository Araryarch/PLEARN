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
import { AlertTriangle, FileText } from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

// TypeScript interfaces
interface AllergyData {
  allergy_name: string
  reaction: string
  mitigation_steps: string
}

interface FormField {
  id: keyof AllergyData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface ValidationErrors {
  [key: string]: string | null
}

// Validation schema
const allergySchema: Record<
  keyof AllergyData,
  (value: string) => string | null
> = {
  allergy_name: (value: string) => {
    if (!value) return 'Nama alergi harus diisi'
    return null
  },
  reaction: (value: string) => {
    if (!value) return 'Reaksi harus diisi'
    return null
  },
  mitigation_steps: (value: string) => {
    if (!value) return 'Langkah mitigasi harus diisi'
    return null
  },
}

function AllergyFormContent() {
  const [formData, setFormData] = useState<AllergyData>({
    allergy_name: 'Pollen',
    reaction: 'Sneezing and congestion',
    mitigation_steps: 'Take antihistamines during allergy season',
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleInputChange = (field: keyof AllergyData, value: string): void => {
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

    ;(Object.keys(allergySchema) as Array<keyof AllergyData>).forEach(
      (field) => {
        const error = allergySchema[field](formData[field])
        if (error) {
          newErrors[field] = error
        }
      },
    )

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
      // Placeholder for POST request to database
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
      console.log('Data to be sent to database:', formData)
      // Example: await fetch('/api/allergies', { method: 'POST', body: JSON.stringify(formData) })
      alert('Data alergi berhasil disimpan!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi kesalahan saat menyimpan data.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = (): void => {
    setFormData({
      allergy_name: '',
      reaction: '',
      mitigation_steps: '',
    })
    setErrors({})
  }

  const formFields: FormField[] = [
    {
      id: 'allergy_name',
      label: 'Nama Alergi',
      icon: AlertTriangle,
    },
    {
      id: 'reaction',
      label: 'Reaksi',
      icon: AlertTriangle,
    },
    {
      id: 'mitigation_steps',
      label: 'Langkah Mitigasi',
      icon: FileText,
    },
  ]

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Formulir Alergi
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Masukkan detail alergi pasien dengan lengkap dan akurat
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
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
                    </Label>
                    <div className="relative">
                      <Input
                        id={field.id}
                        type="text"
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
        <AllergyFormContent />
      </main>
    </Layouts>
  )
}
