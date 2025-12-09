import { AIModeConfig } from './types'

/**
 * Catppuccin Mocha color palette
 * @see https://github.com/catppuccin/catppuccin
 */
export const catppuccin = {
  base: '#09090b', // zinc-950
  surface0: '#18181b', // zinc-900
  surface1: '#27272a', // zinc-800
  text: '#fafafa', // zinc-50
  subtext: '#a1a1aa', // zinc-400
  blue: '#fafafa', // zinc-50 (Accent/Primary)
  green: '#d4d4d8', // zinc-300 (Success-ish)
  red: '#71717a', // zinc-500 (Error-ish)
  peach: '#e4e4e7', // zinc-200
  yellow: '#f4f4f5', // zinc-100
  teal: '#a1a1aa', // zinc-400
  mauve: '#fafafa', // zinc-50
  overlay: '#52525b', // zinc-600
  lavender: '#e4e4e7', // zinc-200
} as const

/**
 * Available AI modes with their configurations
 */
export const aiModes: AIModeConfig[] = [
  {
    value: 'fluent',
    label: 'Fluent',
    description: 'Natural & conversational',
  },
  {
    value: 'creative',
    label: 'Creative',
    description: 'Imaginative & unique',
  },
  {
    value: 'precise',
    label: 'Precise',
    description: 'Accurate & detailed',
  },
  {
    value: 'balanced',
    label: 'Balanced',
    description: 'Best of both worlds',
  },
  {
    value: 'list',
    label: 'List Generator',
    description: 'Generate Your List Automatic with AI',
  },
  {
    value: 'quiz',
    label: 'Quiz Generator',
    description: 'Generate quiz questions on any topic',
  },
] as const
