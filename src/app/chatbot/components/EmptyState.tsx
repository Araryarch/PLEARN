import { catppuccin, aiModes } from '../constants'
import { AIMode } from '../types'

interface EmptyStateProps {
  aiMode: AIMode
}

export const EmptyState = ({ aiMode }: EmptyStateProps) => {
  const currentMode = aiModes.find((m) => m.value === aiMode)

  return (
    <div className="flex flex-col items-center justify-center pt-32 text-center animate-in fade-in zoom-in duration-500">
      <h2
        className="text-3xl font-bold mb-2"
        style={{ color: catppuccin.text }}
      >
        How can I help you?
      </h2>
      <p className="max-w-md mx-auto" style={{ color: catppuccin.subtext }}>
        I can generate to-do lists, answer questions, or help you strictly
        organize your day.
      </p>
      <p
        className="mt-4 text-sm px-3 py-1 rounded-full inline-block"
        style={{ backgroundColor: catppuccin.surface1, color: catppuccin.blue }}
      >
        Current Mode: <strong>{currentMode?.label}</strong>
      </p>
    </div>
  )
}
