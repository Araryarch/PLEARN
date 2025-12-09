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

export default function DailyTasksPage() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
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
  const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [extended?.user?.id])

  const addNewTask = async (task: Omit<Task, 'id'>) => {
    if (!extended?.user?.id) return

    // Optimistic Update
    const tempId = Date.now()
    const tempTask: Task = { ...task, id: tempId, status: 'Aktif' }

    // Update UI immediately
    setTasks((prev) => [tempTask, ...prev])
    setShowAddModal(false)

    try {
      const res = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, userId: extended.user.id }),
      })
      if (!res.ok) throw new Error('Gagal tambah tugas')

      const newTask: Task = await res.json()

      // Replace temp task with real task
      setTasks((prev) => prev.map((t) => (t.id === tempId ? newTask : t)))
    } catch (err) {
      console.error(err)
      // Revert on failure
      setTasks((prev) => prev.filter((t) => t.id !== tempId))
      // Optional: Show toast error here
    }
  }

  const saveTask = async (task: Task | null) => {
    if (!task) return

    // Optimistic Update
    const originalTasks = [...tasks]
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))
    setEditingTask(null)

    try {
      const res = await fetch(`/api/todo/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
      if (!res.ok) throw new Error('Gagal update tugas')

      // Sync with server response to be sure
      const updatedTask: Task = await res.json()
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      )
    } catch (err) {
      console.error(err)
      // Revert
      setTasks(originalTasks)
    }
  }

  const deleteTask = async (taskId: number) => {
    // Optimistic Update
    const originalTasks = [...tasks]
    setTasks((prev) => prev.filter((t) => t.id !== taskId))

    try {
      const res = await fetch(`/api/todo/${taskId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal hapus tugas')
    } catch (err) {
      console.error(err)
      // Revert
      setTasks(originalTasks)
    }
  }

  const toggleTaskCompletion = async (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    const newStatus = task.status === 'Aktif' ? 'Selesai' : 'Aktif'

    // Optimistic Update
    const originalTasks = [...tasks]
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    )

    try {
      const res = await fetch(`/api/todo/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: newStatus }),
      })
      if (!res.ok) throw new Error('Gagal update status tugas')
    } catch (err) {
      console.error(err)
      // Revert
      setTasks(originalTasks)
    }
  }

  const markAllAsDone = async () => {
    if (!extended?.user?.id) return
    try {
      const res = await fetch('/api/todo', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: extended.user.id }),
      })
      if (!res.ok) throw new Error('Gagal mark all as done')

      // Update local state
      setTasks((prev) =>
        prev.map((t) =>
          t.status === 'Aktif' ? { ...t, status: 'Selesai' } : t,
        ),
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
        return 'bg-primary/10 text-primary border border-primary/20'
      case 'medium':
        return 'bg-secondary/50 text-secondary-foreground border border-secondary/50'
      case 'low':
        return 'bg-muted/50 text-muted-foreground border border-border/50'
      default:
        return 'bg-muted/50 text-muted-foreground border border-border'
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
      <div className="h-[100dvh] w-full bg-background text-foreground overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-4 h-full relative">
          <div className="flex-none mb-6 flex items-start justify-between mt-2">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">
                Tugas Harian
              </h1>
              <p className="text-sm text-muted-foreground">
                Kelola tugas harianmu dengan mudah & efisien
              </p>
            </div>
            {tasks.filter((t) => t.status === 'Aktif').length > 0 && (
              <button
                onClick={markAllAsDone}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border hover:border-border/80 text-foreground text-sm font-medium transition-all"
              >
                <CheckCircle2 size={16} />
                Done All
              </button>
            )}
          </div>

          {/* summary bar */}
          <div className="flex-none mb-6 rounded-2xl bg-card border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">
                  Progress
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">
                    {isLoading ? '-' : completedCount}
                  </p>
                  <p className="text-lg text-muted-foreground font-medium">
                    / {isLoading ? '-' : totalCount} Selesai
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{
                  width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* search & filter */}
          <div className="flex-none mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari tugas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition lg:text-sm"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="h-full rounded-xl border border-input bg-card px-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Filter className="h-5 w-5" />
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-xl z-20 overflow-hidden">
                  <div className="p-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 py-2">
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
                              ? 'bg-muted text-foreground font-medium'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
          <div className="flex-none mb-4 flex gap-1 rounded-xl bg-card border border-border p-1">
            {(['all', 'pending', 'completed'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-muted text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
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
          <ScrollArea className="flex-1 -mr-4 pr-4 pb-20">
            <div className="space-y-4 pb-8">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:border-border/80 ${task.status === 'Selesai' ? 'border-border opacity-50 bg-background' : 'border-border'}`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {task.status === 'Selesai' ? (
                          <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
                        ) : (
                          <Circle className="h-6 w-6" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-medium mb-1.5 text-base ${task.status === 'Selesai' ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {task.desc}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${getPriorityColor(task.prioritas)}`}
                          >
                            {getPriorityLabel(task.prioritas)}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border">
                            <Tag className="h-3 w-3" /> {task.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border">
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
                          className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {showTaskMenu === task.id && (
                          <div className="absolute right-0 mt-2 w-32 rounded-lg border border-border bg-card shadow-xl z-20 overflow-hidden">
                            {task.status !== 'Selesai' && (
                              <button
                                onClick={() => {
                                  setEditingTask(task)
                                  setShowTaskMenu(null)
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                              >
                                <Edit2 className="h-3.5 w-3.5" /> Edit
                              </button>
                            )}
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
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
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Tidak ada tugas
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
            className="absolute bottom-8 right-8 rounded-full bg-foreground p-4 text-background shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 z-30"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* edit modal */}
        {editingTask && (
          <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  Edit Tugas
                </h3>
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
                  className="w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition"
                  placeholder="Judul"
                />
                <textarea
                  value={editingTask.desc}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, desc: e.target.value })
                  }
                  className="w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition resize-none h-24"
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
                    className="w-full rounded-xl border border-input bg-muted/50 px-4 py-2.5 text-sm text-foreground"
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
                    className="w-full rounded-xl border border-input bg-muted/50 px-4 py-2.5 text-sm text-foreground focus:outline-none"
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
                      className="w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground flex items-center gap-3 hover:bg-muted transition-colors"
                    >
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      {editingTask.deadline
                        ? new Date(editingTask.deadline).toLocaleDateString(
                            'id-ID',
                          )
                        : 'Pilih deadline'}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-auto p-0 border-border bg-card shadow-xl"
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
                      className="p-3 bg-card text-foreground rounded-xl border border-border"
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
                  className="w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground focus:outline-none"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Selesai">Selesai</option>
                </select>
                <button
                  onClick={() => saveTask(editingTask)}
                  className="mt-4 rounded-xl bg-foreground py-3 text-background font-bold hover:bg-muted-foreground transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* add modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
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
    <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-foreground">Tambah Tugas Baru</h3>
        <button
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          placeholder="Judul Tugas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition"
        />
        <textarea
          placeholder="Deskripsi singkat"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition resize-none h-24"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-input bg-muted/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-ring"
          />
          <select
            value={prioritas}
            onChange={(e) =>
              setPrioritas(e.target.value as 'high' | 'medium' | 'low')
            }
            className="w-full rounded-xl border border-input bg-muted/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-ring"
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
              className="w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground flex items-center gap-3 hover:bg-muted transition-colors"
            >
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {deadline
                ? new Date(deadline).toLocaleDateString('id-ID')
                : 'Pilih deadline'}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto p-0 border-border bg-card shadow-xl"
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
              className="p-3 bg-card text-foreground rounded-xl border border-border"
            />
          </PopoverContent>
        </Popover>
        <button
          onClick={handleSubmit}
          className="mt-4 rounded-xl bg-foreground py-3 text-background font-bold hover:bg-muted-foreground transition-colors"
        >
          Buat Tugas
        </button>
      </div>
    </div>
  )
}
