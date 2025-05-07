import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileIcon, LockIcon, UnlockIcon } from "lucide-react"
import type { Note } from "@/types"

interface NoteCardProps {
  note: Note
  viewMode: "grid" | "list"
}

export function NoteCard({ note, viewMode }: NoteCardProps) {
  return (
    <Link href={`/note/${note.id}`}>
      <Card
        className={`h-full overflow-hidden transition-all hover:border-primary ${
          viewMode === "list" ? "flex items-center" : ""
        }`}
      >
        <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FileIcon className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold">{note.title}</h3>
            </div>
            {note.isPublic ? (
              <UnlockIcon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <LockIcon className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {viewMode === "grid" && (
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{note.content || "No content"}</p>
          )}
        </CardContent>
        <CardFooter
          className={`border-t bg-muted/50 px-4 py-2 ${viewMode === "list" ? "ml-auto border-l border-t-0" : ""}`}
        >
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <span>{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</span>
            <Badge variant={note.isPublic ? "outline" : "secondary"} className="text-xs">
              {note.isPublic ? "Public" : "Private"}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
