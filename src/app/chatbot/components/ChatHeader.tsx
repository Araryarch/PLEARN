import { Button } from '@/components/ui/button'
import { catppuccin, aiModes } from '../constants'
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
    <div
      className="border-b px-6 md:pr-72 py-4 pt-[calc(env(safe-area-inset-top)_+_1rem)] fixed top-0 w-full z-50 flex items-center justify-between shadow-sm"
      style={{
        borderColor: catppuccin.surface1,
        backgroundColor: catppuccin.surface0,
      }}
    >
      <h1
        className="text-xl font-bold tracking-tight"
        style={{ color: catppuccin.text }}
      >
        SENOPATI
      </h1>

      <div className="relative" ref={dropdownRef}>
        <Button
          ref={buttonRef}
          onClick={toggleDropdown}
          variant="outline"
          className="gap-2 border-opacity-50 hover:bg-opacity-10"
          style={{
            borderColor: catppuccin.overlay,
            color: catppuccin.text,
            backgroundColor: catppuccin.surface0,
          }}
        >
          <span className="text-sm font-medium">{currentMode?.label}</span>
        </Button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-64 shadow-xl rounded-xl border backdrop-blur-sm"
            style={{
              backgroundColor: catppuccin.surface0,
              borderColor: catppuccin.overlay,
              zIndex: 9999,
            }}
          >
            <div className="p-2 space-y-1">
              {aiModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => {
                    setAiMode(mode.value)
                    toggleDropdown()
                  }}
                  className="w-full px-4 py-3 text-left rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor:
                      aiMode === mode.value
                        ? catppuccin.surface1
                        : 'transparent',
                    color: catppuccin.text,
                  }}
                >
                  <div className="text-sm font-medium">{mode.label}</div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: catppuccin.subtext }}
                  >
                    {mode.description}
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
