import { Flag, Calendar } from 'lucide-react'
import { TodoItem } from '../types'
import { getPriorityColor, getCategoryColor, formatDate } from '../utils'

interface TodoCardProps {
  item: TodoItem
}

export const TodoCard = ({ item }: TodoCardProps) => {
  return (
    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-base flex-1 text-white leading-tight">
          {item.title}
        </h3>
        <span
          className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-black w-fit whitespace-nowrap"
          style={{
            backgroundColor: getCategoryColor(item.category),
          }}
        >
          {item.category ?? 'Lainnya'}
        </span>
      </div>

      <p className="text-sm mb-4 text-zinc-400 line-clamp-2 leading-relaxed">
        {item.description}
      </p>

      <div className="flex items-center justify-between gap-4 text-xs font-medium">
        <div className="flex items-center gap-4 text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Flag
              size={14}
              style={{ color: getPriorityColor(item.priority) }}
            />
            <span style={{ color: getPriorityColor(item.priority) }}>
              {(item.priority ?? 'medium').charAt(0).toUpperCase() +
                (item.priority ?? 'medium').slice(1)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-zinc-600" />
            <span>{formatDate(item.deadline)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
