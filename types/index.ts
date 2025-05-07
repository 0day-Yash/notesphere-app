export interface Note {
  id: string
  title: string
  content: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  isActive: boolean
  folderId?: string
}

export interface Folder {
  id: string
  name: string
}
