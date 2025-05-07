"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useNotes } from "@/context/notes-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  PlusIcon,
  FileIcon,
  Trash2Icon,
  PencilIcon,
  Share2Icon,
} from "lucide-react"

export function Sidebar() {
  const { notes, folders, createNote, createFolder, deleteNote, renameNote } = useNotes()
  const [newFolderName, setNewFolderName] = useState("")
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] = useState(false)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [noteToRename, setNoteToRename] = useState<{ id: string; title: string } | null>(null)
  const router = useRouter()

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim())
      setNewFolderName("")
      setIsCreateFolderDialogOpen(false)
    }
  }

  const handleRenameNote = () => {
    if (noteToRename && noteToRename.title.trim()) {
      renameNote(noteToRename.id, noteToRename.title)
      setNoteToRename(null)
      setRenameDialogOpen(false)
    }
  }

  const openRenameDialog = (note: { id: string; title: string }) => {
    setNoteToRename(note)
    setRenameDialogOpen(true)
  }

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId)
  }

  return (
    <div className="flex h-full w-64 flex-col border-r">
      <div className="flex items-center justify-between p-4">
        <h2 className="font-semibold">Files</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => createNote()} title="New note">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">New note</span>
          </Button>
          <Dialog open={isCreateFolderDialogOpen} onOpenChange={setIsCreateFolderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="New folder">
                <FolderIcon className="h-4 w-4" />
                <span className="sr-only">New folder</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new folder</DialogTitle>
                <DialogDescription>Enter a name for your new folder.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Folder name</Label>
                  <Input
                    id="name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Untitled Folder"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateFolderDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFolder}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {folders.map((folder) => (
            <Collapsible key={folder.id} open={expandedFolders[folder.id]} onOpenChange={() => toggleFolder(folder.id)}>
              <div className="flex items-center py-1">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    {expandedFolders[folder.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
                  <FolderIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{folder.name}</span>
                </div>
              </div>
              <CollapsibleContent>
                <div className="ml-6 space-y-1">
                  {notes
                    .filter((note) => note.folderId === folder.id)
                    .map((note) => (
                      <ContextMenu key={note.id}>
                        <ContextMenuTrigger>
                          <Link
                            href={`/note/${note.id}`}
                            className={cn(
                              "flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-muted",
                              note.isActive && "bg-muted",
                            )}
                          >
                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{note.title}</span>
                          </Link>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem onClick={() => router.push(`/note/${note.id}`)}>Open</ContextMenuItem>
                          <ContextMenuItem onClick={() => openRenameDialog(note)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Rename
                          </ContextMenuItem>
                          <ContextMenuItem>
                            <Share2Icon className="mr-2 h-4 w-4" />
                            Share
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
          <div className="space-y-1 pt-2">
            {notes
              .filter((note) => !note.folderId)
              .map((note) => (
                <ContextMenu key={note.id}>
                  <ContextMenuTrigger>
                    <Link
                      href={`/note/${note.id}`}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-muted",
                        note.isActive && "bg-muted",
                      )}
                    >
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{note.title}</span>
                    </Link>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => router.push(`/note/${note.id}`)}>Open</ContextMenuItem>
                    <ContextMenuItem onClick={() => openRenameDialog(note)}>
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Rename
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Share2Icon className="mr-2 h-4 w-4" />
                      Share
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2Icon className="mr-2 h-4 w-4" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
          </div>
        </div>
      </ScrollArea>
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename note</DialogTitle>
            <DialogDescription>Enter a new name for your note.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Note title</Label>
              <Input
                id="title"
                value={noteToRename?.title || ""}
                onChange={(e) => setNoteToRename(noteToRename ? { ...noteToRename, title: e.target.value } : null)}
                placeholder="Untitled Note"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameNote}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
