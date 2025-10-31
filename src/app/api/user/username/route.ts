import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, ExtendedSession } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const extended = session as ExtendedSession
  const userId = extended.user.id

  const body = await req.json()
  const { username } = body
  if (!username)
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { username },
    })
    return NextResponse.json({ username: user.username })
  } catch {
    return NextResponse.json(
      { error: 'Failed to update username' },
      { status: 500 },
    )
  }
}
