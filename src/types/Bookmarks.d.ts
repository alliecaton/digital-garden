export type Emoji = {
  name: string
  emoji: string
}

export type Bookmark = {
  title: string
  description: string
  quote: string
  url: string
  emoji?: Emoji
}
