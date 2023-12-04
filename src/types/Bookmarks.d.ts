export type Tag = {
  id: number
  name: string
  emoji: string
}

export type Bookmark = {
  id: number
  title: string
  description: string
  quote: string
  url: string
  tags: Tag[]
}
