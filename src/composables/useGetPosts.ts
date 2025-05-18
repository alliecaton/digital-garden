import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Post } from '@/types/Posts'
import type { Pagination } from '@/types/Data'
import type { Tag } from '@/types/Tags'

import { useRouter } from 'vue-router'

export function useGetPosts() {
  const loading = ref(true)
  const posts = ref<Post[]>([])
  const pagination = ref<Pagination>({} as Pagination)

  const router = useRouter()

  const getPosts = async (
    requestPage?: number,
    filterTags?: Tag[] | null,
    setQueryParams?: boolean
  ) => {
    loading.value = true

    let path = `/posts${requestPage ? `?page=${requestPage}` : ''}`

    // Add tags to filter by if they are passed
    let tagNames = ''
    if (filterTags?.length) {
      tagNames = filterTags.map((tag) => tag.name).join(',')
      path += `&tags=${tagNames}`
    }

    try {
      const res = await fetch({
        method: 'get',
        path: path,
      })

      if (res) {
        pagination.value = res.pagination
        posts.value = res.data
      }

      if (setQueryParams) {
        router.replace({
          path: 'posts',
          query: {
            page: requestPage,
            ...(filterTags?.length && { tags: tagNames }),
          },
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const selectedTags = ref<Tag[]>([])
  const filterPostsByTags = (tag: Tag | null, page?: number) => {
    const isTagSelected = selectedTags.value.find(
      (selectedTag) => selectedTag.id === tag?.id
    )

    // this gets hit when paginating
    if (tag === null) return getPosts(page, selectedTags.value, true)

    // If tag is already active, deselect it/unfilter
    if (isTagSelected) {
      selectedTags.value = selectedTags.value.filter(
        (selectedTag) => selectedTag.id !== tag.id
      )
    } else {
      selectedTags.value.push(tag)
    }

    // If a new filter is selected, reset the page to 1
    getPosts(1, selectedTags.value, true)
  }

  const requestTagsOnMount = async (page: number, tagNames: string) => {
    try {
      const res = await fetch({
        method: 'get',
        path: `/tags?tagNames=${tagNames}`,
      })

      if (res) {
        selectedTags.value = res
      }
    } catch (e) {
      console.error(e)
    } finally {
      getPosts(page, selectedTags.value, true)
    }
  }

  return {
    getPosts,
    selectedTags,
    loading,
    filterPostsByTags,
    requestTagsOnMount,
    posts,
    pagination,
  }
}
