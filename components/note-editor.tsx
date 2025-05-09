"use client"

import { useState, useEffect, useCallback } from "react"
import { useNotes } from "@/context/notes-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import type { Note } from "@/types"
import { marked } from "marked"

interface NoteEditorProps {
  note: Note
}

export function NoteEditor({ note }: NoteEditorProps) {
  const { updateNote } = useNotes()
  const [content, setContent] = useState(note.content || "")
  const [htmlContent, setHtmlContent] = useState("")
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  
  // Use useCallback to memoize the update function
  const handleContentUpdate = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  // Debounced update with proper dependency array
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateNote(note.id, { content })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [content, note.id, updateNote])

  // Only update HTML content when needed
  useEffect(() => {
    if (activeTab === "preview") {
      try {
        setHtmlContent(marked(content))
      } catch (error) {
        console.error("Error parsing markdown:", error)
        setHtmlContent("<p>Error parsing markdown</p>")
      }
    }
  }, [content, activeTab])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <Button variant="outline" size="sm">
          Share
        </Button>
      </div>
      <div className="flex-1 overflow-auto rounded-md border">
        <Tabs 
          defaultValue="write" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "write" | "preview")}
        >
          <TabsList className="w-full justify-start">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write" className="h-full data-[state=inactive]:hidden">
            <Textarea
              value={content}
              onChange={(e) => handleContentUpdate(e.target.value)}
              placeholder="Start writing..."
              className="h-full min-h-[500px] resize-none border-0 p-4 focus-visible:ring-0"
            />
          </TabsContent>
          <TabsContent value="preview" className="h-full data-[state=inactive]:hidden">
            <div
              className="prose prose-sm dark:prose-invert max-w-none h-full overflow-auto p-4"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
