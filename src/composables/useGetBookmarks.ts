import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Bookmark } from '@/types/Bookmarks'

export function useGetBookmarks() {
  const loading = ref(true)
  const bookmarks = ref<Bookmark[]>([])

  const getBookmarks = async () => {
    loading.value = true
    try {
      const res = await fetch({
        method: 'get',
        path: '/bookmarks',
      })

      if (res) {
        bookmarks.value = res
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
