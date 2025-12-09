'use client'

import Layouts from '@/Layouts/Layouts'
import Typography from '@/components/Typography'
import { ExtendedSession } from '@/lib/authOptions'
import { parseISOToString } from '@/lib/dateParser'
import { Mail, LogOut, ChevronRight, Calendar } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [username, setUsername] = useState('')

  const avatars = [
    '/images/hutao-pp.png',
    '/images/elysia-pp.jpg',
    '/images/kazuha-pp.jpg',
    '/images/furina-pp.webp',
    '/images/xiao-pp.jpg',
    '/images/raiden-pp.png',
  ]

  // Hanya loading saat session sedang fetch
  const isLoading = status === 'loading'

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const extended = session as ExtendedSession
      setSelectedAvatar(extended.user.avatar)
      setUsername(extended.user.username)
    } else if (status !== 'loading' && !session) {
      router.push('/login')
    }
  }, [status, session, router])

  const handleSaveAvatar = async () => {
    try {
      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: selectedAvatar }),
      })
      const data = (await res.json()) as { avatar?: string; error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Failed to save avatar')

      setSelectedAvatar(data.avatar!)
      // update next-auth session for real-time UI update
      await update({ avatar: data.avatar! })
      setShowAvatarModal(false)
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message)
      console.error(err)
    }
  }

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/user/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      const data = (await res.json()) as { username?: string; error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Failed to save username')

      setUsername(data.username!)
      // update next-auth session for real-time UI update
      await update({ username: data.username! })
      setShowEditModal(false)
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message)
      console.error(err)
    }
  }

  const SkeletonLoading = () => (
    <div className="min-h-screen h-screen w-full bg-black p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="h-6 bg-zinc-900 rounded animate-pulse w-48"></div>
      <div className="w-full h-fit bg-zinc-950 border border-zinc-900 py-5 rounded-2xl flex flex-col gap-2 relative shadow-lg">
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
      <div className="w-full h-fit flex justify-between">
        <div className="h-4 bg-zinc-900 rounded animate-pulse w-20"></div>
        <div className="h-4 bg-zinc-900 rounded animate-pulse w-24"></div>
      </div>
      <div className="w-full flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-zinc-950 p-4 shadow-sm border-zinc-900 animate-pulse"
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

  if (isLoading)
    return (
      <Layouts>
        <SkeletonLoading />
      </Layouts>
    )

  const extended = session as ExtendedSession

  return (
    <Layouts>
      <div className="min-h-screen w-full bg-black text-zinc-50 flex flex-col gap-6 p-4 pb-20">
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 flex flex-col items-center gap-4 relative shadow-sm">
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute top-4 right-4 w-9 h-9 bg-zinc-900 hover:bg-white hover:text-black text-zinc-400 rounded-full flex items-center justify-center transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>

          <figure
            onClick={() => setShowAvatarModal(true)}
            className="w-24 h-24 rounded-full flex items-center justify-center bg-zinc-900 text-zinc-700 overflow-hidden cursor-pointer hover:ring-4 hover:ring-zinc-800 transition-all relative group shadow-2xl"
          >
            <Image
              src={extended.user.avatar}
              alt="profile"
              width={500}
              height={500}
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
              <Typography className="text-white text-xs font-semibold uppercase tracking-wider">
                Edit
              </Typography>
            </div>
          </figure>

          <div className="text-center">
            <Typography className="text-white text-2xl font-bold tracking-tight">
              {extended.user.username}
            </Typography>
            <Typography className="text-zinc-500 text-sm font-medium">
              @{extended.user.tagName}
            </Typography>
          </div>
        </div>

        {/* Pencapaian */}
        <div>
          <Typography className="text-zinc-400 mb-3 font-medium uppercase text-xs tracking-wider px-2">
            Pencapaian
          </Typography>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: 'Tugas',
                value: extended.user.todos?.length ?? 0,
                icon: '📘',
              },
              {
                label: 'Poin',
                value: extended.user.score,
                icon: '⚡',
              },
              {
                label: 'Hari',
                value: (() => {
                  const start = new Date(extended.user.startDate)
                  const now = new Date()
                  const diffTime = Math.abs(now.getTime() - start.getTime())
                  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
                })(),
                icon: '⏰',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center py-4 hover:border-zinc-700 transition-colors"
              >
                <div className="text-2xl mb-2 grayscale opacity-70">
                  {item.icon}
                </div>
                <Typography className="text-white text-xl font-bold leading-none">
                  {item.value}
                </Typography>
                <Typography className="text-zinc-500 text-xs mt-1 font-medium">
                  {item.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <Typography className="text-zinc-400 mb-3 font-medium uppercase text-xs tracking-wider px-2">
            Informasi Pribadi
          </Typography>
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl divide-y divide-zinc-900 overflow-hidden">
            {[
              {
                icon: <Mail size={18} className="text-zinc-100" />,
                title: 'Email',
                value: extended.user?.email,
              },
              {
                icon: <Calendar size={18} className="text-zinc-100" />,
                title: 'Join at',
                value: parseISOToString(extended.user.startDate),
              },
            ].map((info, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 hover:bg-zinc-900/40 transition-colors"
              >
                <div className="p-2 bg-zinc-900 rounded-lg">{info.icon}</div>
                <div className="flex flex-col">
                  <Typography className="text-zinc-500 text-xs font-medium uppercase">
                    {info.title}
                  </Typography>
                  <Typography className="text-zinc-200 text-sm font-medium">
                    {info.value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Typography className="text-zinc-400 mb-3 font-medium uppercase text-xs tracking-wider px-2">
            Pengaturan
          </Typography>
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl divide-y divide-zinc-900 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-red-500/5 transition-colors duration-200 group">
              <div
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
                className="flex items-center gap-4"
              >
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-red-500/10 transition-colors">
                  <LogOut size={18} className="text-red-400" />
                </div>
                <Typography className="text-red-400 text-sm font-medium">
                  Keluar
                </Typography>
              </div>
              <ChevronRight
                size={18}
                className="text-zinc-600 group-hover:text-red-400/50"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Avatar */}
      {showAvatarModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setShowAvatarModal(false)}
        >
          <div
            className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography className="text-white text-xl font-bold mb-6 text-center">
              Pilih Foto Profil
            </Typography>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedAvatar === avatar
                      ? 'ring-2 ring-white scale-95 opacity-100'
                      : 'ring-1 ring-zinc-800 hover:ring-zinc-600 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={avatar}
                    alt={avatar}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  {selectedAvatar === avatar && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                        <span className="font-bold">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSaveAvatar}
                className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3.5 rounded-xl transition-colors"
              >
                Simpan Foto
              </button>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-medium py-3.5 rounded-xl transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Profile */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography className="text-white text-xl font-bold mb-6 text-center">
              Edit Profil
            </Typography>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Typography className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  Username
                </Typography>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-white/20 focus:bg-black transition-all placeholder:text-zinc-700"
                  placeholder="Masukkan username"
                />
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3.5 rounded-xl transition-colors"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setUsername(extended.user.username)
                  }}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-medium py-3.5 rounded-xl transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layouts>
  )
}
