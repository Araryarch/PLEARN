import { Compass, Code, Lightbulb, PenTool } from 'lucide-react'
import { catppuccin, aiModes } from '../constants'
import { AIMode } from '../types'

interface EmptyStateProps {
  aiMode: AIMode
  setInput: (value: string) => void
  children?: React.ReactNode
}

const suggestions = [
  {
    icon: <Compass size={20} />,
    text: 'Rencanakan jadwal belajar',
    prompt: 'Buatkan jadwal belajar efektif untuk persiapan UTBK',
    color: catppuccin.blue,
  },
  {
    icon: <Code size={20} />,
    text: 'Bantu debug kode',
    prompt: 'Saya punya masalah dengan React hooks, bantu saya debug',
    color: catppuccin.mauve,
  },
  {
    icon: <Lightbulb size={20} />,
    text: 'Ide project baru',
    prompt: 'Berikan 5 ide project portfolio untuk web developer pemula',
    color: catppuccin.yellow,
  },
  {
    icon: <PenTool size={20} />,
    text: 'Tips produktivitas',
    prompt: 'Bagaimana cara mengatasi prokrastinasi saat belajar?',
    color: catppuccin.green,
  },
]

export const EmptyState = ({ aiMode, setInput, children }: EmptyStateProps) => {
  const currentMode = aiModes.find((m) => m.value === aiMode)

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-4 animate-in fade-in zoom-in duration-500">
      {/* Hero Section */}
      <div className="mb-8 text-center space-y-2">
        <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4 backdrop-blur-sm border border-white/5">
          <span className="text-4xl">✨</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Hello, Learner!
        </h2>
        <p
          className="text-lg md:text-xl font-medium"
          style={{ color: catppuccin.subtext }}
        >
          How can I help you regarding {currentMode?.label.toLowerCase()} today?
        </p>
      </div>

      {/* Input Container (Centered) */}
      <div className="w-full max-w-2xl mb-12">{children}</div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setInput(item.prompt)}
            className="flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            style={{
              backgroundColor: catppuccin.surface0,
              border: `1px solid ${catppuccin.surface1}`,
            }}
          >
            <div
              className="p-2 rounded-lg transition-colors group-hover:bg-opacity-20"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <p
                className="font-medium text-sm md:text-base"
                style={{ color: catppuccin.text }}
              >
                {item.text}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
