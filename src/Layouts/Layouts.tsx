'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationItems } from '@/constants/navigation'

interface LayoutsProps {
  children: React.ReactNode
}

export default function Layouts({ children }: LayoutsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  useEffect(() => setIsOpen(false), [pathname])

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full bg-[#181825] border-r border-[#313244]">
      {/* Header */}
      <div
        className={`h-16 flex items-center ${collapsed && !isMobile ? 'justify-center' : 'px-6'} border-b border-[#313244]/50 transition-all duration-300`}
      >
        {!collapsed || isMobile ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              P
            </div>
            <span className="font-bold text-lg text-[#cdd6f4] tracking-tight">
              PLEARN
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
            P
          </div>
        )}
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
                   ${collapsed && !isMobile ? 'justify-center' : ''}
                 `}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                size={20}
                className={`transition-colors flex-shrink-0 ${active ? 'text-blue-400' : 'text-[#9399b2] group-hover:text-[#cdd6f4]'}`}
              />

              {(!collapsed || isMobile) && (
                <span className="ml-3 text-sm truncate">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-[#313244]/50">
        <div
          className={`flex items-center gap-3 ${collapsed && !isMobile ? 'justify-center' : ''}`}
        >
          <div className="w-9 h-9 rounded-full bg-[#313244] flex items-center justify-center text-xs font-semibold text-[#cdd6f4]">
            JD
          </div>
          {(!collapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#cdd6f4] truncate">
                John Doe
              </p>
              <p className="text-xs text-[#a6adc8] truncate">Pro Workspace</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Button (Desktop) */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#313244] border border-[#181825] rounded-full flex items-center justify-center text-[#a6adc8] hover:text-[#cdd6f4] hover:bg-[#45475a] transition-all duration-200 z-50 shadow-sm"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4] flex font-sans">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 240 }}
        className="hidden md:block h-screen fixed left-0 top-0 z-40 bg-[#181825]"
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <SidebarContent />
      </motion.aside>

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
                <SidebarContent isMobile />
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
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${collapsed ? 'md:ml-[72px]' : 'md:ml-[240px]'} w-full`}
      >
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
