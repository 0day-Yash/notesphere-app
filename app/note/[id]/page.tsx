"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useNotes } from "@/context/notes-context"
import { NoteEditor } from "@/components/note-editor"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import type { Note } from "@/types"

export default function NotePage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const { user, isLoading: authLoading } = useAuth()
  const { getNoteById, isLoading: notesLoading } = useNotes()
  const [note, setNote] = useState<Note | null>(null)
  const router = useRouter()

  // Unwrap params if it's a Promise (Next.js 14+)
  const unwrappedParams = typeof params.then === "function" ? React.use(params) : params
  const noteId = unwrappedParams?.id

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (noteId && user) {
      const fetchedNote = getNoteById(noteId)
      if (fetchedNote) {
        setNote(fetchedNote)
      } else {
        router.push("/dashboard")
      }
    }
  }, [noteId, user, getNoteById, router])

  if (authLoading || notesLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user || !note) {
    return null
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          <NoteEditor note={note} />
        </main>
      </div>
    </div>
  )
}
