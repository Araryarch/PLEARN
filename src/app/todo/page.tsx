'use client'

import { useState } from 'react'
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
} from 'lucide-react'
import Layouts from '@/Layouts/Layouts'

interface Task {
  id: number
  title: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  completed: boolean
}

type FilterType = 'all' | 'pending' | 'completed'
type PriorityFilter = 'all' | 'high' | 'medium' | 'low'

export default function DailyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Menyelesaikan laporan proyek',
      description: 'Buat laporan lengkap untuk proyek Q1',
      category: 'Pekerjaan',
      priority: 'high',
      dueDate: '2024-03-20',
      completed: false,
    },
    {
      id: 2,
      title: 'Belanja kebutuhan rumah',
      description: 'Beli sayuran dan buah-buahan',
      category: 'Pribadi',
      priority: 'medium',
      dueDate: '2024-03-21',
      completed: false,
    },
    {
      id: 3,
      title: 'Meeting dengan tim',
      description: 'Diskusi progress proyek mingguan',
      category: 'Pekerjaan',
      priority: 'high',
      dueDate: '2024-03-20',
      completed: true,
    },
    {
      id: 4,
      title: 'Olahraga sore',
      description: 'Jogging 30 menit di taman',
      category: 'Kesehatan',
      priority: 'low',
      dueDate: '2024-03-22',
      completed: false,
    },
    {
      id: 5,
      title: 'Review kode program',
      description: 'Review PR dari anggota tim',
      category: 'Pekerjaan',
      priority: 'medium',
      dueDate: '2024-03-21',
      completed: true,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('pending')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showTaskMenu, setShowTaskMenu] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setShowTaskMenu(null)
  }

  const saveTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    )
    setEditingTask(null)
  }

  const addNewTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
    }
    setTasks([...tasks, task])
    setShowAddModal(false)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'pending' && !task.completed) ||
      (activeFilter === 'completed' && task.completed)
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter
    return matchesSearch && matchesFilter && matchesPriority
  })

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Tinggi'
      case 'medium':
        return 'Sedang'
      case 'low':
        return 'Rendah'
      default:
        return priority
    }
  }

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

          <div className="mb-6 flex gap-2 rounded-lg bg-[#313244] p-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex-1 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#1e1e2e] text-[#cdd6f4] shadow-sm'
                  : 'text-[#a6adc8] hover:text-[#cdd6f4]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`flex-1 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === 'pending'
                  ? 'bg-[#1e1e2e] text-[#cdd6f4] shadow-sm'
                  : 'text-[#a6adc8] hover:text-[#cdd6f4]'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`flex-1 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === 'completed'
                  ? 'bg-[#1e1e2e] text-[#cdd6f4] shadow-sm'
                  : 'text-[#a6adc8] hover:text-[#cdd6f4]'
              }`}
            >
              Selesai
            </button>
          </div>

          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-xl border bg-[#181825] p-4 shadow-sm transition-all hover:shadow-md ${
                    task.completed
                      ? 'border-[#313244] opacity-60'
                      : 'border-[#313244]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="mt-0.5 text-[#7f849c] hover:text-[#cdd6f4] transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-[#89b4fa]" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium mb-1 ${
                          task.completed
                            ? 'text-[#7f849c] line-through'
                            : 'text-[#cdd6f4]'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-xs text-[#a6adc8] mb-2">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium ${getPriorityColor(
                            task.priority,
                          )}`}
                        >
                          {getPriorityLabel(task.priority)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#a6adc8]">
                          <Tag className="h-3 w-3" />
                          {task.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#a6adc8]">
                          <Clock className="h-3 w-3" />
                          {task.dueDate}
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
                          {!task.completed && (
                            <button
                              onClick={() => {
                                setEditingTask(task)
                                setShowTaskMenu(null)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#cdd6f4] hover:bg-[#45475a] transition-colors rounded-t-sm"
                            >
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-[#f38ba8] hover:bg-[#f38ba8]/10 transition-colors ${
                              task.completed ? 'rounded-md' : 'rounded-b-sm'
                            }`}
                          >
                            <Trash2 className="h-3 w-3" />
                            Hapus
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

          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-24 right-6 rounded-md bg-[#89b4fa] p-2 text-[#1e1e2e] shadow-sm cursor-pointer"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {editingTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#181825] rounded-md border border-[#313244] shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#cdd6f4]">Edit Tugas</h2>
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-[#a6adc8] hover:text-[#cdd6f4] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  saveTask(editingTask)
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, title: e.target.value })
                    }
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    value={editingTask.description}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={editingTask.category}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Prioritas
                  </label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        priority: e.target.value as Task['priority'],
                      })
                    }
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                  >
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="flex-1 rounded-md border border-[#313244] bg-[#1e1e2e] px-4 py-2 text-sm font-medium text-[#cdd6f4] hover:bg-[#45475a] transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-[#89b4fa] px-4 py-2 text-sm font-medium text-[#1e1e2e] hover:bg-[#89b4fa]/90 transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#181825] rounded-md border border-[#313244] shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#cdd6f4]">
                  Tambah Tugas Baru
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[#a6adc8] hover:text-[#cdd6f4] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  addNewTask({
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    category: formData.get('category') as string,
                    priority: formData.get('priority') as Task['priority'],
                    dueDate: formData.get('dueDate') as string,
                    completed: false,
                  })
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Judul
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Masukkan judul tugas"
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] placeholder:text-[#7f849c] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    placeholder="Masukkan deskripsi tugas"
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] placeholder:text-[#7f849c] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Contoh: Pekerjaan, Pribadi"
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] placeholder:text-[#7f849c] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Prioritas
                  </label>
                  <select
                    name="priority"
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                  >
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#cdd6f4] mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    className="w-full rounded-md border border-[#313244] bg-[#1e1e2e] px-3 py-2 text-sm text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-md border border-[#313244] bg-[#1e1e2e] px-4 py-2 text-sm font-medium text-[#cdd6f4] hover:bg-[#45475a] transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-[#89b4fa] px-4 py-2 text-sm font-medium text-[#1e1e2e] hover:bg-[#89b4fa]/90 transition-colors"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layouts>
  )
}
