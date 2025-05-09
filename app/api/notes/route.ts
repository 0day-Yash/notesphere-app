import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  try {
    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId, title, content, isPublic } = await req.json()
    if (!userId || !title) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }
    const note = await prisma.note.create({
      data: {
        userId,
        title,
        content,
        isPublic: isPublic ?? false,
      },
    })
    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
  }
}