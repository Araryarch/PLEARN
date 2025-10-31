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
    const updated = await prisma.todo.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
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
    await prisma.todo.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'gagal hapus tugas' }, { status: 400 })
  }
}
