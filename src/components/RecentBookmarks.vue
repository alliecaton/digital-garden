<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGetBookmarks } from '@/composables/useGetBookmarks'
import Loader from '@/components/Loader.vue'

const { bookmarks, loading, getBookmarks } = useGetBookmarks()

onMounted(() => {
  getBookmarks(1)
})

const truncatedList = computed(() => {
  return bookmarks.value.slice(0, 5)
})
</script>

<template>
  <Loader v-if="loading" />
  <div v-else>
    <strong>most recent bookmarks:</strong>
    <div class="bookmark" v-for="bookmark in truncatedList" :key="bookmark.id">
      <span class="bookmark__arrow">-></span>
      <a class="bookmark__link" target="_blank" :href="bookmark.url">
        {{ bookmark.title }}
      </a>
    </div>

    <router-link class="more-link" to="/bookmarks"
      >see all bookmarks</router-link
    >
  </div>
</template>

<style scoped lang="scss">
.bookmark {
  display: flex;
  gap: 10px;
}

.bookmark__link {
  color: $base;
}

.bookmark__arrow {
  text-wrap: nowrap;
}

.more-link {
  display: block;
  margin-top: 15px;
}
</style>
