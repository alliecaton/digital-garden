import type { Tag } from './Tags'

export type Bookmark = {
  id: number
  title: string
  description: string
  quote: string
  url: string
  tags: Tag[]
}
