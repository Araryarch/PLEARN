'use client'

import Typography from '@/components/Typography'
import { Button } from '@/components/ui/button'
import Layouts from '@/Layouts/Layouts'
import { ExtendedSession } from '@/lib/authOptions'
import { Tag, Clock, ArrowRight, Circle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { parseISOToString } from '@/lib/dateParser'
import { useQuery } from '@tanstack/react-query'

interface Task {
  id: number
  title: string
  desc: string
  category: string
  prioritas: 'high' | 'medium' | 'low'
  deadline: string
  status: 'Aktif' | 'Selesai'
}

const CircularProgress = ({
  value,
  max,
  size = 120,
  strokeWidth = 10,
}: {
  value: number
  max: number
  size?: number
  strokeWidth?: number
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = max > 0 ? value / max : 0
  const dashoffset = circumference - progress * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-foreground">
        {progress === 1 ? (
          <Image
            src={'/images/raiden-chibi.png'}
            alt="Complete"
            width={size * 0.8}
            height={size * 0.8}
            className="object-contain"
          />
        ) : (
          <span className="text-3xl font-bold">
            {Math.round(progress * 100)}%
          </span>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const extended = session as ExtendedSession

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', extended?.user?.id],
    queryFn: async () => {
      if (!extended?.user?.id) return []
      const res = await fetch(`/api/todo?userId=${extended.user.id}`)
      if (!res.ok) throw new Error('Gagal fetch tugas')
      return res.json() as Promise<Task[]>
    },
    enabled: !!extended?.user?.id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })

  if (!session) return null

  const activeTasks = tasks.filter((t) => t.status !== 'Selesai')
  const activeCount = activeTasks.length
  const completedCount = tasks.filter((t) => t.status === 'Selesai').length
  const totalCount = tasks.length

  const hour = new Date().getHours()
  let greeting = 'Selamat Malam'
  if (hour >= 4 && hour < 11) greeting = 'Selamat Pagi'
  else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang'
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore'

  const getPriorityColor = (prioritas: string) => {
    switch (prioritas) {
      case 'high':
        return 'bg-primary text-primary-foreground border border-primary'
      case 'medium':
        return 'bg-secondary text-secondary-foreground border border-input'
      case 'low':
        return 'bg-muted text-muted-foreground border border-input'
      default:
        return 'bg-muted text-muted-foreground'
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

  return (
    <Layouts>
      <div className="h-full w-full bg-background p-4 md:p-6 flex flex-col gap-6 md:gap-8 pb-32 overflow-y-auto">
        <Typography
          className="text-foreground text-2xl md:text-3xl tracking-tight"
          weight="bold"
        >
          {greeting}, <br />
          <span className="text-muted-foreground">
            {extended.user.username}
          </span>
        </Typography>

        <div className="w-full bg-card border border-border p-4 md:p-6 rounded-3xl flex items-center justify-between relative overflow-hidden shadow-lg">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

          <div className="flex flex-col gap-1 z-10">
            <Typography className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">
              Your Progress
            </Typography>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-card-foreground">
                  {isLoading ? '-' : completedCount}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {isLoading ? '-' : totalCount} Selesai
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {isLoading ? '-' : activeCount} tugas tersisa
              </span>
            </div>
          </div>

          <div className="z-10 relative">
            <CircularProgress
              value={completedCount}
              max={totalCount}
              size={90}
              strokeWidth={8}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-between items-end">
            <Typography className="text-foreground text-xl font-bold tracking-tight">
              Agenda
            </Typography>
            <Link
              href={'/todo'}
              className="text-muted-foreground text-xs flex items-center gap-1 hover:text-foreground transition-colors pb-1"
            >
              Lihat Semua <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {isLoading ? (
              <div className="flex flex-col gap-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-muted rounded-2xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : activeCount === 0 ? (
              <div className="text-center bg-card border border-border border-dashed py-10 rounded-2xl flex flex-col items-center gap-3">
                <span className="text-4xl">🎉</span>
                <div className="flex flex-col gap-1">
                  <p className="text-card-foreground font-medium">
                    Semua tugas selesai!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Nikmati waktu istirahatmu.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-xs border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => router.push('/todo')}
                >
                  Buat tugas baru
                </Button>
              </div>
            ) : (
              activeTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border bg-card p-4 md:p-5 shadow-sm transition-all active:scale-[0.99] border-border relative overflow-hidden group"
                >
                  <div className="flex items-start gap-4 z-10 relative">
                    <div className="mt-1">
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                        {task.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide font-medium">
                        <span
                          className={`px-2 py-0.5 rounded-md ${getPriorityColor(task.prioritas)}`}
                        >
                          {getPriorityLabel(task.prioritas)}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Tag className="w-3 h-3" /> {task.category}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />{' '}
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

        {activeCount === 0 && !isLoading && (
          <div className="w-full bg-card border border-border rounded-3xl p-6 flex items-center justify-between shadow-sm mt-2">
            <div className="flex flex-col gap-2">
              <Typography
                weight="bold"
                className="text-card-foreground text-lg leading-tight"
              >
                Mulai Rencanakan <br /> Hari Esok
              </Typography>
              <Button
                size="sm"
                className="w-fit bg-foreground hover:bg-muted-foreground text-background font-semibold rounded-full px-5 text-xs mt-1"
                onClick={() => router.push('/todo')}
              >
                Catat Sekarang
              </Button>
            </div>
            <Image
              src={'/images/raiden-chibi.png'} // Fallback or keep if exists
              alt="character"
              width={80}
              height={80}
              className="opacity-50 grayscale"
            />
          </div>
        )}
      </div>
    </Layouts>
  )
}
