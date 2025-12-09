'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  User,
  FileText,
  X,
  ChevronRight,
  MessageSquareCode,
  PanelRight,
  LucideIcon,
} from 'lucide-react'

interface NavigationItem {
  id: string
  icon: LucideIcon
  label: string
  href: string
}

interface LayoutsProps {
  children: React.ReactNode
  topBotBar?: React.ReactNode
  isInputFocused?: boolean
  hideBottomNav?: boolean
}

export default function Layouts({
  children,
  topBotBar,
  isInputFocused,
  hideBottomNav = false,
}: LayoutsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const navigationItems: NavigationItem[] = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'todo', icon: FileText, label: 'Task', href: '/todo' },
    {
      id: 'chatbot',
      icon: MessageSquareCode,
      label: 'Chatbot',
      href: '/chatbot',
    },
    { id: 'user', icon: User, label: 'Profile', href: '/users' },
  ]

  const handleItemClick = () => setIsMobileMenuOpen(false)
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed)

  return (
    <>
      {/* Sidebar */}
      <div
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-50 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:w-20' : 'md:w-64'
        }`}
      >
        <div className="flex flex-col h-full bg-[#1e1e2e] border-r border-[#313244] shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-[#313244] pt-[env(safe-area-inset-top)]">
            {!isSidebarCollapsed && (
              <span className="text-2xl font-bold text-[#cdd6f4]">PLEARN</span>
            )}
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg bg-[#313244] hover:bg-[#45475a] transition-all duration-200 ${
                isSidebarCollapsed ? 'mx-auto' : ''
              }`}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5 text-[#cdd6f4]" />
              ) : (
                <PanelRight className="h-5 w-5 text-[#cdd6f4]" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleItemClick}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#313244] text-[#89b4fa]'
                      : 'text-[#a6adc8] hover:bg-[#313244] hover:text-[#cdd6f4]'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon
                    className={`${
                      isSidebarCollapsed ? 'h-6 w-6' : 'h-5 w-5'
                    } mr-3 transition-colors duration-200 ${
                      isActive ? 'text-[#89b4fa]' : 'text-[#a6adc8]'
                    }`}
                  />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* User */}
          <div className="px-3 py-4 border-t border-[#313244]">
            <div
              className={`flex items-center px-3 py-2.5 rounded-lg bg-[#313244] ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="flex-shrink-0 w-9 h-9 bg-[#45475a] rounded-lg flex items-center justify-center text-[#cdd6f4] text-sm font-semibold">
                JD
              </div>
              {!isSidebarCollapsed && (
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-semibold text-[#cdd6f4] truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-[#a6adc8] truncate">@johndoe</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <>
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${
            isInputFocused || hideBottomNav
              ? 'pb-0 pointer-events-none'
              : 'pb-[env(safe-area-inset-bottom)] bg-[#1e1e2e]'
          } `}
        >
          {topBotBar}
          {!isInputFocused && !hideBottomNav && (
            <div className="bg-[#1e1e2e] border-t border-b border-[#313244] px-2 py-2 pointer-events-auto">
              <div className="flex justify-around items-center max-w-md mx-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={handleItemClick}
                      className="flex flex-col items-center justify-center p-2 transition-all duration-200 rounded-lg hover:bg-[#313244]"
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isActive ? 'text-[#89b4fa]' : 'text-[#a6adc8]'
                        }`}
                      />
                      <span
                        className={`text-xs mt-1 font-medium ${
                          isActive ? 'text-[#89b4fa]' : 'text-[#a6adc8]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div
            className={`fixed bottom-0 left-0 right-0 bg-[#1e1e2e] rounded-t-3xl border-t border-[#313244] p-6 ${
              isInputFocused ? 'pb-0' : 'pb-[env(safe-area-inset-bottom)]'
            } `}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#cdd6f4]">Menu</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-[#313244] hover:bg-[#45475a] transition-all duration-200"
              >
                <X className="h-5 w-5 text-[#cdd6f4]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleItemClick}
                    className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#313244] text-[#89b4fa]'
                        : 'bg-[#1e1e2e] text-[#a6adc8] hover:bg-[#313244]'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'} ${
          isInputFocused || hideBottomNav
            ? 'pb-0!'
            : 'pb-[env(safe-area-inset-bottom)]!'
        } pt-[env(safe-area-inset-top)]! transition-all duration-300 bg-[#1e1e2e] min-h-screen h-screen text-[#cdd6f4] relative safe-area`}
      >
        {children}
      </div>
    </>
  )
}
