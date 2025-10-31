import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

async function generateUniqueTagName(username: string): Promise<string> {
  let tagName: string
  let tries = 0
  do {
    const random = Math.floor(1000 + Math.random() * 9000)
    tagName = `${username}#${random}`
    const existing = await prisma.user.findUnique({ where: { tagName } })
    if (!existing) return tagName
    tries++
  } while (tries < 10)
  throw new Error('Failed to generate unique tagName')
}

export async function POST(req: NextRequest) {
  const { username, email, password, confirmPassword } = await req.json()

  if (!username || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 },
    )
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: 400 },
    )
  }

  try {
    const existingEmail = await prisma.user.findUnique({ where: { email } })
    if (existingEmail)
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 },
      )

    const tagName = await generateUniqueTagName(username)
    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: { username, tagName, email, password: hashedPassword, score: 0 },
    })

    return NextResponse.json(
      { message: 'User registered successfully', tagName: user.tagName },
      { status: 201 },
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
