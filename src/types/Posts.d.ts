import type { Tag } from './Bookmarks'

export type Post = {
  id: number
  title: string
  content: string
  slug: string
  tags?: Tag[] | null
  createdAt: string
  updatedAt: string
}

export type UnsavedPost = {
  id: number | null
  title: string
  content: string
  slug: string
  tags?: Tag[] | null
}
