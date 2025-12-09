import { useEffect, useState } from 'react'
import { catppuccin } from '../constants'

export const ChatSkeleton = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const isLongWait = seconds > 15
  const baseColor = isLongWait ? catppuccin.yellow : catppuccin.surface1
  const barColor = isLongWait ? catppuccin.yellow : catppuccin.surface0

  return (
    <div className="flex gap-3 max-w-[85%] lg:max-w-2xl items-start animate-pulse p-4 transition-colors duration-500">
      {/* Bot Avatar Placeholder */}
      <div
        className="w-8 h-8 rounded-full flex-shrink-0"
        style={{ backgroundColor: baseColor }}
      />

      {/* Message Placeholder */}
      <div className="flex flex-col gap-2 w-full max-w-[80%]">
        <div className="flex items-center gap-2 px-1">
          <div
            className="h-4 rounded mb-1 bg-opacity-50 transition-colors duration-500 flex items-center"
            style={{ width: 'fit-content' }}
          >
            <span
              className="text-xs font-medium opacity-70"
              style={{
                color: isLongWait ? catppuccin.yellow : catppuccin.subtext,
              }}
            >
              Thinking... ({seconds}s)
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {/* Varied width lines for natural look */}
          <div
            className="h-4 w-[92%] rounded-md transition-colors duration-500"
            style={{ backgroundColor: barColor, opacity: isLongWait ? 0.4 : 1 }}
          />
          <div
            className="h-4 w-[78%] rounded-md transition-colors duration-500"
            style={{ backgroundColor: barColor, opacity: isLongWait ? 0.4 : 1 }}
          />
          <div
            className="h-4 w-[85%] rounded-md transition-colors duration-500"
            style={{ backgroundColor: barColor, opacity: isLongWait ? 0.4 : 1 }}
          />
        </div>
      </div>
    </div>
  )
}
