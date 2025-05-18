<script setup lang="ts">
import { onMounted } from 'vue'
import TagFilters from '@/components/TagFilters.vue'

import Loader from '@/components/Loader.vue'
import BookmarkCard from '@/components/BookmarkCard.vue'
import Pagination from '@/components/Pagination.vue'

import { useRoute } from 'vue-router'

import { useGetBookmarks } from '@/composables/useGetBookmarks'

const {
  bookmarks,
  loading,
  getBookmarks,
  pagination,
  filterBookmarksByTags,
  requestTagsOnMount,
  selectedTags,
} = useGetBookmarks()

const route = useRoute()

onMounted(() => {
  const pageQuery = Number(route.query.page) || 1
  const tagQuery = route.query.tags

  if (tagQuery) {
    requestTagsOnMount(pageQuery, String(tagQuery))
  } else {
    getBookmarks(pageQuery)
  }
})

const paginate = (page: number) => {
  if (selectedTags.value?.length) {
    filterBookmarksByTags(null, page)
  } else {
    getBookmarks(page)
  }
}
</script>

<template>
  <TagFilters :appliedTags="selectedTags" :onClick="filterBookmarksByTags" />
  <div class="container">
    <div class="bookmark" v-for="bookmark in bookmarks" :key="bookmark.id">
      <BookmarkCard :bookmark="bookmark" />
    </div>
  </div>

  <Loader v-if="loading" />

  <Pagination :pagination="pagination" :loadMore="paginate" />
</template>

<style scoped lang="scss">
.bookmark + .bookmark {
  margin-top: 30px;
}
</style>
