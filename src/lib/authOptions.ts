import { type NextAuthOptions, type Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import { compare } from 'bcryptjs'

type AuthUser = {
  id: string
  email: string
  username: string
  tagName: string
  score: number
  startDate: string
  avatar: string
  todos: {
    id: number
    title: string
    desc: string
    category: string
    prioritas: string
    deadline: string
    createdAt: string
    status: 'Aktif' | 'Selesai'
  }[]
}

export type ExtendedSession = Session & {
  user: Session['user'] & {
    id: string
    username: string
    tagName: string
    score: number
    startDate: string
    avatar: string
    todos: AuthUser['todos']
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true,
            username: true,
            tagName: true,
            score: true,
            startDate: true,
            avatar: true,
            todos: {
              select: {
                id: true,
                title: true,
                desc: true,
                category: true,
                prioritas: true,
                deadline: true,
                createdAt: true,
                status: true,
              },
            },
          },
        })

        if (!user) return null

        const isValid = await compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          tagName: user.tagName,
          score: Number(user.score),
          startDate: user.startDate.toISOString(),
          avatar: user.avatar || '/images/hutao-pp.png',
          todos: user.todos.map((t: {
            id: number
            title: string
            desc: string
            category: string
            prioritas: string
            deadline: Date
            createdAt: Date
            status: 'Aktif' | 'Selesai'
          }) => ({
            ...t,
            deadline: t.deadline.toISOString(),
            createdAt: t.createdAt.toISOString(),
          })),
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const u = user as AuthUser
        token.id = u.id
        token.username = u.username
        token.tagName = u.tagName
        token.score = u.score
        token.startDate = u.startDate
        token.avatar = u.avatar
        token.todos = u.todos
      }

      if (trigger === 'update' && session) {
        token.username = session.username || token.username
        token.avatar = session.avatar || token.avatar
      }

      return token
    },
    async session({ session, token }) {
      const extendedSession = session as ExtendedSession
      if (extendedSession.user) {
        extendedSession.user.id = token.id as string
        extendedSession.user.username = token.username as string
        extendedSession.user.tagName = token.tagName as string
        extendedSession.user.score = token.score as number
        extendedSession.user.startDate = token.startDate as string
        extendedSession.user.avatar = token.avatar as string
        extendedSession.user.todos = token.todos as AuthUser['todos']
      }
      return extendedSession
    },
  },
}
