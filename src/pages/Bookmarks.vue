<script setup lang="ts">
import { onMounted } from 'vue'

import Loader from '@/components/Loader.vue'
import BookmarkCard from '@/components/BookmarkCard.vue'
import Pagination from '@/components/Pagination.vue'

import { useGetBookmarks } from '@/composables/useGetBookmarks'

const { bookmarks, loading, getBookmarks } = useGetBookmarks()

onMounted(() => {
  getBookmarks()
})
</script>

<template>
  <div class="container">
    <div class="bookmark" v-for="bookmark in bookmarks" :key="bookmark.id">
      <BookmarkCard :bookmark="bookmark" />
    </div>
  </div>

  <Loader v-if="loading" />

  <Pagination :loadMore="getBookmarks" />
</template>

<style scoped lang="scss">
.bookmark + .bookmark {
  margin-top: 30px;
}
</style>
