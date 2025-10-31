import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json()
    const id = parseInt(params.id)
    const updated = await prisma.todo.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Gagal update tugas' }, { status: 400 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id)
    await prisma.todo.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Gagal hapus tugas' }, { status: 400 })
  }
}
