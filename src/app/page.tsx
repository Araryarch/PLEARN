'use client'

import Typography from '@/components/Typography'
import { Button } from '@/components/ui/button'
import Layouts from '@/Layouts/Layouts'
import { ExtendedSession } from '@/lib/authOptions'
import { Tag, Clock, ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseISOToString } from '@/lib/dateParser'

interface Task {
  id: number
  title: string
  desc: string
  category: string
  prioritas: 'high' | 'medium' | 'low'
  deadline: string
  status: 'Aktif' | 'Selesai'
}

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const extended = session as ExtendedSession

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  useEffect(() => {
    if (!extended?.user?.id) return
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/todo?userId=${extended.user.id}`)
        if (!res.ok) throw new Error('Gagal fetch tugas')
        const data: Task[] = await res.json()
        setTasks(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [extended?.user?.id])

  const getPriorityColor = (prioritas: string) => {
    switch (prioritas) {
      case 'high':
        return 'bg-[#f38ba8]/10 text-[#f38ba8]'
      case 'medium':
        return 'bg-[#f9e2af]/10 text-[#f9e2af]'
      case 'low':
        return 'bg-[#a6e3a1]/10 text-[#a6adc8]'
      default:
        return 'bg-[#313244] text-[#a6adc8]'
    }
  }

  const getPriorityLabel = (prioritas: string) => {
    switch (prioritas) {
      case 'high':
        return 'Tinggi'
      case 'medium':
        return 'Sedang'
      case 'low':
        return 'Rendah'
      default:
        return prioritas
    }
  }

  // Skeleton Loading Component
  const SkeletonLoading = () => (
    <div className="min-h-screen h-screen w-full bg-[#1e1e2e] p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Greeting Skeleton */}
      <div className="h-6 bg-[#313244] rounded animate-pulse"></div>

      {/* Main Card Skeleton */}
      <div className="w-full h-fit bg-[#181825] border-1 border-[#313244] py-5 rounded-xl flex flex-col gap-2 relative shadow-lg">
        <div className="h-20 bg-[#313244] rounded animate-pulse absolute bottom-0 right-0 w-20"></div>
        <div className="h-1/2 w-full flex justify-start items-center px-5">
          <div className="h-4 bg-[#313244] rounded animate-pulse w-3/4"></div>
        </div>
        <div className="h-1/2 w-fit flex px-5 gap-10 justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-12 bg-[#313244] rounded animate-pulse"></div>
            <div className="h-3 w-8 bg-[#313244] rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Agenda Header Skeleton */}
      <div className="w-full h-fit flex justify-between">
        <div className="h-4 bg-[#313244] rounded animate-pulse w-20"></div>
        <div className="h-4 bg-[#313244] rounded animate-pulse w-24"></div>
      </div>

      {/* Tasks List Skeleton */}
      <div className="w-full flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-[#181825] p-4 shadow-sm border-[#313244] animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="h-5 bg-[#313244] rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-[#313244] rounded mb-2 w-full"></div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-6 w-16 bg-[#313244] rounded"></div>
                  <div className="h-6 w-20 bg-[#313244] rounded"></div>
                  <div className="h-6 w-24 bg-[#313244] rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (status === 'loading' || loading)
    return (
      <Layouts>
        <SkeletonLoading />
      </Layouts>
    )
  if (!session) return null

  const activeTasks = tasks.filter((t) => t.status !== 'Selesai')
  const activeCount = activeTasks.length

  const hour = new Date().getHours()
  let greeting = 'Selamat Malam'
  if (hour >= 4 && hour < 11) greeting = 'Selamat Pagi'
  else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang'
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore'

  return (
    <Layouts>
      <div className="min-h-screen h-screen w-full bg-[#1e1e2e] p-6 flex flex-col gap-6 overflow-y-auto">
        <Typography className="text-[#cdd6f4] text-xl" weight="bold">
          {greeting}, {extended.user.username}!
        </Typography>

        <div className="w-full h-fit bg-[#181825] border-1 border-[#313244] py-5 rounded-xl flex flex-col gap-2 relative shadow-lg">
          <Image
            src={'/images/raiden-chibi.png'}
            alt="raiden"
            width={90}
            height={120}
            className="absolute bottom-0 right-0 opacity-80"
          />
          <div className="h-1/2 w-full flex justify-start items-center px-5">
            <Typography className="text-[#cdd6f4]">
              Semangat!, Yuk Selesaikan Semua Agenda!
            </Typography>
          </div>
          <div className="h-1/2 w-fit flex px-5 gap-10 justify-between items-center">
            <div className="flex flex-col items-center">
              <Typography className="text-2xl text-[#89b4fa]" weight="bold">
                {activeCount}/{tasks.length}
              </Typography>
              <Typography className="text-xs text-[#a6adc8]">Tugas</Typography>
            </div>
          </div>
        </div>

        <div className="w-full h-fit flex justify-between">
          <div>
            <Typography className="text-[#cdd6f4]">Agenda</Typography>
          </div>
          <Link
            href={'/todo'}
            className="text-[#89b4fa] flex items-center gap-2 text-xs hover:text-[#b4befe] transition-colors"
          >
            Lihat Semua <ArrowRight size={15} />
          </Link>
        </div>

        <div className="w-full flex flex-col gap-3 ">
          {activeCount === 0 ? (
            <Typography className="text-xs text-[#a6adc8] text-center bg-[#181825] py-4 rounded-md">
              <b className="text-base text-[#cdd6f4]">Tidak ada tugas</b> <br />
              Semua tugas sudah selesai 🎉
            </Typography>
          ) : (
            activeTasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-xl border bg-[#181825] p-4 shadow-sm transition-all hover:shadow-md border-[#313244]`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 text-[#cdd6f4]">
                      {task.title}
                    </h3>
                    <p className="text-xs text-[#a6adc8] mb-2">{task.desc}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium ${getPriorityColor(
                          task.prioritas,
                        )}`}
                      >
                        {getPriorityLabel(task.prioritas)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#a6adc8]">
                        <Tag className="h-3 w-3" /> {task.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#a6adc8]">
                        <Clock className="h-3 w-3" />{' '}
                        {parseISOToString(task.deadline)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {activeCount === 0 && (
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
              <Button
                className="bg-[#89b4fa] hover:bg-[#b4befe] text-[#1e1e2e] cursor-pointer transition-colors"
                onClick={() => router.push('/todo')}
              >
                Catat Sekarang
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layouts>
  )
}
