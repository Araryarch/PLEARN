import Typography from '@/components/Typography'
import Layouts from '@/Layouts/Layouts'
import { ArrowRight, CheckCircle, Calendar } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <Layouts>
      <div className="min-h-screen w-full bg-[#1e1e2e] p-6 flex flex-col gap-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <Typography
            className="text-[#cdd6f4] text-2xl"
            weight="bold"
            variant="h1"
          >
            Selamat Malam, AKA!
          </Typography>
          <Typography className="text-[#a6adc8] text-base" weight="light">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </Typography>
        </div>

        {/* Main Progress */}
        <div className="bg-[#313244] rounded-lg p-6">
          <Typography
            as={'h2'}
            className="text-xl text-[#cdd6f4] mb-4"
            weight="semibold"
          >
            Semangat Yuk Selesaikan Agenda Pertamamu Hari Ini
          </Typography>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#45475a] rounded-md p-4 text-center">
              <Typography className="text-4xl text-[#cdd6f4]" weight="bold">
                0/0
              </Typography>
              <Typography
                className="text-sm text-[#bac2de] mt-1"
                weight="medium"
              >
                Tugas
              </Typography>
            </div>
            <div className="bg-[#45475a] rounded-md p-4 text-center">
              <Typography className="text-4xl text-[#cdd6f4]" weight="bold">
                0/0
              </Typography>
              <Typography
                className="text-sm text-[#bac2de] mt-1"
                weight="medium"
              >
                Kegiatan
              </Typography>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex justify-between items-center">
          <Typography className="text-[#cdd6f4] text-lg" weight="semibold">
            Agenda Hari Ini
          </Typography>
          <button className="text-[#89b4fa] flex items-center gap-1 text-sm hover:gap-2 transition-all">
            Lihat Semua <ArrowRight size={16} />
          </button>
        </div>

        {/* Priority */}
        <div className="bg-[#313244] rounded-lg p-6 flex flex-col items-center text-center hover:bg-[#3b3d52] transition-colors cursor-pointer">
          <CheckCircle size={24} className="text-[#a6e3a1] mb-2" />
          <Typography weight="semibold" className="text-lg text-[#cdd6f4] mb-1">
            Tidak Ada Agenda Prioritas Tinggi
          </Typography>
          <Typography className="text-sm text-[#a6adc8]" weight="light">
            Semua tugas dan kegiatan sudah selesai!
          </Typography>
        </div>

        {/* Activity Log */}
        <div className="bg-[#313244] rounded-lg p-6 flex flex-col items-center text-center hover:bg-[#3b3d52] transition-colors cursor-pointer">
          <Calendar size={24} className="text-[#f9e2af] mb-2" />
          <Typography weight="semibold" className="text-lg text-[#cdd6f4] mb-1">
            Bagaimana Hari Ini?
          </Typography>
          <Typography className="text-sm text-[#a6adc8]" weight="light">
            Catat kegiatanmu sekarang
          </Typography>
        </div>
      </div>
    </Layouts>
  )
}
