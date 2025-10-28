'use client'
import Layouts from '@/Layouts/Layouts'
import Typography from '@/components/Typography'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <Layouts>
      <div className="min-h-screen w-full bg-[#1e1e2e] text-[#cdd6f4] flex flex-col gap-4 p-4 pb-16">
        {/* Profile Header */}
        <div className="bg-[#313244] rounded-xl p-4 flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-[#89b4fa] flex items-center justify-center text-[#1e1e2e]">
            <User size={40} />
          </div>
          <div className="text-center">
            <Typography className="text-[#cdd6f4] text-lg font-semibold">
              Ararya
            </Typography>
            <Typography className="text-[#a6adc8] text-xs">
              @ararya_dev
            </Typography>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <Typography className="text-[#cdd6f4] mb-3 font-semibold">
            Pencapaian
          </Typography>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: 'Tugas',
                value: '24',
                icon: '📘',
                color: 'from-[#89b4fa] to-[#74c7ec]',
              },
              {
                label: 'Poin',
                value: '156',
                icon: '⚡',
                color: 'from-[#89b4fa] to-[#74c7ec]',
              },
              {
                label: 'Hari',
                value: '12',
                icon: '⏰',
                color: 'from-[#89b4fa] to-[#74c7ec]',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${item.color} rounded-xl p-[1px]`}
              >
                <div className="bg-[#313244] rounded-xl flex flex-col items-center justify-center py-3">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <Typography className="text-[#cdd6f4] text-lg font-bold leading-none">
                    {item.value}
                  </Typography>
                  <Typography className="text-[#a6adc8] text-xs">
                    {item.label}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <Typography className="text-[#cdd6f4] mb-2 font-semibold">
            Informasi Pribadi
          </Typography>
          <div className="bg-[#313244] rounded-xl divide-y divide-[#45475a]">
            {[
              {
                icon: <Mail size={18} className="text-[#89b4fa]" />,
                title: 'Email',
                value: 'ararya@example.com',
              },
              {
                icon: <Phone size={18} className="text-[#89b4fa]" />,
                title: 'Telepon',
                value: '+62 812 3456 7890',
              },
              {
                icon: <Calendar size={18} className="text-[#89b4fa]" />,
                title: 'Bergabung',
                value: '15 Januari 2024',
              },
            ].map((info, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                {info.icon}
                <div className="flex flex-col">
                  <Typography className="text-[#a6adc8] text-xs">
                    {info.title}
                  </Typography>
                  <Typography className="text-[#cdd6f4] text-sm">
                    {info.value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          <Typography className="text-[#cdd6f4] mb-2 font-semibold">
            Pengaturan
          </Typography>
          <div className="bg-[#313244] rounded-xl divide-y divide-[#45475a]">
            <Link
              href="/settings"
              className="flex items-center justify-between p-3 hover:bg-[#45475a] transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-[#cdd6f4]" />
                <Typography className="text-[#cdd6f4] text-sm">
                  Pengaturan Akun
                </Typography>
              </div>
              <ChevronRight size={18} className="text-[#a6adc8]" />
            </Link>
            <button className="w-full flex items-center justify-between p-3 hover:bg-[#45475a] transition-colors duration-200">
              <div className="flex items-center gap-3">
                <LogOut size={18} className="text-[#f38ba8]" />
                <Typography className="text-[#f38ba8] text-sm">
                  Keluar
                </Typography>
              </div>
              <ChevronRight size={18} className="text-[#a6adc8]" />
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="mt-auto text-center">
          <Typography className="text-[#a6adc8] text-xs">
            PLEARN v1.0.0
          </Typography>
        </div>
      </div>
    </Layouts>
  )
}
