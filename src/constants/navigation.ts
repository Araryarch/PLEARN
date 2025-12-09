import {
  Home,
  FileText,
  MessageSquareCode,
  User,
  LucideIcon,
  GraduationCap,
} from 'lucide-react'

export interface NavigationItem {
  id: string
  icon: LucideIcon
  label: string
  href: string
}

export const navigationItems: NavigationItem[] = [
  { id: 'home', icon: Home, label: 'Home', href: '/' },
  { id: 'todo', icon: FileText, label: 'Task', href: '/todo' },
  { id: 'quiz', icon: GraduationCap, label: 'Quiz', href: '/quiz' },
  {
    id: 'chatbot',
    icon: MessageSquareCode,
    label: 'Chatbot',
    href: '/chatbot',
  },
  { id: 'user', icon: User, label: 'Profile', href: '/users' },
]
