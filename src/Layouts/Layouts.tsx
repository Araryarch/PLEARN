'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  User,
  Settings,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  BookOpen,
} from 'lucide-react'

interface NavigationItem {
  id: string
  icon: LucideIcon
  label: string
  href: string
}

interface LayoutsProps {
  children: React.ReactNode
}

export default function Layouts({ children }: LayoutsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const pathname = usePathname()

  const navigationItems: NavigationItem[] = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'todo', icon: FileText, label: 'To Do List', href: '/todo' },
    { id: 'chatbot', icon: BookOpen, label: 'Chatbot', href: '/chatbot' },
    { id: 'user', icon: User, label: 'User', href: '/users' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
  ]

  const mobileNavItems: NavigationItem[] = navigationItems

  const handleItemClick = (): void => {
    setIsMobileMenuOpen(false)
  }

  const toggleSidebar = (): void => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-50 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:w-16' : 'md:w-64'
        }`}
      >
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-50/40 to-white/30 backdrop-blur-3xl border-r border-white/50 shadow-2xl bg-opacity-20">
            <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-gray-200/5"></div>
          </div>

          <div className="relative flex flex-col flex-grow">
            <div
              className={`flex items-center px-4 mb-8 ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-200/80 to-gray-400/80 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/40">
                  <div className="w-6 h-6 bg-white/70 rounded-lg opacity-70"></div>
                </div>
                {!isSidebarCollapsed && (
                  <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                    Patient-X
                  </span>
                )}
              </div>
            </div>

            <nav className="mt-5 flex-1 px-2 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleItemClick()}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 w-full border border-white/30 ${
                      isActive
                        ? 'bg-gradient-to-r from-white/50 to-gray-100/30 text-gray-900 shadow-lg backdrop-blur-sm'
                        : 'text-gray-600 hover:bg-white/20 hover:text-gray-900 hover:shadow-md hover:backdrop-blur-sm'
                    } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      } ${isSidebarCollapsed ? '' : 'mr-3'}`}
                    />
                    {!isSidebarCollapsed && item.label}
                    {isActive && !isSidebarCollapsed && (
                      <div className="ml-auto w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto px-2 pb-4">
              <button
                onClick={toggleSidebar}
                className={`w-full p-2 rounded-xl bg-gradient-to-r from-white/50 to-gray-100/30 backdrop-blur-sm border border-white/50 shadow-md hover:bg-white/60 transition-all duration-200 flex ${
                  isSidebarCollapsed
                    ? 'justify-center'
                    : 'justify-start items-center px-4'
                }`}
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                ) : (
                  <>
                    <ChevronLeft className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-600">
                      Collapse
                    </span>
                  </>
                )}
              </button>
              <div
                className={`mt-2 flex items-center px-4 py-3 rounded-2xl border border-white/30 ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-300/80 to-gray-500/80 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-md backdrop-blur-sm border border-white/40">
                  JD
                </div>
                {!isSidebarCollapsed && (
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-600">@johndoe</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="relative">
          <div className="bg-gradient-to-r from-white/60 via-gray-50/40 to-white/30 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/50 px-4 py-3 bg-opacity-20">
            <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-gray-200/5 rounded-3xl"></div>

            <div className="relative flex justify-between items-center">
              {mobileNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleItemClick()}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border border-white/30 ${
                      isActive
                        ? 'bg-white/50 shadow-lg backdrop-blur-sm transform scale-110'
                        : 'hover:bg-white/20 hover:shadow-md hover:backdrop-blur-sm hover:scale-105'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-all duration-300 ${
                        isActive ? 'text-gray-900' : 'text-gray-600'
                      }`}
                    />
                    {isActive && (
                      <div className="absolute -bottom-1 w-1 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-lg">
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/70 via-gray-50/50 to-white/40 backdrop-blur-3xl rounded-t-3xl shadow-2xl border-t border-white/50 p-6 bg-opacity-20">
            <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-gray-200/5 rounded-t-3xl"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-200 border border-white/30"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => handleItemClick()}
                      className={`flex items-center p-4 rounded-2xl transition-all duration-300 border border-white/30 ${
                        isActive
                          ? 'bg-gradient-to-r from-white/50 to-gray-100/30 text-gray-900 shadow-lg backdrop-blur-sm'
                          : 'bg-white/20 text-gray-600 hover:bg-white/40 hover:text-gray-900 hover:shadow-md'
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
        </div>
      )}

      <div
        className={`${isSidebarCollapsed ? 'md:pl-16' : 'md:pl-64'} pb-20 md:pb-0 transition-all duration-300`}
      >
        {children}
      </div>
    </>
  )
}
