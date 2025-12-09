'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layouts from '@/Layouts/Layouts'
import {
  Search,
  Filter,
  Plus,
  Clock,
  Tag,
  CheckCircle2,
  Circle,
  MoreVertical,
  X,
  Trash2,
  Edit2,
  CalendarIcon,
} from 'lucide-react'
import type { ExtendedSession } from '@/lib/authOptions'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { parseISOToString } from '@/lib/dateParser'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Task {
  id: number
  title: string
  desc: string
  category: string
  prioritas: 'high' | 'medium' | 'low'
  deadline: string
  status: 'Aktif' | 'Selesai'
}
type FilterType = 'all' | 'pending' | 'completed'
type PriorityFilter = 'all' | 'high' | 'medium' | 'low'

// Skeleton Loading Component
const SkeletonLoading = () => (
  <div className="min-h-screen h-screen w-full bg-black p-6 flex flex-col gap-6 overflow-y-auto">
    <div className="h-6 bg-zinc-900 rounded animate-pulse w-48"></div>

    <div className="w-full h-fit bg-zinc-950 border border-zinc-900 py-5 rounded-xl flex flex-col gap-2 relative shadow-lg">
      <div className="h-20 bg-zinc-900 rounded animate-pulse absolute bottom-0 right-0 w-20"></div>
      <div className="h-1/2 w-full flex justify-start items-center px-5">
        <div className="h-4 bg-zinc-900 rounded animate-pulse w-3/4"></div>
      </div>
    </div>

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
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function DailyTasksPage() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('pending')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showTaskMenu, setShowTaskMenu] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const editingDeadlineDate = editingTask?.deadline
    ? new Date(editingTask.deadline)
    : undefined
  const [editCalendarOpen, setEditCalendarOpen] = useState(false)

  const extended = session as ExtendedSession
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

  const addNewTask = async (task: Omit<Task, 'id'>) => {
    if (!extended?.user?.id) return
    try {
      const res = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, userId: extended.user.id }),
      })
      if (!res.ok) throw new Error('Gagal tambah tugas')
      const newTask: Task = await res.json()
      setTasks((prev) => [newTask, ...prev])
      setShowAddModal(false)
    } catch (err) {
      console.error(err)
    }
  }
  const saveTask = async (task: Task | null) => {
    if (!task) return
    try {
      const res = await fetch(`/api/todo/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
      if (!res.ok) throw new Error('Gagal update tugas')
      const updatedTask: Task = await res.json()
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      )
      setEditingTask(null)
    } catch (err) {
      console.error(err)
    }
  }
  const deleteTask = async (taskId: number) => {
    try {
      const res = await fetch(`/api/todo/${taskId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal hapus tugas')
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
    } catch (err) {
      console.error(err)
    }
  }
  const toggleTaskCompletion = async (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    const newStatus = task.status === 'Aktif' ? 'Selesai' : 'Aktif'
    try {
      const res = await fetch(`/api/todo/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: newStatus }),
      })
      if (!res.ok) throw new Error('Gagal update status tugas')
      const updatedTask: Task = await res.json()
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      )
    } catch (err) {
      console.error(err)
    }
  }
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'pending' && task.status === 'Aktif') ||
      (activeFilter === 'completed' && task.status === 'Selesai')
    const matchesPriority =
      priorityFilter === 'all' || task.prioritas === priorityFilter
    return matchesSearch && matchesFilter && matchesPriority
  })
  const completedCount = tasks.filter((t) => t.status === 'Selesai').length
  const totalCount = tasks.length

  const getPriorityColor = (prioritas: string) => {
    switch (prioritas) {
      case 'high':
        return 'bg-white/10 text-white border border-white/20'
      case 'medium':
        return 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50'
      case 'low':
        return 'bg-zinc-900/50 text-zinc-500 border border-zinc-800/50'
      default:
        return 'bg-zinc-900/50 text-zinc-500 border border-zinc-800'
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

  if (loading)
    return (
      <Layouts>
        <SkeletonLoading />
      </Layouts>
    )

  return (
    <Layouts>
      <div className="h-full w-full bg-black text-zinc-50">
        <div className="mx-auto max-w-2xl p-4 pb-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Tugas Harian</h1>
            <p className="text-sm text-zinc-400">
              Kelola tugas harianmu dengan mudah & efisien
            </p>
          </div>

          {/* summary bar */}
          <div className="mb-8 rounded-2xl bg-zinc-950 border border-zinc-900 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 mb-1 uppercase tracking-wider font-medium">
                  Progress
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-white">
                    {completedCount}
                  </p>
                  <p className="text-lg text-zinc-500 font-medium">
                    / {totalCount} Selesai
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-zinc-900 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 ease-out"
                style={{
                  width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* search & filter */}
          <div className="mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Cari tugas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition lg:text-sm"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="h-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <Filter className="h-5 w-5" />
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl z-20 overflow-hidden">
                  <div className="p-1">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 py-2">
                      Prioritas
                    </p>
                    {(['all', 'high', 'medium', 'low'] as PriorityFilter[]).map(
                      (priority) => (
                        <button
                          key={priority}
                          onClick={() => {
                            setPriorityFilter(priority)
                            setShowFilterMenu(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            priorityFilter === priority
                              ? 'bg-zinc-100 text-black font-medium'
                              : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                          }`}
                        >
                          {priority === 'all'
                            ? 'Semua Prioritas'
                            : getPriorityLabel(priority)}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* status filter */}
          <div className="mb-6 flex gap-1 rounded-xl bg-zinc-950 border border-zinc-900 p-1">
            {(['all', 'pending', 'completed'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                }`}
              >
                {filter === 'all'
                  ? 'Semua'
                  : filter === 'pending'
                    ? 'Aktif'
                    : 'Selesai'}
              </button>
            ))}
          </div>

          {/* tasks */}
          <ScrollArea className="h-[calc(100vh-400px)] pr-4">
            <div className="space-y-4 pb-8">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`group rounded-2xl border bg-zinc-950 p-5 shadow-sm transition-all hover:border-zinc-700 ${task.status === 'Selesai' ? 'border-zinc-900 opacity-50 bg-black' : 'border-zinc-900'}`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="mt-1 text-zinc-600 hover:text-white transition-colors"
                      >
                        {task.status === 'Selesai' ? (
                          <CheckCircle2 className="h-6 w-6 text-zinc-400" />
                        ) : (
                          <Circle className="h-6 w-6" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-medium mb-1.5 text-base ${task.status === 'Selesai' ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-sm text-zinc-500 mb-3">
                          {task.desc}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${getPriorityColor(task.prioritas)}`}
                          >
                            {getPriorityLabel(task.prioritas)}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-zinc-500 bg-zinc-900/50 px-2.5 py-1 rounded-full border border-zinc-800">
                            <Tag className="h-3 w-3" /> {task.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-zinc-500 bg-zinc-900/50 px-2.5 py-1 rounded-full border border-zinc-800">
                            <Clock className="h-3 w-3" />{' '}
                            {parseISOToString(task.deadline)}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowTaskMenu(
                              showTaskMenu === task.id ? null : task.id,
                            )
                          }
                          className="p-2 -mr-2 text-zinc-600 hover:text-white hover:bg-zinc-900 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {showTaskMenu === task.id && (
                          <div className="absolute right-0 mt-2 w-32 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl z-20 overflow-hidden">
                            {task.status !== 'Selesai' && (
                              <button
                                onClick={() => {
                                  setEditingTask(task)
                                  setShowTaskMenu(null)
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
                              >
                                <Edit2 className="h-3.5 w-3.5" /> Edit
                              </button>
                            )}
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div className="mb-4 text-5xl opacity-20 filter grayscale">
                    ✨
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Tidak ada tugas
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {searchQuery
                      ? 'Tidak ada tugas yang cocok dengan pencarian'
                      : 'Semua beres! Nikmati harimu.'}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* add task button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-8 right-8 rounded-full bg-white p-4 text-black shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 z-30"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* edit modal */}
        {editingTask && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-zinc-950 rounded-2xl border border-zinc-900 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Edit Tugas</h3>
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition"
                  placeholder="Judul"
                />
                <textarea
                  value={editingTask.desc}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, desc: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition resize-none h-24"
                  placeholder="Deskripsi"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={editingTask.category}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white"
                    placeholder="Kategori"
                  />
                  <select
                    value={editingTask.prioritas}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        prioritas: e.target.value as 'high' | 'medium' | 'low',
                      })
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <Popover
                  open={editCalendarOpen}
                  onOpenChange={setEditCalendarOpen}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white flex items-center gap-3 hover:bg-zinc-800 transition-colors"
                    >
                      <CalendarIcon className="h-4 w-4 text-zinc-400" />
                      {editingTask.deadline
                        ? new Date(editingTask.deadline).toLocaleDateString(
                            'id-ID',
                          )
                        : 'Pilih deadline'}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-auto p-0 border-zinc-800 bg-zinc-950 shadow-xl"
                  >
                    <Calendar
                      mode="single"
                      selected={editingDeadlineDate}
                      onSelect={(date) => {
                        if (date) {
                          setEditingTask({
                            ...editingTask,
                            deadline: date.toISOString().split('T')[0],
                          })
                          setEditCalendarOpen(false)
                        }
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      className="p-3 bg-zinc-950 text-white rounded-xl border border-zinc-900"
                    />
                  </PopoverContent>
                </Popover>
                <select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      status: e.target.value as 'Aktif' | 'Selesai',
                    })
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Selesai">Selesai</option>
                </select>
                <button
                  onClick={() => saveTask(editingTask)}
                  className="mt-4 rounded-xl bg-white py-3 text-black font-bold hover:bg-zinc-200 transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* add modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <AddTaskForm
              onSave={addNewTask}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        )}
      </div>
    </Layouts>
  )
}

function AddTaskForm({
  onSave,
  onCancel,
}: {
  onSave: (task: Omit<Task, 'id'>) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [prioritas, setPrioritas] = useState<'high' | 'medium' | 'low'>(
    'medium',
  )
  const [deadline, setDeadline] = useState('')

  const [calendarOpen, setCalendarOpen] = useState(false)
  const deadlineDate = deadline ? new Date(deadline) : undefined

  const handleSubmit = () => {
    if (!title) return
    onSave({
      title,
      desc,
      category,
      prioritas,
      deadline,
      status: 'Aktif',
    })
  }

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Tambah Tugas Baru</h3>
        <button
          onClick={onCancel}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          placeholder="Judul Tugas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition"
        />
        <textarea
          placeholder="Deskripsi singkat"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition resize-none h-24"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20"
          />
          <select
            value={prioritas}
            onChange={(e) =>
              setPrioritas(e.target.value as 'high' | 'medium' | 'low')
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white flex items-center gap-3 hover:bg-zinc-800 transition-colors"
            >
              <CalendarIcon className="h-4 w-4 text-zinc-400" />
              {deadline
                ? new Date(deadline).toLocaleDateString('id-ID')
                : 'Pilih deadline'}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto p-0 border-zinc-800 bg-zinc-950 shadow-xl"
          >
            <Calendar
              mode="single"
              selected={deadlineDate}
              onSelect={(date) => {
                if (date) {
                  setDeadline(date.toISOString().split('T')[0])
                  setCalendarOpen(false)
                }
              }}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              className="p-3 bg-zinc-950 text-white rounded-xl border border-zinc-900"
            />
          </PopoverContent>
        </Popover>
        <button
          onClick={handleSubmit}
          className="mt-4 rounded-xl bg-white py-3 text-black font-bold hover:bg-zinc-200 transition-colors"
        >
          Buat Tugas
        </button>
      </div>
    </div>
  )
}
