import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    if (!userId)
      return NextResponse.json(
        { error: 'userId wajib disertakan' },
        { status: 400 },
      )

    const todos = await prisma.todo.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(todos)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const { title, desc, category, prioritas, deadline, userId } =
      await req.json()

    if (!title || !desc || !category || !prioritas || !deadline || !userId) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 },
      )
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        desc,
        category,
        prioritas,
        deadline: new Date(deadline),
        status: 'Aktif',
        user: { connect: { id: userId } },
      },
    })

    return NextResponse.json(newTodo, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Gagal menambah todo' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'userId wajib disertakan' },
        { status: 400 },
      )
    }

    // Mark all active todos as completed
    await prisma.todo.updateMany({
      where: {
        userId: userId,
        status: 'Aktif',
      },
      data: {
        status: 'Selesai',
      },
    })

    return NextResponse.json({ message: 'All tasks marked as done' })
  } catch {
    return NextResponse.json(
      { error: 'Failed to mark all as done' },
      { status: 500 },
    )
  }
}
