import { Compass, Code, Lightbulb, PenTool } from 'lucide-react'

interface EmptyStateProps {
  setInput: (value: string) => void
  children?: React.ReactNode
}

const suggestions = [
  {
    icon: <Compass size={20} />,
    text: 'Rencanakan jadwal belajar',
    prompt: 'Buatkan jadwal belajar efektif untuk persiapan UTBK',
  },
  {
    icon: <Code size={20} />,
    text: 'Bantu debug kode',
    prompt: 'Saya punya masalah dengan React hooks, bantu saya debug',
  },
  {
    icon: <Lightbulb size={20} />,
    text: 'Ide project baru',
    prompt: 'Berikan 5 ide project portfolio untuk web developer pemula',
  },
  {
    icon: <PenTool size={20} />,
    text: 'Tips produktivitas',
    prompt: 'Bagaimana cara mengatasi prokrastinasi saat belajar?',
  },
]

export const EmptyState = ({ setInput, children }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full max-w-4xl mx-auto px-4">
      {/* Hero Section */}
      <div className="mb-8 text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white pb-2">
          PLEARN
        </h2>
        <p className="text-lg text-zinc-400 font-medium">
          Your personal learning companion.
        </p>
      </div>

      {/* Input Container */}
      <div className="w-full max-w-3xl mb-16 z-20">{children}</div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-3xl px-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setInput(item.prompt)}
            className="flex items-center gap-3 p-3 rounded-lg text-left transition-all hover:bg-zinc-900 border border-transparent hover:border-zinc-800 group"
          >
            <div
              className={`p-1.5 rounded-md transition-colors bg-zinc-800 text-zinc-300`}
            >
              {item.icon}
            </div>
            <span className="text-sm font-medium text-white opacity-70 group-hover:opacity-100 truncate">
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
