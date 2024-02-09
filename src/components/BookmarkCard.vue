<script setup lang="ts">
import type { Bookmark } from '@/types/Bookmarks'

import Tag from '@/components/Tag.vue'

defineProps<{
  bookmark: Bookmark
}>()
</script>

<template>
  <div>
    <a class="link" target="_blank" :href="bookmark.url">{{
      bookmark.title
    }}</a>

    <div class="description">{{ bookmark.description }}</div>

    <div class="quote">{{ bookmark.quote }}</div>

    <div v-if="bookmark.tags?.length">
      <div class="tags">
        <div v-for="tag in bookmark.tags" :key="tag.id">
          <Tag :tag="tag" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link {
  font-weight: bold;
}

.description {
  margin-top: 5px;
  font-size: 14px;
}

.quote {
  margin: 10px 15px;
  font-size: 14px;
  font-style: italic;
  margin-left: 10px;
  border-left: 2px solid rgb(213, 213, 213);
  padding-left: 10px;
}

.tags {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
