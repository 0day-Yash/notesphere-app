"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { Note, Folder } from "@/types"

type NotesContextType = {
  notes: Note[]
  folders: Folder[]
  currentNote: Note | null
  isLoading: boolean
  createNote: () => void
  updateNote: (id: string, data: Partial<Note>) => void
  deleteNote: (id: string) => void
  getNoteById: (id: string) => Note | null
  renameNote: (id: string, title: string) => void
  toggleNoteVisibility: (id: string) => void
  createFolder: (name: string) => void
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Load notes from localStorage
    const storedNotes = localStorage.getItem("notes")
    const storedFolders = localStorage.getItem("folders")

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    } else {
      // Create sample notes if none exist
      const sampleNotes: Note[] = [
        {
          id: "note-1",
          title: "Welcome to NoteSphere",
          content:
            "# Welcome to NoteSphere\n\nThis is your first note. You can edit it or create a new one.\n\n## Features\n\n- Markdown support\n- Public/Private notes\n- File organization\n\n> Start writing and organizing your thoughts!",
          isPublic: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: false,
        },
        {
          id: "note-2",
          title: "Markdown Guide",
          content:
            "# Markdown Guide\n\n## Headers\n\n# H1\n## H2\n### H3\n\n## Emphasis\n\n*italic* or _italic_\n**bold** or __bold__\n\n## Lists\n\n- Item 1\n- Item 2\n  - Subitem\n\n1. First\n2. Second\n\n## Code\n\n`inline code`\n\n```\ncode block\n```\n\n## Links\n\n[Link text](https://example.com)",
          isPublic: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: false,
        },
      ]
      setNotes(sampleNotes)
      localStorage.setItem("notes", JSON.stringify(sampleNotes))
    }

    if (storedFolders) {
      setFolders(JSON.parse(storedFolders))
    } else {
      // Create sample folders if none exist
      const sampleFolders: Folder[] = [
        {
          id: "folder-1",
          name: "Getting Started",
        },
      ]
      setFolders(sampleFolders)
      localStorage.setItem("folders", JSON.stringify(sampleFolders))
    }

    setIsLoading(false)
  }, [])

  // Update current note based on URL
  useEffect(() => {
    if (pathname?.startsWith("/note/")) {
      const noteId = pathname.split("/").pop()
      if (noteId) {
        const note = notes.find((n) => n.id === noteId) || null
        setCurrentNote(note)

        // Update active state
        setNotes((prevNotes) =>
          prevNotes.map((n) => ({
            ...n,
            isActive: n.id === noteId,
          })),
        )
      }
    } else {
      setCurrentNote(null)
    }
  }, [pathname, notes])

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  const saveFolders = (updatedFolders: Folder[]) => {
    setFolders(updatedFolders)
    localStorage.setItem("folders", JSON.stringify(updatedFolders))
  }

  const createNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: "",
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: false,
    }

    const updatedNotes = [...notes, newNote]
    saveNotes(updatedNotes)
    router.push(`/note/${newNote.id}`)
  }

  const updateNote = (id: string, data: Partial<Note>) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            ...data,
            updatedAt: new Date().toISOString(),
          }
        : note,
    )
    saveNotes(updatedNotes)

    if (currentNote?.id === id) {
      setCurrentNote((prev) => (prev ? { ...prev, ...data } : null))
    }
  }

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    saveNotes(updatedNotes)

    if (currentNote?.id === id) {
      router.push("/dashboard")
    }
  }

  const getNoteById = (id: string) => {
    return notes.find((note) => note.id === id) || null
  }

  const renameNote = (id: string, title: string) => {
    updateNote(id, { title })
  }

  const toggleNoteVisibility = (id: string) => {
    const note = getNoteById(id)
    if (note) {
      updateNote(id, { isPublic: !note.isPublic })
    }
  }

  const createFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
    }
    const updatedFolders = [...folders, newFolder]
    saveFolders(updatedFolders)
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        folders,
        currentNote,
        isLoading,
        createNote,
        updateNote,
        deleteNote,
        getNoteById,
        renameNote,
        toggleNoteVisibility,
        createFolder,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider")
  }
  return context
}
