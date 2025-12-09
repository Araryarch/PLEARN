import { Flag, Calendar } from 'lucide-react'
import { TodoItem } from '../types'
import { catppuccin } from '../constants'
import { getPriorityColor, getCategoryColor, formatDate } from '../utils'

interface TodoCardProps {
  item: TodoItem
}

export const TodoCard = ({ item }: TodoCardProps) => {
  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor: catppuccin.surface0,
        border: `1px solid ${catppuccin.overlay}`,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-base flex-1">{item.title}</h3>
        <span
          className="px-2 py-1 rounded text-xs font-medium"
          style={{
            backgroundColor: getCategoryColor(item.category),
            color: catppuccin.base,
          }}
        >
          {item.category ?? 'Lainnya'}
        </span>
      </div>

      <p className="text-sm mb-3" style={{ color: catppuccin.subtext }}>
        {item.description}
      </p>

      <div className="flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Flag
              size={14}
              style={{ color: getPriorityColor(item.priority) }}
            />
            <span style={{ color: catppuccin.subtext }}>
              {(item.priority ?? 'medium').charAt(0).toUpperCase() +
                (item.priority ?? 'medium').slice(1)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={14} style={{ color: catppuccin.lavender }} />
            <span style={{ color: catppuccin.subtext }}>
              {formatDate(item.deadline)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
