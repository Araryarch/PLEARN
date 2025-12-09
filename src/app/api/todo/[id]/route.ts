import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json()
    const { id: paramId } = await params
    const id = parseInt(paramId)

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const updated = await prisma.todo.update({
      where: { id },
      data: body,
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

    return NextResponse.json(updated)
  } catch (err) {
    console.error('PUT /api/todo/[id] error:', err)
    return NextResponse.json({ error: 'gagal update tugas' }, { status: 400 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.todo.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/todo/[id] error:', err)
    return NextResponse.json({ error: 'gagal hapus tugas' }, { status: 400 })
  }
}
