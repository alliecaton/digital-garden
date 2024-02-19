import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Bookmark } from '@/types/Bookmarks'
import type { Pagination } from '@/types/Data'

export function useGetBookmarks() {
  const loading = ref(true)
  const bookmarks = ref<Bookmark[]>([])
  const pagination = ref<Pagination>({} as Pagination)

  const getBookmarks = async (requestPage: number = 1) => {
    loading.value = true

    const path = `/bookmarks${requestPage ? `?page=${requestPage}` : ''}`

    try {
      const res = await fetch({
        method: 'get',
        path: path,
      })

      if (res?.data) {
        pagination.value = res.pagination

        bookmarks.value = res.data
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
    pagination,
    bookmarks,
  }
}
