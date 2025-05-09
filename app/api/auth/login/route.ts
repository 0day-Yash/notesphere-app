import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const user = await prisma.user.findUnique({ where: { email } })
  console.log('User found:', user)
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const passwordMatch = await bcrypt.compare(password, user.password)
  console.log('Password match:', passwordMatch)
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  return NextResponse.json({ id: user.id, name: user.name, email: user.email })
}