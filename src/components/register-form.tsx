'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

// Custom Calendar Component
interface CustomCalendarProps {
  selected?: Date
  onSelect: (date: Date) => void
  fromYear?: number
  toYear?: number
}

function CustomCalendar({
  selected,
  onSelect,
  fromYear = 1950,
  toYear = new Date().getFullYear(),
}: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  interface CalendarDay {
    date: Date
    isCurrentMonth: boolean
    day: number
  }

  const calendarDays: CalendarDay[] = []

  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, -i)
    calendarDays.push({
      date: prevDate,
      isCurrentMonth: false,
      day: prevDate.getDate(),
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth, day),
      isCurrentMonth: true,
      day: day,
    })
  }

  // Next month's leading days
  const totalCells = 42 // 6 rows × 7 days
  const remainingCells = totalCells - calendarDays.length
  for (let day = 1; day <= remainingCells; day++) {
    const nextDate = new Date(currentYear, currentMonth + 1, day)
    calendarDays.push({
      date: nextDate,
      isCurrentMonth: false,
      day: day,
    })
  }

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    // Prevent navigating to future months beyond the current month
    const today = new Date()
    if (
      newDate.getFullYear() > today.getFullYear() ||
      (newDate.getFullYear() === today.getFullYear() &&
        newDate.getMonth() > today.getMonth())
    ) {
      return
    }
    setCurrentDate(newDate)
  }

  const navigateYear = (direction: number): void => {
    const newDate = new Date(currentDate)
    const newYear = currentDate.getFullYear() + direction

    // Enforce year boundaries
    if (newYear >= fromYear && newYear <= toYear) {
      newDate.setFullYear(newYear)
      // If navigating to the current year, ensure the month isn't in the future
      const today = new Date()
      if (
        newYear === today.getFullYear() &&
        newDate.getMonth() > today.getMonth()
      ) {
        newDate.setMonth(today.getMonth())
      }
      setCurrentDate(newDate)
    }
  }

  const handleDateSelect = (date: Date): void => {
    const today = new Date()
    // Prevent selecting future dates
    if (date > today) return
    onSelect(date)
  }

  const isSelected = (date: Date): boolean => {
    if (!selected) return false
    return date.toDateString() === selected.toDateString()
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isFutureDate = (date: Date): boolean => {
    const today = new Date()
    return date > today
  }

  const canNavigateYear = (direction: number): boolean => {
    const targetYear = currentYear + direction
    return targetYear >= fromYear && targetYear <= toYear
  }

  const canNavigateMonth = (direction: number): boolean => {
    const newDate = new Date(currentYear, currentMonth + direction, 1)
    const today = new Date()
    return (
      newDate.getFullYear() < today.getFullYear() ||
      (newDate.getFullYear() === today.getFullYear() &&
        newDate.getMonth() <= today.getMonth())
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateYear(-1)}
            disabled={!canNavigateYear(-1)}
            className={`p-1 rounded transition-colors ${
              canNavigateYear(-1)
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <span className="text-sm font-medium min-w-[3rem] text-center">
            {currentYear}
          </span>
          <button
            type="button"
            onClick={() => navigateYear(1)}
            disabled={!canNavigateYear(1)}
            className={`p-1 rounded transition-colors ${
              canNavigateYear(1)
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            disabled={!canNavigateMonth(-1)}
            className={`p-1 rounded transition-colors ${
              canNavigateMonth(-1)
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium min-w-[5rem] text-center">
            {months[currentMonth]}
          </span>
          <button
            type="button"
            onClick={() => navigateMonth(1)}
            disabled={!canNavigateMonth(1)}
            className={`p-1 rounded transition-colors ${
              canNavigateMonth(1)
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-xs font-medium text-gray-500 text-center py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayInfo, index) => {
          const { date, isCurrentMonth, day } = dayInfo
          const isDisabled = isFutureDate(date)
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleDateSelect(date)}
              disabled={isDisabled}
              className={`
                h-8 w-8 text-sm rounded transition-all duration-150
                ${
                  isCurrentMonth && !isDisabled
                    ? 'text-gray-900 hover:bg-gray-100'
                    : 'text-gray-300'
                }
                ${
                  isSelected(date)
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : ''
                }
                ${
                  isToday(date) && !isSelected(date) && !isDisabled
                    ? 'bg-gray-100 font-medium'
                    : ''
                }
                ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function RegisterForm() {
  const [date, setDate] = useState<Date | undefined>()
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  const formatDate = (date: Date | undefined): string => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleDateSelect = (selectedDate: Date): void => {
    setDate(selectedDate)
    setShowCalendar(false)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-600 text-sm">
            Fill in the information below to create your account
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+62 812-3456-7890"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                    !date ? 'text-gray-500' : 'text-gray-900'
                  }`}
                >
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? formatDate(date) : 'Select date'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CustomCalendar
                  selected={date}
                  onSelect={handleDateSelect}
                  fromYear={1950}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Create Account
          </button>
        </div>

        <div className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-gray-900 underline underline-offset-4 hover:text-gray-700"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}
