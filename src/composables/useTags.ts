import { ref } from 'vue'
import type { Tag } from '@/types/Bookmarks'

import fetch from '@/utils/fetch'

type UnsavedTag = Omit<Tag, 'id'>

export function useTags() {
  const tags = ref<UnsavedTag[]>([])
  const emoji = ref('')
  const name = ref('')

  const availableTags = ref<Tag[]>([])

  const addTagToList = (tag?: Tag | undefined) => {
    if (tag) {
      tags.value.push(tag)
      return
    }

    if (emoji.value && name.value) {
      tags.value.push({
        emoji: emoji.value,
        name: name.value,
      })

      emoji.value = ''
      name.value = ''
    }
  }

  const showTagInputs = ref(true)
  const showEmptyTagInputs = () => {
    if (emoji.value && name.value) {
      emoji.value = ''
      name.value = ''
    }

    showTagInputs.value = true
  }

  const removeTagFromList = (tagName: string) => {
    tags.value = tags.value.filter((tag) => tag.name !== tagName)
  }

  const getAllTags = async () => {
    try {
      const res = await fetch({
        method: 'get',
        path: '/tags',
      })

      if (res) {
        availableTags.value = res
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    emoji,
    name,
    tags,
    addTagToList,
    showTagInputs,
    showEmptyTagInputs,
    removeTagFromList,
    availableTags,
    getAllTags,
  }
}
