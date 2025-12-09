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
        return 'bg-white/10 text-white border border-white/20'
      case 'medium':
        return 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50'
      case 'low':
        return 'bg-zinc-900/50 text-zinc-500 border border-zinc-800/50'
      default:
        return 'bg-zinc-900 text-zinc-500'
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
    <div className="min-h-screen h-screen w-full bg-black p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Greeting Skeleton */}
      <div className="h-6 bg-zinc-900 rounded animate-pulse w-48"></div>

      {/* Main Card Skeleton */}
      <div className="w-full h-fit bg-zinc-950 border border-zinc-900 py-5 rounded-xl flex flex-col gap-2 relative shadow-lg">
        <div className="h-20 bg-zinc-900 rounded animate-pulse absolute bottom-0 right-0 w-20"></div>
        <div className="h-1/2 w-full flex justify-start items-center px-5">
          <div className="h-4 bg-zinc-900 rounded animate-pulse w-3/4"></div>
        </div>
        <div className="h-1/2 w-fit flex px-5 gap-10 justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-12 bg-zinc-900 rounded animate-pulse"></div>
            <div className="h-3 w-8 bg-zinc-900 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Agenda Header Skeleton */}
      <div className="w-full h-fit flex justify-between">
        <div className="h-4 bg-zinc-900 rounded animate-pulse w-20"></div>
        <div className="h-4 bg-zinc-900 rounded animate-pulse w-24"></div>
      </div>

      {/* Tasks List Skeleton */}
      <div className="w-full flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-zinc-950 p-4 shadow-sm border-zinc-900 animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="h-5 bg-zinc-900 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-zinc-900 rounded mb-2 w-full"></div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-6 w-16 bg-zinc-900 rounded"></div>
                  <div className="h-6 w-20 bg-zinc-900 rounded"></div>
                  <div className="h-6 w-24 bg-zinc-900 rounded"></div>
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
      <div className="min-h-screen h-screen w-full bg-black p-6 flex flex-col gap-8 overflow-y-auto">
        <Typography
          className="text-white text-2xl tracking-tight"
          weight="bold"
        >
          {greeting}, {extended.user.username}!
        </Typography>

        <div className="w-full h-fit bg-zinc-950 border border-zinc-900 py-6 rounded-2xl flex flex-col gap-4 relative shadow-sm hover:border-zinc-800 transition-colors">
          <Image
            src={'/images/raiden-chibi.png'}
            alt="raiden"
            width={100}
            height={100}
            className="absolute bottom-0 right-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="w-full flex justify-start items-center px-6">
            <Typography className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
              YOUR PROGRESS
            </Typography>
          </div>
          <div className="w-fit flex px-6 gap-10 justify-between items-center z-10">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-baseline gap-2">
                <Typography className="text-4xl text-white" weight="bold">
                  {activeCount}
                </Typography>
                <Typography className="text-sm text-zinc-500">
                  /{tasks.length}
                </Typography>
              </div>
              <Typography className="text-sm text-zinc-400">
                Tugas aktif tersisa
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-full h-fit flex justify-between items-center">
            <Typography className="text-white font-semibold">Agenda</Typography>
            <Link
              href={'/todo'}
              className="text-zinc-500 flex items-center gap-2 text-xs hover:text-white transition-colors"
            >
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>

          <div className="w-full flex flex-col gap-3">
            {activeCount === 0 ? (
              <div className="text-center bg-zinc-950 border border-zinc-900 border-dashed py-8 rounded-xl flex flex-col items-center gap-2">
                <span className="text-2xl">🎉</span>
                <p className="text-zinc-300 font-medium">Tidak ada tugas</p>
                <p className="text-xs text-zinc-600">
                  Semua tugas sudah selesai. Great job!
                </p>
              </div>
            ) : (
              activeTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl border bg-zinc-950 p-5 shadow-sm transition-all hover:bg-zinc-900/50 border-zinc-900 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1 text-zinc-200 group-hover:text-white transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-xs text-zinc-500 mb-3 line-clamp-2">
                        {task.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${getPriorityColor(
                            task.prioritas,
                          )}`}
                        >
                          {getPriorityLabel(task.prioritas)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded-full">
                          <Tag className="h-3 w-3" /> {task.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded-full">
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
        </div>

        {activeCount === 0 && (
          <div className="w-full h-fit py-6 bg-zinc-950 border border-zinc-900 rounded-xl flex flex-col gap-4 relative shadow-sm">
            <Image
              src={'/images/raiden-chibi.png'}
              alt="raiden"
              width={80}
              height={80}
              className="absolute right-4 bottom-0 opacity-30 grayscale"
            />
            <div className="w-full flex gap-2 px-6">
              <div className="flex flex-col items-start justify-center h-full w-full gap-1">
                <Typography weight="bold" className="text-white text-lg">
                  Bagaimana Hari Ini?
                </Typography>
                <Typography className="text-sm text-zinc-500">
                  Catat kegiatanmu dan rencanakan hari esok.
                </Typography>
              </div>
            </div>
            <div className="w-full flex justify-start items-center px-6 z-10">
              <Button
                className="bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg px-6"
                onClick={() => router.push('/todo')}
              >
                Catat Sekarang
              </Button>
            </div>
          </div>
        )}
        <div className="py-12"></div>
      </div>
    </Layouts>
  )
}
