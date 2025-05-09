import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1 as result`
    return NextResponse.json({ status: 'Database connected', result })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ status: 'Database connection failed', error }, { status: 500 })
  }
}