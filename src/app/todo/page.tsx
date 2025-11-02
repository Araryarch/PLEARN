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
        return 'bg-[#f38ba8]/10 text-[#f38ba8]'
      case 'medium':
        return 'bg-[#f9e2af]/10 text-[#f9e2af]'
      case 'low':
        return 'bg-[#a6e3a1]/10 text-[#a6e3a1]'
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
  if (loading)
    return (
      <Layouts>
        <SkeletonLoading />
      </Layouts>
    )
  return (
    <Layouts>
      <div className="h-full w-full bg-[#1e1e2e] text-[#cdd6f4]">
        <div className="mx-auto max-w-2xl p-4 pb-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-[#cdd6f4]">
              Tugas Harian
            </h1>
            <p className="text-sm text-[#a6adc8]">
              Kelola tugas harianmu dengan mudah
            </p>
          </div>
          {/* summary bar */}
          <div className="mb-6 rounded-xl bg-[#181825] border border-[#313244] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#a6adc8] mb-1">Total Tugas</p>
                <p className="text-2xl font-bold text-[#cdd6f4]">
                  {totalCount}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#a6adc8] mb-1">Selesai</p>
                <p className="text-2xl font-bold text-[#89b4fa]">
                  {completedCount}/{totalCount}
                </p>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#313244] overflow-hidden">
              <div
                className="h-full bg-[#89b4fa] transition-all duration-300"
                style={{
                  width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
          {/* search & filter */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a6adc8]" />
              <input
                type="text"
                placeholder="Cari tugas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] pl-9 pr-4 py-2 text-sm text-[#cdd6f4] placeholder:text-[#7f849c] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="rounded-md border border-[#313244] bg-[#1e1e2e] p-2 text-[#cdd6f4] hover:bg-[#45475a] transition-colors"
              >
                <Filter className="h-5 w-5" />
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-[#313244] bg-[#181825] shadow-lg z-10">
                  <div className="p-2">
                    <p className="text-xs font-semibold text-[#a6adc8] mb-2 px-2">
                      Filter Prioritas
                    </p>
                    {(['all', 'high', 'medium', 'low'] as PriorityFilter[]).map(
                      (priority) => (
                        <button
                          key={priority}
                          onClick={() => {
                            setPriorityFilter(priority)
                            setShowFilterMenu(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                            priorityFilter === priority
                              ? 'bg-[#89b4fa] text-[#1e1e2e]'
                              : 'text-[#cdd6f4] hover:bg-[#45475a]'
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
          <div className="mb-6 flex gap-2 rounded-lg bg-[#313244] p-1">
            {(['all', 'pending', 'completed'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#1e1e2e] text-[#cdd6f4] shadow-sm'
                    : 'text-[#a6adc8] hover:text-[#cdd6f4]'
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
          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-xl border bg-[#181825] p-4 shadow-sm transition-all hover:shadow-md ${task.status === 'Selesai' ? 'border-[#313244] opacity-60' : 'border-[#313244]'}`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="mt-0.5 text-[#7f849c] hover:text-[#cdd6f4] transition-colors"
                    >
                      {task.status === 'Selesai' ? (
                        <CheckCircle2 className="h-5 w-5 text-[#89b4fa]" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium mb-1 ${task.status === 'Selesai' ? 'text-[#7f849c] line-through' : 'text-[#cdd6f4]'}`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-xs text-[#a6adc8] mb-2">{task.desc}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium ${getPriorityColor(task.prioritas)}`}
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
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowTaskMenu(
                            showTaskMenu === task.id ? null : task.id,
                          )
                        }
                        className="p-1 text-[#7f849c] hover:text-[#cdd6f4] transition-colors"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {showTaskMenu === task.id && (
                        <div className="absolute right-0 mt-1 w-32 rounded-md border border-[#313244] bg-[#181825] shadow-lg z-10">
                          {task.status !== 'Selesai' && (
                            <button
                              onClick={() => {
                                setEditingTask(task)
                                setShowTaskMenu(null)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#cdd6f4] hover:bg-[#45475a] transition-colors rounded-t-sm"
                            >
                              <Edit2 className="h-3 w-3" /> Edit
                            </button>
                          )}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-[#f38ba8] hover:bg-[#f38ba8]/10 transition-colors ${task.status === 'Selesai' ? 'rounded-md' : 'rounded-b-sm'}`}
                          >
                            <Trash2 className="h-3 w-3" /> Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="mb-4 text-4xl">🎉</div>
                <h3 className="text-lg font-semibold text-[#cdd6f4] mb-1">
                  Tidak ada tugas
                </h3>
                <p className="text-sm text-[#a6adc8]">
                  {searchQuery
                    ? 'Tidak ada tugas yang cocok dengan pencarian'
                    : 'Semua tugas sudah selesai!'}
                </p>
              </div>
            )}
          </div>
          {/* add task button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-36 right-6 rounded-md bg-[#89b4fa] p-2 text-[#1e1e2e] shadow-sm cursor-pointer"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
        {/* edit modal */}
        {editingTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#181825] rounded-md border border-[#313244] shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#cdd6f4]">
                  Edit Tugas
                </h3>
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-[#f38ba8]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <input
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
                  placeholder="Judul"
                />
                <textarea
                  value={editingTask.desc}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, desc: e.target.value })
                  }
                  className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
                  placeholder="Deskripsi"
                />
                <input
                  value={editingTask.category}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, category: e.target.value })
                  }
                  className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
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
                  className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
                >
                  <option value="high">Tinggi</option>
                  <option value="medium">Sedang</option>
                  <option value="low">Rendah</option>
                </select>
                <input
                  type="date"
                  value={editingTask.deadline}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, deadline: e.target.value })
                  }
                  className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
                />
                <select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      status: e.target.value as 'Aktif' | 'Selesai',
                    })
                  }
                  className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Selesai">Selesai</option>
                </select>
                <button
                  onClick={() => saveTask(editingTask)}
                  className="mt-2 rounded-md bg-[#89b4fa] py-2 text-[#1e1e2e] font-medium"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* add modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
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
    <div className="bg-[#181825] rounded-md border border-[#313244] shadow-xl max-w-md w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#cdd6f4]">Tambah Tugas</h3>
        <button onClick={onCancel} className="text-[#f38ba8]">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <input
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
        />
        <textarea
          placeholder="Deskripsi"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
        />
        <input
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
        />
        <select
          value={prioritas}
          onChange={(e) =>
            setPrioritas(e.target.value as 'high' | 'medium' | 'low')
          }
          className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4]"
        >
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>

        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] flex items-center gap-2 hover:bg-[#45475a] transition-colors"
            >
              <CalendarIcon className="h-4 w-4" />
              {deadline
                ? new Date(deadline).toLocaleDateString('id-ID')
                : 'Pilih deadline'}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto p-0 border-[#313244] bg-[#181825] shadow-xl"
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
              className="p-3"
            />
          </PopoverContent>
        </Popover>

        <button
          onClick={handleSubmit}
          className="mt-2 rounded-md bg-[#89b4fa] py-2 text-[#1e1e2e] font-medium"
        >
          Tambah
        </button>
      </div>
    </div>
  )
}
