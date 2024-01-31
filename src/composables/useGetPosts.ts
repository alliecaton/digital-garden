import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Post } from '@/types/Posts'
import type { Pagination } from '@/types/Data'

export function useGetPosts() {
  const loading = ref(true)
  const posts = ref<Post[]>([])
  const pagination = ref<Pagination>({} as Pagination)

  const getPosts = async (requestPage?: number) => {
    loading.value = true

    const path = `/posts${requestPage ? `?page=${requestPage}` : ''}`

    try {
      const res = await fetch({
        method: 'get',
        path: path,
      })

      if (res) {
        pagination.value = res.pagination

        if (posts.value.length && requestPage) {
          posts.value.push(...res.data)
        } else {
          posts.value = res.data
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    getPosts,
    loading,
    posts,
    pagination,
  }
}
