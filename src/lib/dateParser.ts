export interface ParsedDate {
  day: number
  month: string
  year: number
  hours?: number
  minutes?: number
  seconds?: number
  formatted?: string
}

export function parseISO(
  iso: string | number | Date,
  options?: { locale?: string; withTime?: boolean; shortMonth?: boolean },
): ParsedDate | null {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return null

  const locale = options?.locale || 'id-ID'
  const withTime = options?.withTime ?? true
  const shortMonth = options?.shortMonth ?? false

  const day = date.getDate()
  const month = shortMonth
    ? date.toLocaleString(locale, { month: 'short' })
    : date.toLocaleString(locale, { month: 'long' })
  const year = date.getFullYear()

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const formatted = withTime
    ? `${day} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `${day} ${month} ${year}`

  return {
    day,
    month,
    year,
    hours: withTime ? hours : undefined,
    minutes: withTime ? minutes : undefined,
    seconds: withTime ? seconds : undefined,
    formatted,
  }
}

// helper untuk langsung return string siap render
export function parseISOToString(
  iso: string | number | Date,
  options?: { locale?: string; withTime?: boolean; shortMonth?: boolean },
): string {
  const parsed = parseISO(iso, options)
  return parsed?.formatted || 'Invalid Date'
}

// contoh pemakaian:
// import { parseISOToString } from '@/lib/dateParser'
// const timestamp = '2025-10-31T07:06:28.778Z'
// const text = parseISOToString(timestamp) // "31 Oktober 2025 14:06:28"
