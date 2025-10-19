'use client'

import React, { useState } from 'react'
import Layouts from '@/Layouts/Layouts'
import { Switch } from '@/components/ui/switch'

// Define the type for settings
interface Settings {
  darkMode: boolean
  notifications: boolean
  medicationReminders: boolean
  appointmentAlerts: boolean
  healthDataSync: boolean
  biometricLogin: boolean
  autoBackup: boolean
  emergencyContact: boolean
}

// Define the type for setting items
interface SettingItem {
  key: keyof Settings
  label: string
  description: string
}

// Define the type for settings groups
interface SettingsGroup {
  title: string
  description: string
  settings: SettingItem[]
}

export default function Page() {
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    notifications: true,
    medicationReminders: true,
    appointmentAlerts: true,
    healthDataSync: false,
    biometricLogin: true,
    autoBackup: true,
    emergencyContact: false,
  })

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const settingsGroups: SettingsGroup[] = [
    {
      title: 'Tampilan',
      description: 'Atur tampilan aplikasi sesuai preferensi Anda',
      settings: [
        {
          key: 'darkMode',
          label: 'Mode Gelap',
          description: 'Gunakan tema gelap untuk kenyamanan mata',
        },
      ],
    },
    {
      title: 'Notifikasi & Pengingat',
      description: 'Kelola notifikasi dan reminder kesehatan Anda',
      settings: [
        {
          key: 'notifications',
          label: 'Notifikasi Umum',
          description: 'Terima notifikasi dari aplikasi',
        },
        {
          key: 'medicationReminders',
          label: 'Pengingat Obat',
          description: 'Reminder untuk minum obat sesuai jadwal',
        },
        {
          key: 'appointmentAlerts',
          label: 'Alert Jadwal Dokter',
          description: 'Notifikasi untuk appointment dengan dokter',
        },
      ],
    },
    {
      title: 'Data & Privasi',
      description: 'Kontrol data kesehatan dan pengaturan privasi',
      settings: [
        {
          key: 'healthDataSync',
          label: 'Sinkronisasi Data Kesehatan',
          description: 'Sinkronkan dengan perangkat kesehatan lain',
        },
        {
          key: 'autoBackup',
          label: 'Backup Otomatis',
          description: 'Backup data kesehatan secara otomatis',
        },
      ],
    },
    {
      title: 'Keamanan',
      description: 'Pengaturan keamanan dan akses aplikasi',
      settings: [
        {
          key: 'biometricLogin',
          label: 'Login Biometrik',
          description: 'Gunakan sidik jari atau Face ID untuk login',
        },
        {
          key: 'emergencyContact',
          label: 'Kontak Darurat',
          description: 'Izinkan akses data untuk kontak darurat',
        },
      ],
    },
  ]

  return (
    <Layouts>
      <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 md:px-8 md:py-10">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="w-full bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200/70 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Pengaturan Aplikasi
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Kelola preferensi dan pengaturan aplikasi kesehatan Anda untuk
                pengalaman yang lebih personal.
              </p>
            </div>

            {/* Background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100/40 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/70 overflow-hidden"
            >
              {/* Group Header */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {group.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {group.description}
                </p>
              </div>

              {/* Settings Items */}
              <div className="divide-y divide-gray-100">
                {group.settings.map((setting) => (
                  <div
                    key={setting.key}
                    className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-gray-800 font-medium text-base md:text-lg group-hover:text-gray-900 transition-colors duration-300">
                            {setting.label}
                          </span>
                          {settings[setting.key] && (
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm md:text-base group-hover:text-gray-600 transition-colors duration-300">
                          {setting.description}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <Switch
                          checked={settings[setting.key]}
                          onCheckedChange={() => handleToggle(setting.key)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Actions */}
          <div className="w-full bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200/70">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Aksi Lainnya
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 p-4 rounded-xl border border-blue-200/50 hover:from-blue-100 hover:to-blue-150 hover:shadow-md transition-all duration-300 text-left group">
                <div className="font-medium group-hover:text-blue-800 transition-colors duration-300">
                  Export Data Kesehatan
                </div>
                <div className="text-sm text-blue-600 mt-1 group-hover:text-blue-700 transition-colors duration-300">
                  Unduh riwayat kesehatan Anda
                </div>
              </button>

              <button className="w-full bg-gradient-to-r from-green-50 to-green-100 text-green-700 p-4 rounded-xl border border-green-200/50 hover:from-green-100 hover:to-green-150 hover:shadow-md transition-all duration-300 text-left group">
                <div className="font-medium group-hover:text-green-800 transition-colors duration-300">
                  Hubungi Support
                </div>
                <div className="text-sm text-green-600 mt-1 group-hover:text-green-700 transition-colors duration-300">
                  Bantuan dan dukungan teknis
                </div>
              </button>

              <button className="w-full bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 p-4 rounded-xl border border-amber-200/50 hover:from-amber-100 hover:to-amber-150 hover:shadow-md transition-all duration-300 text-left group">
                <div className="font-medium group-hover:text-amber-800 transition-colors duration-300">
                  Reset Pengaturan
                </div>
                <div className="text-sm text-amber-600 mt-1 group-hover:text-amber-700 transition-colors duration-300">
                  Kembalikan ke pengaturan default
                </div>
              </button>

              <button className="w-full bg-gradient-to-r from-red-50 to-red-100 text-red-700 p-4 rounded-xl border border-red-200/50 hover:from-red-100 hover:to-red-150 hover:shadow-md transition-all duration-300 text-left group">
                <div className="font-medium group-hover:text-red-800 transition-colors duration-300">
                  Hapus Akun
                </div>
                <div className="text-sm text-red-600 mt-1 group-hover:text-red-700 transition-colors duration-300">
                  Hapus permanen data dan akun
                </div>
              </button>
            </div>
          </div>

          {/* Breathing space */}
          <div className="h-8"></div>
        </div>
      </main>
    </Layouts>
  )
}
