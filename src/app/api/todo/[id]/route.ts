import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Context {
  params: { id: string }
}

export async function PUT(req: Request, context: Context) {
  try {
    const body = await req.json()
    const id = parseInt(context.params.id)
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

export async function DELETE(req: Request, context: Context) {
  try {
    const id = parseInt(context.params.id)
    await prisma.todo.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'gagal hapus tugas' }, { status: 400 })
  }
}
