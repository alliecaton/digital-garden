import { ref } from 'vue'
import fetch from '@/utils/fetch'

import type { Bookmark } from '@/types/Bookmarks'
import type { Pagination } from '@/types/Data'
import type { Tag } from '@/types/Tags'

import { useRouter } from 'vue-router'

export function useGetBookmarks() {
  const loading = ref(true)
  const bookmarks = ref<Bookmark[]>([])
  const pagination = ref<Pagination>({} as Pagination)

  const router = useRouter()

  const getBookmarks = async (
    requestPage: number = 1,
    filterTags?: Tag[] | null,
    setQueryParams?: boolean
  ) => {
    loading.value = true

    let path = `/bookmarks${requestPage ? `?page=${requestPage}` : ''}`

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

      if (res?.data) {
        pagination.value = res.pagination
        bookmarks.value = res.data
      }

      if (setQueryParams) {
        router.replace({
          path: 'bookmarks',
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
  const filterBookmarksByTags = (tag: Tag | null, page?: number) => {
    const isTagSelected = selectedTags.value.find(
      (selectedTag) => selectedTag.id === tag?.id
    )

    // this gets hit when paginating
    if (tag === null) return getBookmarks(page, selectedTags.value, true)

    // If tag is already active, deselect it/unfilter
    if (isTagSelected) {
      selectedTags.value = selectedTags.value.filter(
        (selectedTag) => selectedTag.id !== tag.id
      )
    } else {
      selectedTags.value.push(tag)
    }

    // If a new filter is selected, reset the page to 1
    getBookmarks(1, selectedTags.value, true)
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
      getBookmarks(page, selectedTags.value, true)
    }
  }

  return {
    getBookmarks,
    loading,
    pagination,
    bookmarks,
    selectedTags,
    filterBookmarksByTags,
    requestTagsOnMount,
  }
}
