'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationItems } from '@/constants/navigation'
import { useSession } from 'next-auth/react'
import { ExtendedSession } from '@/lib/authOptions'
import Image from 'next/image'

interface LayoutsProps {
  children: React.ReactNode
}

export default function Layouts({ children }: LayoutsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const extended = session as ExtendedSession

  useEffect(() => setIsOpen(false), [pathname])

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#181825] border-r border-[#313244]">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-[#313244]/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
            P
          </div>
          <span className="font-bold text-lg text-[#cdd6f4] tracking-tight">
            PLEARN
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                   group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                   ${
                     active
                       ? 'bg-[#313244] text-blue-400 font-medium'
                       : 'text-[#a6adc8] hover:bg-[#313244]/50 hover:text-[#cdd6f4]'
                   }
                 `}
            >
              <Icon
                size={20}
                className={`transition-colors flex-shrink-0 ${active ? 'text-blue-400' : 'text-[#9399b2] group-hover:text-[#cdd6f4]'}`}
              />
              <span className="ml-3 text-sm truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-[#313244]/50">
        <div className="flex items-center gap-3">
          {extended?.user?.avatar ? (
            <Image
              src={extended.user.avatar}
              alt={extended.user.username || 'User'}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#313244] flex items-center justify-center text-xs font-semibold text-[#cdd6f4]">
              {extended?.user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#cdd6f4] truncate">
              {extended?.user?.username || 'User'}
            </p>
            <p className="text-xs text-[#a6adc8] truncate">
              @{extended?.user?.tagName || 'user'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4] flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen fixed left-0 top-0 z-40 bg-[#181825] w-60">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 z-[60] shadow-2xl"
            >
              <div className="h-full relative font-sans">
                <SidebarContent />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1 rounded-md text-[#a6adc8] hover:bg-[#313244] hover:text-[#cdd6f4]"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-60 w-full">
        {/* Mobile Header */}
        <header className="md:hidden h-14 bg-[#181825] border-b border-[#313244] flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 -ml-2 rounded-md hover:bg-[#313244] text-[#cdd6f4]"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-[#cdd6f4]">PLEARN</span>
          </div>
        </header>

        <main className="flex-1 w-full relative">{children}</main>
      </div>
    </div>
  )
}
