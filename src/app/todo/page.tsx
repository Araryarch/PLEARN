'use client'

import Layouts from '@/Layouts/Layouts'
import Typography from '@/components/Typography'
import {
  Plus,
  CheckCircle2,
  Circle,
  Filter,
  Search,
  MoreVertical,
  Calendar,
} from 'lucide-react'
import React, { useState } from 'react'

interface Task {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'completed' | 'in-progress' | 'pending'
  dueDate: string
  category: string
}

export default function Page() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Selesaikan Tugas Matematika',
      description: 'Kerjakan soal halaman 45-50',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-10-28',
      category: 'Akademik',
    },
    {
      id: 2,
      title: 'Belajar React Hooks',
      description: 'Pelajari useState dan useEffect',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-10-29',
      category: 'Programming',
    },
    {
      id: 3,
      title: 'Membaca Buku',
      description: 'Atomic Habits - Chapter 3',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-10-27',
      category: 'Personal',
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/15 text-red-400 border-red-500/30'
      case 'medium':
        return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
      case 'low':
        return 'bg-green-500/15 text-green-400 border-green-500/30'
      default:
        return 'bg-surface1-ctp text-bright-ctp'
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.status === 'completed'
    if (filter === 'pending') return task.status !== 'completed'
    return true
  })

  const completedCount = tasks.filter((t) => t.status === 'completed').length
  const totalCount = tasks.length

  return (
    <Layouts>
      <div className="min-h-screen w-full bg-base-ctp p-4 pb-24">
        {/* Header Stats */}
        <div className="w-full bg-surface0-ctp rounded-2xl p-4 mb-5 shadow-sm">
          <Typography className="text-bright-ctp text-lg" weight="bold">
            Tugas Harian
          </Typography>
          <Typography className="text-subtext0-ctp text-sm mt-1">
            Kelola dan selesaikan tugasmu
          </Typography>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-surface1-ctp/60 rounded-xl p-3 text-center">
              <Typography className="text-bright-ctp text-xl" weight="bold">
                {completedCount}/{totalCount}
              </Typography>
              <Typography className="text-subtext0-ctp text-xs">
                Selesai
              </Typography>
            </div>
            <div className="bg-surface1-ctp/60 rounded-xl p-3 text-center">
              <Typography className="text-bright-ctp text-xl" weight="bold">
                {totalCount - completedCount}
              </Typography>
              <Typography className="text-subtext0-ctp text-xs">
                Tersisa
              </Typography>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-surface1-ctp rounded-xl flex items-center gap-2 px-3">
            <Search size={16} className="text-subtext0-ctp" />
            <input
              type="text"
              placeholder="Cari tugas..."
              className="flex-1 bg-transparent text-bright-ctp text-sm py-2 focus:outline-none placeholder-subtext0-ctp"
            />
          </div>
          <button className="w-10 h-10 bg-surface1-ctp rounded-xl flex items-center justify-center">
            <Filter size={16} className="text-bright-ctp" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto">
          {['all', 'pending', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as 'all' | 'completed' | 'pending')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                filter === tab
                  ? 'bg-bright-ctp text-base-ctp'
                  : 'bg-surface1-ctp text-subtext0-ctp'
              }`}
            >
              {tab === 'all'
                ? 'Semua'
                : tab === 'pending'
                  ? 'Aktif'
                  : 'Selesai'}
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-surface1-ctp rounded-xl p-4 border-l-4 shadow-sm transition-all ${
                task.status === 'completed'
                  ? 'border-green-500 opacity-70'
                  : task.priority === 'high'
                    ? 'border-red-500'
                    : task.priority === 'medium'
                      ? 'border-yellow-500'
                      : 'border-blue-500'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Status */}
                <button className="mt-1 flex-shrink-0">
                  {task.status === 'completed' ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Circle size={20} className="text-subtext0-ctp" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <Typography
                      className={`text-bright-ctp text-sm ${
                        task.status === 'completed' ? 'line-through' : ''
                      }`}
                      weight="bold"
                    >
                      {task.title}
                    </Typography>
                    <MoreVertical size={16} className="text-subtext0-ctp" />
                  </div>

                  <Typography className="text-subtext0-ctp text-xs mb-3">
                    {task.description}
                  </Typography>

                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-md border ${getPriorityColor(
                        task.priority,
                      )}`}
                    >
                      {task.priority === 'high'
                        ? 'Penting'
                        : task.priority === 'medium'
                          ? 'Sedang'
                          : 'Rendah'}
                    </span>
                    <span className="px-2 py-0.5 bg-surface0-ctp text-bright-ctp rounded-md">
                      {task.category}
                    </span>
                    <div className="flex items-center gap-1 text-subtext0-ctp">
                      <Calendar size={12} />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-surface1-ctp rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-subtext0-ctp" />
            </div>
            <Typography className="text-bright-ctp" weight="bold">
              Tidak Ada Tugas
            </Typography>
            <Typography className="text-subtext0-ctp text-sm mt-1 text-center">
              Semua tugas sudah selesai! 🎉
            </Typography>
          </div>
        )}

        {/* Add Button */}
        <button className="fixed bottom-20 right-4 w-12 h-12 bg-bright-ctp rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <Plus size={22} className="text-base-ctp" />
        </button>
      </div>
    </Layouts>
  )
}
