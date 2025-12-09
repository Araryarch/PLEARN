import { catppuccin } from './constants'

/**
 * Get Tailwind color class based on priority level
 * @param priority - Priority level (low, medium, high)
 * @returns Tailwind color class string
 */
export const getPriorityColor = (priority?: string): string => {
  switch (priority) {
    case 'high':
      return catppuccin.red
    case 'medium':
      return catppuccin.peach
    case 'low':
      return catppuccin.green
    default:
      return catppuccin.subtext
  }
}

/**
 * Get color based on category
 * @param category - Category name
 * @returns Color hex code
 */
export const getCategoryColor = (category?: string): string => {
  const colors: Record<string, string> = {
    belajar: catppuccin.blue,
    pekerjaan: catppuccin.mauve,
    pribadi: catppuccin.teal,
    kesehatan: catppuccin.green,
    keuangan: catppuccin.yellow,
  }
  return colors[category?.toLowerCase() ?? ''] || catppuccin.lavender
}

/**
 * Format ISO date string to localized date
 * @param dateString - ISO date string
 * @returns Formatted date string in Indonesian locale
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'No deadline'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format Date object to time string
 * @param date - Date object
 * @returns Formatted time string (HH:MM)
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
