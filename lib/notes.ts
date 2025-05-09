// REMOVE: import { prisma } from './db'
import type { Note as NoteType } from '@/types'

export async function getNotes(userId: string) {
  try {
    const res = await fetch(`/api/notes?userId=${encodeURIComponent(userId)}`)
    if (!res.ok) throw new Error('Failed to fetch notes')
    const notes = await res.json()
    return notes
  } catch (error) {
    console.error('Error fetching notes:', error)
    return []
  }
}

export async function createNote(userId: string, data: { title: string, content: string, isPublic?: boolean }) {
  try {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...data }),
    })
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `Failed to create note: ${res.status}`)
    }
    const note = await res.json()
    return note
  } catch (error) {
    console.error('Error creating note:', error)
    throw error
  }
}