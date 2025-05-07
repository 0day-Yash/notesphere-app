"use client"

import { useState } from "react"
import { useNotes } from "@/context/notes-context"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { NoteCard } from "@/components/note-card"
import { Button } from "@/components/ui/button"
import { PlusIcon, GridIcon, ListIcon } from "lucide-react"

export function Dashboard() {
  const { notes, createNote } = useNotes()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleCreateNote = () => {
    createNote()
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Notes</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "list" ? "bg-muted" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "grid" ? "bg-muted" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
              </div>
              <Button onClick={handleCreateNote}>
                <PlusIcon className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
          </div>
          <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} viewMode={viewMode} />
            ))}
            {notes.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <h3 className="mb-2 text-lg font-semibold">No notes yet</h3>
                <p className="mb-6 text-sm text-muted-foreground">Create your first note to get started.</p>
                <Button onClick={handleCreateNote}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Note
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
