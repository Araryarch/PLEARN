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
  Clock,
  User,
  Stethoscope,
  MapPin,
  CheckCircle,
} from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

// TypeScript interfaces
interface AppointmentData {
  appointment_date: string
  appointment_time: string
  doctor_name: string
  purpose: string
  location: string
  status: string
}

interface FormField {
  id: keyof AppointmentData
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  type: string
}

interface ValidationErrors {
  [key: string]: string | null
}

// Validation schema
const appointmentSchema: Record<
  keyof AppointmentData,
  (value: string) => string | null
> = {
  appointment_date: (value: string) => {
    if (!value) return 'Tanggal janji temu harus diisi'
    return null
  },
  appointment_time: (value: string) => {
    if (!value) return 'Waktu janji temu harus diisi'
    return null
  },
  doctor_name: (value: string) => {
    if (!value) return 'Nama dokter harus diisi'
    return null
  },
  purpose: (value: string) => {
    if (!value) return 'Tujuan janji temu harus diisi'
    return null
  },
  location: (value: string) => {
    if (!value) return 'Lokasi harus diisi'
    return null
  },
  status: (value: string) => {
    if (!value) return 'Status harus diisi'
    const validStatuses = ['Scheduled', 'Completed', 'Cancelled']
    if (!validStatuses.includes(value))
      return 'Status harus Scheduled, Completed, atau Cancelled'
    return null
  },
}

function AppointmentFormContent() {
  const [formData, setFormData] = useState<AppointmentData>({
    appointment_date: '2025-07-15',
    appointment_time: '14:30:00',
    doctor_name: 'Dr. Sarah Johnson, MD',
    purpose: 'Annual physical examination',
    location: 'Wellness Medical Center, Suite 201',
    status: 'Scheduled',
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleInputChange = (
    field: keyof AppointmentData,
    value: string,
  ): void => {
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

    ;(Object.keys(appointmentSchema) as Array<keyof AppointmentData>).forEach(
      (field) => {
        const error = appointmentSchema[field](formData[field])
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
      // Example: await fetch('/api/appointments', { method: 'POST', body: JSON.stringify(formData) })
      alert('Data janji temu berhasil disimpan!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi kesalahan saat menyimpan data.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = (): void => {
    setFormData({
      appointment_date: '',
      appointment_time: '',
      doctor_name: '',
      purpose: '',
      location: '',
      status: '',
    })
    setErrors({})
  }

  const formFields: FormField[] = [
    {
      id: 'appointment_date',
      label: 'Tanggal Janji Temu',
      icon: Calendar,
      type: 'date',
    },
    {
      id: 'appointment_time',
      label: 'Waktu Janji Temu',
      icon: Clock,
      type: 'time',
    },
    {
      id: 'doctor_name',
      label: 'Nama Dokter',
      icon: User,
      type: 'text',
    },
    {
      id: 'purpose',
      label: 'Tujuan Janji Temu',
      icon: Stethoscope,
      type: 'text',
    },
    {
      id: 'location',
      label: 'Lokasi',
      icon: MapPin,
      type: 'text',
    },
    {
      id: 'status',
      label: 'Status',
      icon: CheckCircle,
      type: 'text',
    },
  ]

  return (
    <div className="w-full bg-gray-50 p-4 flex items-start justify-center min-h-screen">
      <Card className="w-full shadow-lg border-0 bg-white">
        <CardHeader className="text-center border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Formulir Janji Temu Kesehatan
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Masukkan detail janji temu kesehatan pasien dengan lengkap dan
            akurat
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
                        type={field.type}
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
        <AppointmentFormContent />
      </main>
    </Layouts>
  )
}
