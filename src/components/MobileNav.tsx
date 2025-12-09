'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { navigationItems } from '@/constants/navigation'

interface MobileNavProps {
  className?: string
}

export const MobileNav = ({ className = '' }: MobileNavProps) => {
  const pathname = usePathname()

  return (
    <div
      className={`bg-[#1e1e2e] border-t border-[#313244] px-2 py-2 pointer-events-auto w-full ${className}`}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center p-2 transition-all duration-200 rounded-lg hover:bg-[#313244]"
            >
              <Icon
                className={`h-6 w-6 ${isActive ? 'text-[#89b4fa]' : 'text-[#a6adc8]'}`}
              />
              <span
                className={`text-xs mt-1 font-medium ${isActive ? 'text-[#89b4fa]' : 'text-[#a6adc8]'}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
