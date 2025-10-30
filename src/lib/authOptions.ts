import { type NextAuthOptions, type Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from './prisma'

type ExtendedSession = Session & {
  user: Session['user'] & {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: { email?: string | null } }) {
      if (!user.email) return false
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { email: user.email },
      })
      return true
    },
    async session({ session }) {
      if (!session.user?.email) return session
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      if (dbUser) {
        ;(session as ExtendedSession).user.id = dbUser.id
      }
      return session
    },
  },
}
