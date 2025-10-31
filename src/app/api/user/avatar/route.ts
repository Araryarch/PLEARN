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
  const { avatar } = body
  if (!avatar)
    return NextResponse.json({ error: 'Avatar is required' }, { status: 400 })

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatar },
    })
    return NextResponse.json({ avatar: user.avatar })
  } catch {
    return NextResponse.json(
      { error: 'Failed to update avatar' },
      { status: 500 },
    )
  }
}
