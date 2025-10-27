import Typography from '@/components/Typography'
import { Button } from '@/components/ui/button'
import Layouts from '@/Layouts/Layouts'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  // ambil waktu sekarang buat greeting
  const hour = new Date().getHours()
  let greeting = 'Selamat Malam'
  if (hour >= 4 && hour < 11) greeting = 'Selamat Pagi'
  else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang'
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore'

  return (
    <Layouts>
      <div className="min-h-screen h-screen w-full bg-[#1e1e2e] p-6 flex flex-col gap-6 overflow-y-auto">
        {/* ucapan */}
        <Typography className="text-[#cdd6f4] text-xl" weight="bold">
          {greeting}, Ararya!
        </Typography>

        {/* headers */}
        <div className="w-full h-fit bg-[#313244] py-5 rounded-xl flex flex-col gap-2 relative shadow-lg">
          <Image
            src={'/images/raiden-chibi.png'}
            alt="raiden"
            width={90}
            height={120}
            className="absolute bottom-0 right-0 opacity-80"
          />
          <div className="h-1/2 w-full flex justify-center items-center px-5">
            <Typography className="text-[#cdd6f4]">
              Semangat!, Yuk Selesaikan Agenda Harian Pertamamu Hari ini!
            </Typography>
          </div>
          <div className="h-1/2 w-[55%] flex px-5 gap-5 justify-between items-center">
            <div className="flex flex-col items-center">
              <Typography className="text-2xl text-[#89b4fa]" weight="bold">
                0/0
              </Typography>
              <Typography className="text-xs text-[#a6adc8]">Tugas</Typography>
            </div>
            <div className="flex flex-col items-center">
              <Typography className="text-2xl text-[#f9e2af]" weight="bold">
                0/0
              </Typography>
              <Typography className="text-xs text-[#a6adc8]">
                Kegiatan
              </Typography>
            </div>
          </div>
        </div>

        {/* header - activity */}
        <div className="w-full h-fit flex justify-between">
          <div>
            <Typography className="text-[#cdd6f4]">Agenda Hari Ini</Typography>
          </div>
          <Link
            href={'/'}
            className="text-[#89b4fa] flex items-center gap-2 text-xs hover:text-[#b4befe] transition-colors"
          >
            Lihat Semua <ArrowRight size={15} />
          </Link>
        </div>

        {/* block */}
        <div className="w-full h-[10%] bg-[#45475a] rounded-md shadow-xl flex justify-center items-center text-center">
          <Typography className="text-xs text-[#a6adc8]">
            <b className="text-base text-[#cdd6f4]">
              Tidak Ada Agenda Hari Ini
            </b>{' '}
            <br />
            Semua Tugas dan Kegiatan Sudah Selesai 🎉
          </Typography>
        </div>

        {/* card bawah */}
        <div className="w-full h-fit py-5 bg-[#313244] rounded-xl flex flex-col gap-2 relative shadow-lg">
          <Image
            src={'/images/raiden-chibi.png'}
            alt="raiden"
            width={90}
            height={60}
            className="absolute right-0 bottom-0 opacity-80"
          />
          <div className="h-1/2 w-full flex gap-2 px-5">
            <div className="flex flex-col items-start justify-center h-full w-full">
              <Typography weight="bold" className="text-[#cdd6f4]">
                Bagaimana Hari Ini?
              </Typography>
              <Typography className="text-sm text-[#a6adc8]">
                Catat Kegaiatanmu dan Rencanakan Kegaiatanmu Sekarang!
              </Typography>
            </div>
          </div>
          <div className="h-1/2 w-full flex justify-start items-center px-5">
            <Button className="bg-[#89b4fa] hover:bg-[#b4befe] text-[#1e1e2e] cursor-pointer transition-colors">
              Catat Sekarang <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </Layouts>
  )
}
