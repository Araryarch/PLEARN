'use client'

import Typography from '@/components/Typography'
import { Button } from '@/components/ui/button'
import Layouts from '@/Layouts/Layouts'
import { ExtendedSession } from '@/lib/authOptions'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  if (status === 'loading') return <p></p>
  if (!session) return null

  const extended = session as ExtendedSession

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
          {greeting}, {extended.user.username}!
        </Typography>

        {/* headers */}
        <div className="w-full h-fit bg-[#181825] py-5 rounded-xl flex flex-col gap-2 relative shadow-lg">
          <Image
            src={'/images/raiden-chibi.png'}
            alt="raiden"
            width={90}
            height={120}
            className="absolute bottom-0 right-0 opacity-80"
          />
          <div className="h-1/2 w-full flex justify-start items-center px-5">
            <Typography className="text-[#cdd6f4]">
              Semangat!, Yuk Selesaikan Agenda Harian Pertamamu Hari ini!
            </Typography>
          </div>
          <div className="h-1/2 w-fit flex px-5 gap-10 justify-between items-center">
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

        <div className="w-full h-[10%] bg-[#181825] rounded-md shadow-xl flex justify-center items-center text-center">
          <Typography className="text-xs text-[#a6adc8]">
            <b className="text-base text-[#cdd6f4]">
              Tidak Ada Agenda Hari Ini
            </b>{' '}
            <br />
            Semua Tugas dan Kegiatan Sudah Selesai 🎉
          </Typography>
        </div>

        <div className="w-full h-fit py-5 bg-[#181825] rounded-xl flex flex-col gap-2 relative shadow-lg">
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
