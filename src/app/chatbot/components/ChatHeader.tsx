import { Button } from '@/components/ui/button'
import { aiModes } from '../constants'
import { AIMode } from '../types'

interface ChatHeaderProps {
  aiMode: AIMode
  setAiMode: (mode: AIMode) => void
  dropdownOpen: boolean
  toggleDropdown: () => void
  dropdownRef: React.RefObject<HTMLDivElement | null>
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

export const ChatHeader = ({
  aiMode,
  setAiMode,
  dropdownOpen,
  toggleDropdown,
  dropdownRef,
  buttonRef,
}: ChatHeaderProps) => {
  const currentMode = aiModes.find((m) => m.value === aiMode)

  return (
    <div className="px-6 py-4 pt-[calc(env(safe-area-inset-top)+1rem)] sticky top-0 z-50 flex items-center justify-between flex-none w-full backdrop-blur-xl border-b border-white/5 bg-[#181825]/80">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold tracking-tight text-[#cdd6f4]">
          SENOPATI
        </h1>
        <div className="h-4 w-[1px] bg-white/10 mx-2" />
        <span className="text-xs font-medium text-[#a6adc8] px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
          Beta
        </span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <Button
          ref={buttonRef}
          onClick={toggleDropdown}
          variant="ghost"
          className="gap-2 h-9 text-sm font-medium text-[#cdd6f4] hover:bg-white/5 transition-all rounded-lg border border-white/10 hover:border-white/20"
        >
          <span>{currentMode?.label}</span>
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
            className="absolute right-0 mt-2 w-72 shadow-2xl rounded-xl border border-white/10 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
            style={{
              backgroundColor: '#181825',
              zIndex: 9999,
            }}
          >
            <div className="p-1.5 space-y-0.5">
              <div className="px-3 py-2 text-xs font-semibold text-[#6c7086] uppercase tracking-wider">
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
                      ? 'bg-[#313244] text-[#cdd6f4]'
                      : 'text-[#a6adc8] hover:bg-[#313244]/50 hover:text-[#cdd6f4]'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-2 h-2 rounded-full ${aiMode === mode.value ? 'bg-blue-400' : 'bg-transparent border border-gray-600'}`}
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
