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
import { ThemeToggle } from '@/components/ThemeToggle'

interface LayoutsProps {
  children:
    | React.ReactNode
    | ((props: { openSidebar: () => void }) => React.ReactNode)
  hideHeader?: boolean
}

export default function Layouts({
  children,
  hideHeader = false,
}: LayoutsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const extended = session as ExtendedSession

  const openSidebar = () => setIsOpen(true)

  useEffect(() => setIsOpen(false), [pathname])

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border relative pt-safe">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border">
        <span className="font-bold text-lg text-foreground tracking-tight flex items-center gap-2">
          <div className="w-5 h-5 bg-foreground rounded-full" />
          PLEARN
        </span>
        <div className="md:hidden">
          <ThemeToggle />
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
                       ? 'bg-zinc-900 dark:bg-zinc-800 text-white font-medium shadow-inner'
                       : 'text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-foreground'
                   }
                 `}
            >
              <Icon
                size={20}
                className={`transition-colors flex-shrink-0 ${active ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'}`}
              />
              <span className="ml-3 text-sm truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 pb-safe border-t border-border bg-card">
        <div className="flex items-center gap-3 pb-2 justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {extended?.user?.avatar ? (
              <Image
                src={extended.user.avatar}
                alt={extended.user.username || 'User'}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-border grayscale"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground border border-border">
                {extended?.user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {extended?.user?.username || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{extended?.user?.tagName || 'user'}
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen fixed left-0 top-0 z-40 bg-card w-64 border-r border-border">
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
              className="md:hidden fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 z-[60] shadow-2xl"
            >
              <div className="h-full relative font-sans">
                <SidebarContent />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-safe right-4 mt-4 p-1.5 rounded-md text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-foreground z-10"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-[100dvh] md:ml-64 w-full bg-background overflow-hidden">
        {/* Mobile Header - hide if hideHeader is true */}
        {!hideHeader && (
          <header className="md:hidden pt-safe-4 pb-3 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={openSidebar}
                className="p-2 -ml-2 rounded-md hover:bg-zinc-900 text-zinc-200"
              >
                <Menu size={20} />
              </button>
              <span className="font-bold text-white tracking-tight">
                PLEARN
              </span>
            </div>
          </header>
        )}

        <main className="flex-1 w-full relative overflow-auto pb-safe-4">
          {typeof children === 'function'
            ? children({ openSidebar })
            : children}
        </main>
      </div>
    </div>
  )
}
