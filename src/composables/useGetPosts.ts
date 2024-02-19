import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Post } from '@/types/Posts'
import type { Pagination } from '@/types/Data'

export function useGetPosts() {
  const loading = ref(true)
  const posts = ref<Post[]>([])
  const pagination = ref<Pagination>({} as Pagination)

  const getPosts = async (
    requestPage = 1,
    filterTags?: number[] | null,
    skipPagination?: boolean
  ) => {
    loading.value = true
    let path = `/posts${requestPage ? `?page=${requestPage}` : ''}`

    // Add tags to filter by if they are passed
    if (filterTags?.length) path += `&tags=${filterTags.join(',')}`

    try {
      const res = await fetch({
        method: 'get',
        path: path,
      })

      if (res) {
        pagination.value = res.pagination
        if (!skipPagination) {
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

  const tagIds = ref<number[]>([])
  const filterPostsByTags = (tag: number | null, page?: number) => {
    // This gets hit when paginating with filters selected
    if (tag === null) return getPosts(page, tagIds.value)

    // If tag is already active, deselect it/unfilter
    if (tagIds.value.includes(tag)) {
      tagIds.value = tagIds.value.filter((id) => id !== tag)
    } else {
      tagIds.value.push(tag)
    }

    // If a new filter is selected, reset the page to 1
    getPosts(1, tagIds.value, true)
  }

  return {
    getPosts,
    tagIds,
    loading,
    filterPostsByTags,
    posts,
    pagination,
  }
}
