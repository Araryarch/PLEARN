import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { aiModes } from '../constants'
import { AIMode } from '../types'

interface ChatHeaderProps {
  aiMode: AIMode
  setAiMode: (mode: AIMode) => void
  dropdownOpen: boolean
  toggleDropdown: () => void
  dropdownRef: React.RefObject<HTMLDivElement | null>
  buttonRef: React.RefObject<HTMLButtonElement | null>
  onMenuClick?: () => void
}

export const ChatHeader = ({
  aiMode,
  setAiMode,
  dropdownOpen,
  toggleDropdown,
  dropdownRef,
  buttonRef,
  onMenuClick,
}: ChatHeaderProps) => {
  const currentMode = aiModes.find((m) => m.value === aiMode)

  return (
    <div className="px-4 md:px-6 py-3 pt-safe-4 sticky top-0 z-50 flex items-center justify-between flex-none w-full backdrop-blur-xl border-b border-zinc-800 bg-black/80">
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 rounded-md hover:bg-zinc-900 text-zinc-200"
          >
            <Menu size={20} />
          </button>
        )}
        <h1 className="text-lg font-bold tracking-tight text-white">
          SENOPATI
        </h1>
        <div className="h-4 w-[1px] bg-zinc-800 mx-2 hidden sm:block" />
        <span className="text-xs font-medium text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 hidden sm:inline">
          Beta
        </span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <Button
          ref={buttonRef}
          onClick={toggleDropdown}
          variant="ghost"
          className="gap-2 h-9 text-sm font-medium text-white hover:bg-zinc-900 transition-all rounded-lg border border-zinc-800 hover:border-zinc-700"
        >
          <span className="hidden sm:inline">{currentMode?.label}</span>
          <span className="sm:hidden">{currentMode?.label.split(' ')[0]}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`opacity-50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-72 shadow-2xl rounded-xl border border-zinc-800 overflow-hidden backdrop-blur-xl bg-zinc-950 animate-in fade-in zoom-in-95 duration-200"
            style={{
              zIndex: 9999,
            }}
          >
            <div className="p-1.5 space-y-0.5">
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Select AI Personality
              </div>
              {aiModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => {
                    setAiMode(mode.value)
                    toggleDropdown()
                  }}
                  className={`w-full px-3 py-2.5 text-left rounded-lg transition-all duration-200 flex items-start gap-3 group ${
                    aiMode === mode.value
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-2 h-2 rounded-full ${aiMode === mode.value ? 'bg-white' : 'bg-transparent border border-zinc-600'}`}
                  />
                  <div>
                    <div className="text-sm font-medium">{mode.label}</div>
                    <div className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                      {mode.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
