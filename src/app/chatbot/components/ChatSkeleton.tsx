import { useEffect, useState } from 'react'

export const ChatSkeleton = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const isLongWait = seconds > 15

  return (
    <div className="flex gap-4 max-w-[85%] lg:max-w-2xl items-start animate-pulse p-4 transition-colors duration-500">
      {/* Bot Avatar Placeholder */}
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 ${
          isLongWait ? 'bg-zinc-700' : 'bg-zinc-900'
        }`}
      />

      {/* Message Placeholder */}
      <div className="flex flex-col gap-2 w-full max-w-[80%]">
        <div className="flex items-center gap-2 px-1">
          <div className="h-4 rounded mb-1 bg-opacity-50 transition-colors duration-500 flex items-center w-fit">
            <span
              className={`text-xs font-medium ${
                isLongWait ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Thinking... ({seconds}s)
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {/* Varied width lines for natural look */}
          <div
            className={`h-4 w-[92%] rounded-md transition-colors duration-500 ${
              isLongWait ? 'bg-zinc-800' : 'bg-zinc-950'
            }`}
          />
          <div
            className={`h-4 w-[78%] rounded-md transition-colors duration-500 ${
              isLongWait ? 'bg-zinc-800' : 'bg-zinc-950'
            }`}
          />
          <div
            className={`h-4 w-[85%] rounded-md transition-colors duration-500 ${
              isLongWait ? 'bg-zinc-800' : 'bg-zinc-950'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
