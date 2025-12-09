import { AIModeConfig } from './types'

/**
 * Catppuccin Mocha color palette
 * @see https://github.com/catppuccin/catppuccin
 */
export const catppuccin = {
  base: '#1e1e2e',
  surface0: '#181825',
  surface1: '#181825',
  text: '#cdd6f4',
  subtext: '#a6adc8',
  blue: '#89b4fa',
  green: '#a6e3a1',
  red: '#f38ba8',
  peach: '#fab387',
  yellow: '#f9e2af',
  teal: '#94e2d5',
  mauve: '#cba6f7',
  overlay: '#585b70',
  lavender: '#b4befe',
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
