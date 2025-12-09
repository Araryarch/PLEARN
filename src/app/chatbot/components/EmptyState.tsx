import { Compass, Code, Lightbulb, PenTool } from 'lucide-react'
import { catppuccin } from '../constants'

interface EmptyStateProps {
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

export const EmptyState = ({ setInput, children }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-4 animate-in fade-in zoom-in duration-500">
      {/* Hero Section */}
      <div className="mb-10 text-center space-y-1">
        <h2
          className="text-4xl md:text-5xl font-semibold tracking-tight"
          style={{ color: catppuccin.text }}
        >
          Hello, Learner
        </h2>
        <p
          className="text-xl md:text-2xl font-normal opacity-50"
          style={{ color: catppuccin.subtext }}
        >
          How can I help you today?
        </p>
      </div>

      {/* Input Container (Centered) */}
      <div className="w-full max-w-2xl mb-12">{children}</div>

      {/* Suggestions Grid (Minimalist) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setInput(item.prompt)}
            className="flex flex-col gap-2 p-4 rounded-xl text-left transition-all hover:bg-white/5 group h-full"
            style={{
              backgroundColor: catppuccin.surface0,
            }}
          >
            <div
              className="p-2 rounded-full w-fit"
              style={{ backgroundColor: catppuccin.base, color: item.color }}
            >
              {item.icon}
            </div>
            <p
              className="font-medium text-sm"
              style={{ color: catppuccin.text }}
            >
              {item.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
