import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    if (!userId)
      return NextResponse.json(
        { error: 'userId wajib disertakan' },
        { status: 400 },
      )

    // Optimized query - only select needed fields
    const todos = await prisma.todo.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        desc: true,
        category: true,
        prioritas: true,
        deadline: true,
        status: true,
        createdAt: true,
      },
    })

    // Add caching headers
    const response = NextResponse.json(todos)
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=120',
    )

    return response
  } catch (error) {
    console.error('GET /api/todo error:', error)
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
      select: {
        id: true,
        title: true,
        desc: true,
        category: true,
        prioritas: true,
        deadline: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.error('POST /api/todo error:', error)
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

    // Optimized bulk update
    const result = await prisma.todo.updateMany({
      where: {
        userId: userId,
        status: 'Aktif',
      },
      data: {
        status: 'Selesai',
      },
    })

    return NextResponse.json({
      message: 'All tasks marked as done',
      count: result.count,
    })
  } catch (error) {
    console.error('PATCH /api/todo error:', error)
    return NextResponse.json(
      { error: 'Failed to mark all as done' },
      { status: 500 },
    )
  }
}
