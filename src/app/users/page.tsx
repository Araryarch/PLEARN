'use client'

import Layouts from '@/Layouts/Layouts'
import Typography from '@/components/Typography'
import { ExtendedSession } from '@/lib/authOptions'
import { Mail, LogOut, ChevronRight, Calendar } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState('/images/hutao-pp.png')
  const [username, setUsername] = useState('')

  const avatars = [
    '/images/hutao-pp.png',
    '/images/elysia-pp.jpg',
    '/images/kazuha-pp.jpg',
    '/images/furina-pp.webp',
    '/images/xiao-pp.jpg',
    '/images/raiden-pp.png',
  ]

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
      setShowAvatarModal(false)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err)
        alert(err.message)
      }
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
      setShowEditModal(false)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err)
        alert(err.message)
      }
    }
  }

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
    if (session) {
      const extended = session as ExtendedSession
      setUsername(extended.user.username)
    }
  }, [session, status, router])

  if (status === 'loading') return <p></p>
  if (!session) return null

  const extended = session as ExtendedSession

  return (
    <Layouts>
      <div className="min-h-screen w-full bg-[#1e1e2e] text-[#cdd6f4] flex flex-col gap-4 p-4 pb-16">
        <div className="bg-[#181825] rounded-xl p-4 flex flex-col items-center gap-2 relative">
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute top-4 right-4 w-9 h-9 bg-[#89b4fa] hover:bg-[#74c7ec] rounded-full flex items-center justify-center transition-colors"
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
              className="text-[#1e1e2e]"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>

          <figure
            onClick={() => setShowAvatarModal(true)}
            className="w-16 h-16 rounded-full flex items-center justify-center text-[#1e1e2e] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative group"
          >
            <Image
              src={selectedAvatar}
              alt="profile"
              width={500}
              height={500}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Typography className="text-white text-xs font-medium">
                Edit
              </Typography>
            </div>
          </figure>
          <div className="text-center">
            <Typography className="text-[#cdd6f4] text-lg font-semibold">
              {extended.user.username}
            </Typography>
            <Typography className="text-[#a6adc8] text-xs">
              @{extended.user.tagName}
            </Typography>
          </div>
        </div>

        <div>
          <Typography className="text-[#cdd6f4] mb-3 font-semibold">
            Pencapaian
          </Typography>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: 'Tugas',
                value: extended.user.todos?.length ?? 0,
                icon: '📘',
                color: 'from-[#89b4fa] to-[#74c7ec]',
              },
              {
                label: 'Poin',
                value: extended.user.score,
                icon: '⚡',
                color: 'from-[#89b4fa] to-[#74c7ec]',
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
                color: 'from-[#89b4fa] to-[#74c7ec]',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${item.color} rounded-xl p-[1px]`}
              >
                <div className="bg-[#181825] rounded-xl flex flex-col items-center justify-center py-3">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <Typography className="text-[#cdd6f4] text-lg font-bold leading-none">
                    {item.value}
                  </Typography>
                  <Typography className="text-[#a6adc8] text-xs">
                    {item.label}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <Typography className="text-[#cdd6f4] mb-2 font-semibold">
            Informasi Pribadi
          </Typography>
          <div className="bg-[#181825] rounded-xl divide-y divide-[#45475a]">
            {[
              {
                icon: <Mail size={18} className="text-[#89b4fa]" />,
                title: 'Email',
                value: session.user?.email,
              },
              {
                icon: <Calendar size={18} className="text-[#89b4fa]" />,
                title: 'Join at',
                value: extended.user.startDate,
              },
            ].map((info, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                {info.icon}
                <div className="flex flex-col">
                  <Typography className="text-[#a6adc8] text-xs">
                    {info.title}
                  </Typography>
                  <Typography className="text-[#cdd6f4] text-sm">
                    {info.value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          <Typography className="text-[#cdd6f4] mb-2 font-semibold">
            Pengaturan
          </Typography>
          <div className="bg-[#181825] rounded-xl divide-y divide-[#45475a]">
            <button className="w-full flex items-center justify-between p-3 hover:bg-[#45475a] transition-colors duration-200">
              <div
                onClick={() => signOut()}
                className="flex items-center gap-3"
              >
                <LogOut size={18} className="text-[#f38ba8]" />
                <Typography className="text-[#f38ba8] text-sm">
                  Keluar
                </Typography>
              </div>
              <ChevronRight size={18} className="text-[#a6adc8]" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Ganti Foto Profil */}
      {showAvatarModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAvatarModal(false)}
        >
          <div
            className="bg-[#181825] rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography className="text-[#cdd6f4] text-lg font-semibold mb-4 text-center">
              Pilih Foto Profil
            </Typography>

            {/* Grid Avatar */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {avatars.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                    selectedAvatar === avatar
                      ? 'ring-4 ring-[#89b4fa] scale-95'
                      : 'ring-2 ring-[#313244] hover:ring-[#45475a]'
                  }`}
                >
                  <Image
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  {selectedAvatar === avatar && (
                    <div className="absolute inset-0 bg-[#89b4fa]/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-[#89b4fa] rounded-full flex items-center justify-center">
                        <span className="text-[#1e1e2e] font-bold">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSaveAvatar}
                className="w-full bg-[#89b4fa] hover:bg-[#74c7ec] text-[#1e1e2e] font-medium py-3 rounded-lg transition-colors"
              >
                Simpan
              </button>

              <button
                onClick={() => setShowAvatarModal(false)}
                className="w-full bg-[#313244] hover:bg-[#45475a] text-[#cdd6f4] font-medium py-3 rounded-lg transition-colors"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-[#181825] rounded-xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography className="text-[#cdd6f4] text-lg font-semibold mb-4 text-center">
              Edit Profil
            </Typography>

            <div className="flex flex-col gap-4">
              {/* Username Input */}
              <div className="flex flex-col gap-2">
                <Typography className="text-[#a6adc8] text-sm">
                  Username
                </Typography>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#313244] text-[#cdd6f4] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#89b4fa] transition-all"
                  placeholder="Masukkan username"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-[#89b4fa] hover:bg-[#74c7ec] text-[#1e1e2e] font-medium py-3 rounded-lg transition-colors"
                >
                  Simpan
                </button>

                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setUsername(extended.user.username) // Reset ke nilai awal
                  }}
                  className="w-full bg-[#313244] hover:bg-[#45475a] text-[#cdd6f4] font-medium py-3 rounded-lg transition-colors"
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
