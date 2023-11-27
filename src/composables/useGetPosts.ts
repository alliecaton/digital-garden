import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Post } from '@/types/Posts'

export function useGetPosts() {
  const loading = ref(true)
  const posts = ref([] as Post[])

  const getPosts = async () => {
    loading.value = true
    try {
      const res = await fetch({
        method: 'get',
        path: '/posts',
      })

      if (res) {
        posts.value = res
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
  }
}
