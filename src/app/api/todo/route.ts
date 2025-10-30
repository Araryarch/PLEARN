/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET semua todo
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(todos)
  } catch (err) {
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
        user: {
          connect: { id: userId },
        },
      },
    })

    return NextResponse.json(newTodo, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Gagal menambah todo' }, { status: 500 })
  }
}

// PUT update todo
export async function PUT(req: Request) {
  try {
    const { id, title, desc, category, prioritas, deadline } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID wajib disertakan' },
        { status: 400 },
      )
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title, desc, category, prioritas, deadline: new Date(deadline) },
    })

    return NextResponse.json(updatedTodo)
  } catch (err) {
    return NextResponse.json(
      { error: 'Gagal memperbarui todo' },
      { status: 500 },
    )
  }
}

// DELETE hapus todo
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID wajib disertakan' },
        { status: 400 },
      )
    }

    await prisma.todo.delete({ where: { id: Number(id) } })
    return NextResponse.json({ message: 'Todo berhasil dihapus' })
  } catch (err) {
    return NextResponse.json({ error: 'Gagal menghapus todo' }, { status: 500 })
  }
}
