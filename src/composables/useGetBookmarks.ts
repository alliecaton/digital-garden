import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Bookmark } from '@/types/Bookmarks'

export function useGetBookmarks() {
  const loading = ref(true)
  const bookmarks = ref<Bookmark[]>([])

  const getBookmarks = async (requestPage?: number) => {
    console.log(requestPage)
    loading.value = true

    const path = `/bookmarks${requestPage ? `?page=${requestPage}` : ''}`

    try {
      const res = await fetch({
        method: 'get',
        path: path,
      })

      if (res) {
        if (bookmarks.value.length) {
          bookmarks.value.push(...res)
        } else {
          bookmarks.value = res
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    getBookmarks,
    loading,
    bookmarks,
  }
}
